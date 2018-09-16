<?php

namespace App\Http\Resources;

use App\Image;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class RoadDamage extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request) {
      Log::debug($this->getImage());
      return [
        'id' => $this->id,
        'user_id' => $this->user_id,
        'latitude' => $this->latitude,
        'longitude' => $this->longitude,
        'image' => env('APP_URL') . Storage::url(
          Image::where('roaddamage_id', $this->id)->first()->image_name
        ),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
      ];
    }
}
