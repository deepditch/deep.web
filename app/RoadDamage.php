<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class RoadDamage extends Model {

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'user_id',
    'latitude',
    'longitude',
    'image_id',
  ];

  /**
   * Get the image object
   *
   * @return \App\Image
   */
  public function getImage() {
    return \App\Image::find($this->image_id);
  }


}
