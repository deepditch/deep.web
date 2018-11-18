<?php

namespace App\Http\Resources;

use App\RoadDamageReport;
use App\Http\Resources\RoadDamageReport as RoadDamageReportResource;
use Illuminate\Http\Resources\Json\JsonResource;

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
        $reports = RoadDamageReport::where('roaddamage_id', $this->id)->get();

        $list = [];
        foreach ($reports as $report) {
            $list[] = new RoadDamageReportResource($report);
        }

        $highestConfidenceReport = $this->getHighestConfidenceReport();

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
            'url' => $highestConfidenceReport->getImageUrl(),
            'reports' => $highestConfidenceReport->getAssociatedIds()
        ],
        'reportId' => $highestConfidenceReport->id,
        'reports' => $list,
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
      ];
    }
}
