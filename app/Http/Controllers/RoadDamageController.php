<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoadDamage as RoadDamageResource;
use App\Http\Resources\RoadDamageReport as RoadDamageReportResource;
use App\Image;
use App\RoadDamage;
use App\RoadDamageReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoadDamageController extends Controller
{
    /**
     * Add authentication middleware.
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Get the base Json data of this model.
     *
     * @param int $id id of the resource model we're getting
     *
     * @return App\Http\Resources\RoadDamage
     */
    public function getJson(int $id)
    {
        return new RoadDamageResource(RoadDamage::findOrFail($id));
    }

    /**
     * Get verified instance images after a provided date
     *
     * @param Illuminate\Http\Request $request
     *
     * @return App\Http\Resources\RoadDamage
     */
    public function getVerifiedImages(Request $request)
    {
        $request->validate([
            'after' => ['required', 'date'],
        ]);

        $reports = RoadDamageReport::where('verified', '=', 'verified')
            ->where('created_at', '>=', $request->input('after'))
            ->get();

        $images = [];
        foreach ($reports as $report) {
            $images[] = [
                'type' => $report->getRoadDamage()->type,
                'url' => $report->getImageUrl()
            ];
        }

        return $images;
    }

    /**
     * Get the base Json data of all the models for the authenticated user.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return App\Http\Resources\RoadDamage
     */
    public function getAllJson(Request $request)
    {
        $request->validate([
            'filters.status' => ['string', 'in:pending-repair,repairing,done,wont-do'],
            'filters.verified' => 'boolean',
            'filters.falsePositive' => 'boolean',
            'filters.roadname' => 'string',
        ]);

        $collection = RoadDamageResource::collection(
            RoadDamage::where('organization_id', auth('api')->user()->organization_id)->get()
        );

        if ($request->input('filters.status')) {
            $collection = $collection->where('status', $request->input('filters.status'));
        }

        if ($request->has('filters.verified')) {
            foreach ($collection as $key => $val) {
                if ($val->hasVerifiedReport() !== $request->input('filters.verified')) {
                    $collection->forget($key);
                }
            }
        }

        if ($request->has('filters.falsePositive')) {
            foreach ($collection as $key => $val) {
                if ($val->hasFalsePositiveReport() !== $request->input('filters.falsePositive')) {
                    $collection->forget($key);
                }
            }
        }

        if ($request->has('filters.roadname')) {
            foreach ($collection as $key => $val) {
                if ($val->getRoadName() !== $request->input('filters.roadname')) {
                    $collection->forget($key);
                }
            }
        }

        return $collection;
    }

    /**
     * Insert a RoadDamage into the database.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return App\Http\Resources\RoadDamage
     */
    public function insert(Request $request)
    {
        $request->validate([
            'image' => 'required',
            'location.latitude' => 'required',
            'location.longitude' => 'required',
            'direction' => 'required',
            'damages' => 'required',
            'damages.*.type' => 'required',
            'damages.*.confidence' => 'required',
        ]);

        $user = auth('api')->user();
        $location = $request->input('location');
        $damages = $request->input('damages');
        $direction = $request->input('direction');
        $image = Image::newImageFromBase64($request->input('image'));

        foreach ($damages as $report) {
            $road_damage = RoadDamage::findRelativeRoadDamage(
                $request->input('location.latitude'),
                $request->input('location.longitude'),
                $direction,
                $report['type']
            );
            if ($road_damage->isEmpty()) {
                $road_damage = RoadDamage::create([
                    'user_id' => $user->id,
                    'direction' => $direction,
                    'type' => $report['type'],
                    'latitude' => $location['latitude'],
                    'longitude' => $location['longitude'],
                    'organization_id' => $user->organization_id,
                ]);
            } else {
                $road_damage = $road_damage->first();
            }
            RoadDamageReport::create([
                'roaddamage_id' => $road_damage->id,
                'user_id' => $user->id,
                'image_id' => $image->id,
                'confidence' => $report['confidence'],
                'latitude' => $location['latitude'],
                'longitude' => $location['longitude'],
            ]);
        }

        return new RoadDamageResource($road_damage);
    }

    /**
     * Edit a road damage report.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return App\Http\Resources\RoadDamage
     */
    public function editReport(int $id, Request $request)
    {
        $request->validate([
            'verified' => ['required', 'in:verified,unverified,false-positive'],
        ]);

        try {
            $report = RoadDamageReport::findOrFail($id);
        } catch (\Throwable $e) {
            return request()->json(['Report could not be found.']);
        }

        if ($request->input('verified')) {
            $report->verified = $request->input('verified');
            $report->save();
        }

        return new RoadDamageReportResource($report);
    }

    /**
     * Edit a road damage report.
     *
     * @param Illuminate\Http\Request $request
     *
     * @return App\Http\Resources\RoadDamage
     */
    public function editDamage(int $id, Request $request)
    {
        $request->validate([
            'status' => ['required', 'in:pending-repair,repairing,done,wont-do'],
        ]);

        try {
            $damage = RoadDamage::findOrFail($id);
        } catch (\Throwable $e) {
            return request()->json(['Road damage could not be found.']);
        }

        if ($request->input('status')) {
            $damage->status = $request->input('status');
            $damage->save();
        }

        return new RoadDamageResource($damage);
    }
}
