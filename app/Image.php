<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
    protected $fillable = [
    'roaddamage_id',
    'image_name'
  ];
}
