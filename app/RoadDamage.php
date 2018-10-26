<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class RoadDamage extends Model
{

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
        'organization_id'
    ];

    /**
     * Get the image object
     *
     * @return \App\Image
     */
    public function getImage()
    {
        return Image::where('roaddamage_id', $this->id)->first() ?? (new Image);
    }

    /**
     * Get the image URL
     *
     * @return string image URL
     */
    public function getImageUrl()
    {
        return env('APP_URL') . Storage::url($this->getImage()->image_name);
    }
}
