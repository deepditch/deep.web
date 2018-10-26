<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
        return [
        'id' => $this->id,
        'user_id' => $this->user_id,
        'roaddamage_id' => $this->roaddamage_id,
        'type' => $this->getRoadDamage()->type,
        'verified' => $this->verified,
        'confidence' => $this->confidence,
        'latitude' => $this->latitude,
        'longitude' => $this->longitude,
        'image' => $this->getImageUrl(),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
      ];
    }
}