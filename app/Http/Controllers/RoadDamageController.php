<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\RoadDamage;
use App\Http\Resources\RoadDamage as RoadDamageResource;

class RoadDamageController extends Controller {

  /**
   * Get the base Json data of this model
   *
   * @param  int $id id of the resource model we're getting
   * @return App\Http\Resources\RoadDamage
   */
  public function getJson(int $id) {
    return new RoadDamageResource(RoadDamage::find($id));
  }

  /**
   * Insert a RoadDamage into the database.
   *
   * @param  Illuminate\Http\Request $request
   * @return App\Http\Resources\RoadDamage
   */
  public function insert(Request $request) {
    // @todo add validation
    $road_damage = new RoadDamage();
    $road_damage->user_id = $request->input('user_id');
    $road_damage->latitude = $request->input('latitude');
    $road_damage->longitude = $request->input('longitude');
    $road_damage->save();

    return (new RoadDamageResource($road_damage));
  }
}