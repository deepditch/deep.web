<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
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
        'organization_id',
    ];

    /**
     * Get the image object.
     *
     * @return \App\Image
     */
    public function getImage()
    {
        return Image::where('roaddamage_id', $this->id)->first() ?? (new Image());
    }

    /**
     * Get the image URL.
     *
     * @return string image URL
     */
    public function getImageUrl()
    {
        return env('APP_URL') . Storage::url($this->getImage()->image_name);
    }

    /**
     * Get the right road damage based on provided longitude and latitude
     * values.
     *
     * http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates
     *
     * @param float $latitude
     * @param float $longitude
     *
     * @return Collection of \App\RoadDamage
     */
    public static function findRelativeRoadDamage(float $latitude, float $longitude)
    {
        $lat_rad  = deg2rad($latitude);
        $long_rad = deg2rad($longitude);

        var_dump("acos(
            sin({$lat_rad}) *
            sin(RADIANS(latitude)) +
            cos({$lat_rad}) *
            cos(RADIANS(latitude)) *
            cos(RADIANS(longitude) -
            {$long_rad})
        ) * 6371000 AS distance");
        $res = self::select(
            [
                '*',
                DB::raw(
                    "acos(
                    sin({$lat_rad}) *
                    sin(RADIANS(latitude)) +
                    cos({$lat_rad}) *
                    cos(RADIANS(latitude)) *
                    cos(RADIANS(longitude) -
                    {$long_rad})
                ) * 6371000 AS distance"
            ),
        ]
        )->havingRaw('distance < 10')->get();

        return $res;
    }
}
