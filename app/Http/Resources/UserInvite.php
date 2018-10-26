<?php

namespace App\Http\Resources;

use App\Organization;
use Illuminate\Http\Resources\Json\JsonResource;

class UserInvite extends JsonResource
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
            'id'           => $this->id,
            'email'        => $this->email,
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
            'organization' => Organization::find($this->organization_id) ?
                Organization::find($this->organization_id)->toArray() :
                null,
        ];
    }
}
