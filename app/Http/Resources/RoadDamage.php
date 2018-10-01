<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Image;
use App\Organization;

class RoadDamage extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
        'id' => $this->id,
        'user_id' => $this->user_id,
        'position' => [
            'latitude' => $this->latitude,
            'longitude' => $this->longitude
        ],
        'type' => $this->type ?? '',
        'image' => $this->getImageUrl(),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
        'organization' => Organization::find($this->organization_id) ?
            Organization::find($this->organization_id)->toArray() :
            null
      ];
    }
}
