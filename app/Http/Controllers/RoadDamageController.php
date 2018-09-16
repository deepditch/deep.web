<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\RoadDamage;
use App\Image;

use App\Http\Resources\RoadDamage as RoadDamageResource;

class RoadDamageController extends Controller {

  /**
   * Get the base Json data of this model
   *
   * @param  int $id id of the resource model we're getting
   * @return App\Http\Resources\RoadDamage
   */
  public function getJson(int $id) {
    return (new RoadDamageResource(RoadDamage::find($id)));
  }

  /**
   * Insert a RoadDamage into the database.
   *
   * @param  Illuminate\Http\Request $request
   * @return App\Http\Resources\RoadDamage
   */
  public function insert(Request $request) {
    // @todo add validation
    $road_damage = RoadDamage::create([
      'user_id' => $request->input('user_id'),
      'latitude' => $request->input('latitude'),
      'longitude' => $request->input('longitude')
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

    return (new RoadDamageResource($road_damage));
  }
}