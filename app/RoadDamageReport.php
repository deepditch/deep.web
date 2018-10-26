<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class RoadDamageReport extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'roaddamage_reports';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'roaddamage_id',
        'user_id',
        'image_id',
        'organization_id',
        'verified',
        'confidence',
        'latitude',
        'longitude',
    ];

    /**
     * Get the image object.
     *
     * @return \App\Image
     */
    public function getImage()
    {
        return Image::find($this->image_id) ?? (new Image());
    }

    /**
     * Get the image URL.
     *
     * @return string image URL
     */
    public function getImageUrl()
    {
        return env('APP_URL').Storage::url($this->getImage()->image_name);
    }

    /**
     * Get road damage.
     *
     * @return \App\RoadDamage
     */
    public function getRoadDamage()
    {
        return RoadDamage::find($this->roaddamage_id) ?? new RoadDamage();
    }
}
