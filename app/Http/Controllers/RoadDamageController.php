<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoadDamage as RoadDamageResource;
use App\Image;
use App\RoadDamage;
use App\RoadDamageReport;
use Illuminate\Http\Request;

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
     * Get the base Json data of all the models for the authenticated user.
     *
     * @return App\Http\Resources\RoadDamage
     */
    public function getAllJson()
    {
        return RoadDamageResource::collection(
            RoadDamage::where('organization_id', auth('api')->user()->organization_id)->get()
        );
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
            'image'                => 'required',
            'location.latitude'    => 'required',
            'location.longitude'   => 'required',
            'direction'            => 'required',
            'damages'              => 'required',
            'damages.*.type'       => 'required',
            'damages.*.confidence' => 'required',
        ]);

        $user     = auth('api')->user();
        $location = $request->input('location');
        $damages  = $request->input('damages');
        $image    = Image::newImageFromBase64($request->input('image'));

        $road_damage = RoadDamage::findRelativeRoadDamage(
            $request->input('location.latitude'),
            $request->input('location.longitude')
        )->first();

        foreach ($damages as $report) {
            RoadDamageReport::create([
                'roaddamage_id' => $road_damage->id,
                'user_id'       => $user->id,
                'image_id'      => $image->id,
                'confidence'    => $report['confidence'],
                'latitude'      => $location['latitude'],
                'longitude'     => $location['longitude'],
            ]);
        }

        // return new RoadDamageResource($road_damage);
    }
}
