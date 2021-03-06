<?php

namespace App\Http\Resources;

use App\RoadDamageReport;
use App\Http\Resources\RoadDamageReport as RoadDamageReportResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Cache;

class RoadDamage extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        return Cache::remember("roaddamage-resource:{$this->id}", 1800 * 30, function () {
            $reports = RoadDamageReport::where('roaddamage_id', $this->id)->get();

            $list = [];
            foreach ($reports as $report) {
                $list[] = new RoadDamageReportResource($report);
            }

            $latest_report = $this->getLatestReport();

            return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'position' => [
                'latitude' => $this->latitude,
                'longitude' => $this->longitude,
                'direction' => $this->direction,
                'streetname' => $this->getRoadName(),
            ],
            'type' => $this->type,
            'verified' => $this->hasVerifiedReport(),
            'label' => $this->status,
            'false_positive' => $this->hasFalsePositiveReport(),
            'image' => [
                'url' => $latest_report->getImageUrl(),
                'reports' => $latest_report->getAssociatedIds(),
            ],
            'reportId' => $latest_report->id,
            'reports' => $list,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
          ];
        });
    }
}
