<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

use App\RoadDamage;
use App\Image;

use App\Http\Resources\RoadDamage as RoadDamageResource;

class RoadDamageController extends Controller
{

    /**
     * Add authentication middleware.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Get the base Json data of this model
     *
     * @param  int $id id of the resource model we're getting
     * @return App\Http\Resources\RoadDamage
     */
    public function getJson(int $id)
    {
        return new RoadDamageResource(RoadDamage::findOrFail($id));
    }

    /**
     * Get the base Json data of all the models for the authenticated user
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
     * @param  Illuminate\Http\Request $request
     * @return App\Http\Resources\RoadDamage
     */
    public function insert(Request $request)
    {
        $request->validate([
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        $road_damage = RoadDamage::create([
          'user_id' => auth('api')->user()->id,
          'latitude' => $request->input('latitude'),
          'longitude' => $request->input('longitude'),
          'organization_id' => auth('api')->user()->organization_id,
          'type' => $request->input('type') ?? 'D00'
        ]);

        if (! empty($request->file('image'))) {
            try {
                $file_path = $request->file('image')->store('roaddamage');
            } catch (\Exception $e) {
                return $e->getMessage();
            }

            Image::create([
              'roaddamage_id' => $road_damage->id,
              'image_name' => $file_path
            ]);
        }

        return new RoadDamageResource($road_damage);
    }
}
