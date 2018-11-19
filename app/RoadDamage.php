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
        'type',
        'status',
        'direction',
        'image_id',
        'organization_id',
    ];

    const DAMAGE_TYPES = [
        'D00',
        'D01',
        'D10',
        'D11',
        'D20',
        'D40',
        'D43',
        'D44'
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
     * @param string $type
     *
     * @return Collection of \App\RoadDamage
     */
    public static function findRelativeRoadDamage(float $latitude, float $longitude, string $direction, string $type)
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
        ->whereRaw("direction = '{$direction}'")
        ->whereRaw("`type` = '{$type}'")->get();

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
     * Do we have a verified report (and not a false-positive report).
     *
     * @return bool
     */
    public function hasVerifiedReport(): bool
    {
        return
        !RoadDamageReport::where('roaddamage_id', $this->id)
            ->where('verified', 'false-positive')->exists() &&
        RoadDamageReport::where('roaddamage_id', $this->id)
            ->where('verified', 'verified')->exists();
    }

    /**
     * Get verified reports (and not false-positive reports).
     *
     * @return collection
     */
    public function getVerifiedReports()
    {
        return RoadDamageReport::where('roaddamage_id', $this->id)
            ->where('verified', 'verified')->get();
    }

    /**
     * Do we have a false-positive report.
     *
     * @return bool
     */
    public function hasFalsePositiveReport(): bool
    {
        return RoadDamageReport::where('roaddamage_id', $this->id)
            ->where('verified', 'false-positive')->exists();
    }

    /**
     * Do we have a false-positive report.
     *
     * @return string
     */
    public function getRoadName(): string
    {
        return app('geocoder')
            ->reverseQuery(\Geocoder\Query\ReverseQuery::fromCoordinates($this->latitude, $this->longitude))
            ->get()->first()->toArray()['streetName'] ?? '';
    }
}
