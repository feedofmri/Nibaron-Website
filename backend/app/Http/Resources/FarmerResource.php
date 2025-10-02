<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FarmerResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'nid' => $this->nid,
            'phone' => $this->phone,
            'address' => $this->address,
            'district' => $this->district,
            'upazila' => $this->upazila,
            'union' => $this->union,
            'village' => $this->village,
            'farming_experience' => $this->farming_experience,
            'total_land' => $this->total_land,
            'verification_status' => $this->verification_status,
            'profile_image' => $this->profile_image,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => new UserResource($this->whenLoaded('user')),
            'farms' => FarmResource::collection($this->whenLoaded('farms')),
            'products' => ProductResource::collection($this->whenLoaded('products')),
        ];
    }
}
