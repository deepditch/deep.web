<?php

namespace App\Http\Resources;

use App\Image;

use Illuminate\Http\Resources\Json\JsonResource;

class RoadDamage extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request) {
      return [
        'id' => $this->id,
        'user_id' => $this->user_id,
        'latitude' => $this->latitude,
        'longitude' => $this->longitude,
        'image' => $this->getImageUrl(),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
      ];
    }
}
