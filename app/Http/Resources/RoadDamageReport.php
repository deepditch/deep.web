<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Cache;

class RoadDamageReport extends JsonResource
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
        return Cache::remember('report-resource:'.$this->id, 1800 * 30, function () {
            return [
                'id' => $this->id,
                'user_id' => $this->user_id,
                'roaddamage_id' => $this->roaddamage_id,
                'type' => $this->getRoadDamage()->type,
                'verified' => $this->verified,
                'confidence' => $this->confidence,
                'latitude' => $this->latitude,
                'longitude' => $this->longitude,
                'image' => [
                    'url' => $this->getImageUrl(),
                    'reports' => $this->getAssociatedIds(),
                ],
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
              ];
        });
    }
}
