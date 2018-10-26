<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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
     * Get the right road damage based on provided longitude and latitude
     * values.
     *
     * Query source http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates
     *
     * @param float  $latitude
     * @param float  $longitude
     * @param string $direction
     *
     * @return Collection of \App\RoadDamage
     */
    public static function findRelativeRoadDamage(float $latitude, float $longitude, string $direction)
    {
        $lat_rad = deg2rad($latitude);
        $long_rad = deg2rad($longitude);

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
        )->havingRaw('distance < 10')
        ->whereRaw('direction = ?', [$direction])->get();

        return $res;
    }

    /**
     * Get the highest confidence report.
     *
     * @return \App\RoadDamageReport
     */
    public function getHighestConfidenceReport()
    {
        $reports = RoadDamageReport::where('roaddamage_id', $this->id)->get();
        $confidence = 0;
        $highest = new RoadDamageReport();
        foreach ($reports as $report) {
            if ($report->confidence >= $confidence) {
                $highest = $report;
            }
        }

        return $highest;
    }

    /**
     * Do we have a verified report?
     *
     * @return \App\RoadDamageReport
     */
    public function hasVerifiedReport()
    {
        return RoadDamageReport::where('roaddamage_id', $this->id)
            ->where('verified', 'verified')->exists();
    }
}
