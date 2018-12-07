<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoadDamage as RoadDamageResource;
use App\Http\Resources\RoadDamageReport as RoadDamageReportResource;
use App\Image;
use App\RoadDamage;
use App\RoadDamageReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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

        $reports = RoadDamageReport::where('verified', '!=', RoadDamageReport::UNVERIFIED)
            ->where('updated_at', '>=', $request->input('after'))
            ->get();

        $reports_array = [];
        foreach ($reports as $report) {
            if (! array_key_exists($report->getImage()->image_name, $reports_array)) {
                $reports_array[$report->getImage()->image_name] = [];
            }
            $data = [
                'types' => $report->getRoadDamage()->type,
                'verification-status' => $report->verified,
                'url' => $report->getImageUrl()
            ];
            $reports_array[$report->getImage()->image_name] = array_merge_recursive(
                $reports_array[$report->getImage()->image_name],
                $data
            );
            $reports_array[$report->getImage()->image_name] = $this->super_unique($reports_array[$report->getImage()->image_name]);
            $url = $reports_array[$report->getImage()->image_name]['url'];
            $reports_array[$report->getImage()->image_name]['url'] = is_array($url) ?
                array_values($url)[0] :
                $url;
        }

        return $reports_array;
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
            'filters.type' => ['string', 'in:D00,D01,D10,D11,D20,D40,D43,D44'],
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

        if ($request->input('filters.type')) {
            foreach ($collection as $key => $val) {
                if ($val->type !== $request->input('filters.type')) {
                    $collection->forget($key);
                }
            }
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
                if (strpos($val->getRoadName(), $request->input('filters.roadname')) === false) {
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
                if (
                    (($road_damage->getAverageConfidence() + $report['confidence']) / 2)
                     < 0.5
                ) {
                    $road_damage->verified = RoadDamageReport::FALSEPOSITIVE;
                    $road_damage->save();
                }
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
     * Update road damage report verification status. This function needs to add
     * additional RoadDamageReports for new verification type(s) selected by a
     * human user
     *
     * @param Illuminate\Http\Request $request
     *
     * @return App\Http\Resources\RoadDamage
     */
    public function editReport(int $id, Request $request)
    {
        $request->validate([
            'damagesInImage' => 'required',
        ]);

        $origin_report = RoadDamageReport::find($id);
        $damages_in_image = $request->input('damagesInImage');
        $associated_damages = RoadDamage::find(RoadDamageReport::find($id)->getAssociatedDamageIds());
        // Keep track of types that we have already taken care of
        $marked_types = [];
        // Collect modified damages in array to be returned later
        $modified_damages = [];

        foreach (array_keys($damages_in_image) as $type) {
            // For each damage type in the damages_in_image array
            foreach ($associated_damages->where('type', $type) as $damage) {
                // For all associated damages with this type, get its reports
                $report = RoadDamageReport::where('roaddamage_id', $damage->id)->first();
                if ($report->exists()) {
                    if ($damages_in_image[$type] === true) {
                        // We have a report with this damage type verified by human, update it
                        $report->verified = RoadDamageReport::VERIFIED;
                        $report->save();
                        $marked_types[] = $type;
                        $modified_damages[] = $damage;
                    } elseif ($damages_in_image[$type] === false) {
                        // We have a report with this damage type verified as false positive by human, update it
                        $report->verified = RoadDamageReport::FALSEPOSITIVE;
                        $report->save();
                        $marked_types[] = $type;
                        $modified_damages[] = $damage;
                    }
                }
            }
        }
        foreach (array_diff(RoadDamage::DAMAGE_TYPES, $marked_types) as $type) {
            // For all the types we could not find an associated damage for
            if ($damages_in_image[$type] === true) {
                // try to find a road damage that isn't associated with the given ID
                $road_damage = RoadDamage::findRelativeRoadDamage(
                        $origin_report->latitude,
                        $origin_report->longitude,
                        $origin_report->getRoadDamage()->direction,
                        $type
                    );
                if ($road_damage->isEmpty()) {
                    // If it doesn't exist, create it
                    $road_damage = RoadDamage::create([
                            'user_id' => auth('api')->user()->id,
                            'direction' => $origin_report->getRoadDamage()->direction,
                            'type' => $type,
                            'latitude' => $origin_report->latitude,
                            'longitude' => $origin_report->longitude,
                            'organization_id' => auth('api')->user()->organization_id,
                        ]);
                } else {
                    $road_damage = $road_damage->first();
                }

                // Add to modified damages and create the verified report
                $modified_damages[] = $road_damage;
                RoadDamageReport::create([
                        'roaddamage_id' => $road_damage->id,
                        'user_id' => auth('api')->user()->id,
                        'image_id' => $origin_report->image_id,
                        'confidence' => 1,
                        'verified' =>  RoadDamageReport::VERIFIED,
                        'latitude' => $origin_report->latitude,
                        'longitude' => $origin_report->longitude
                    ]);
            }
        }

        return RoadDamageResource::collection(collect($modified_damages));
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

    /**
     * TODO: refactor this into a custom helper https://laravel-news.com/creating-helpers
     *
     * @param array $array
     * @return array
     */
    private function super_unique($array)
    {
        $result = array_map("unserialize", array_unique(array_map("serialize", $array)));

        foreach ($result as $key => $value) {
            if (is_array($value)) {
                $result[$key] = $this->super_unique($value);
            }
        }

        return $result;
    }
}
