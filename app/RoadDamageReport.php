<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

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
     * Constants for `verified` enums
     */
    const VERIFIED = 'verified';
    const UNVERIFIED = 'unverified';
    const FALSEPOSITIVE = 'false-positive';

    /**
     * Override save to invalidate cache
     *
     * @param  array  $options
     * @return bool
     */
    public function save(array $options = []) {
        Cache::forget('report-resource:' . $this->id);
        return parent::save($options);
    }

    /**
     * Override update to invalidate cache
     *
     * @param  array  $attributes
     * @param  array  $options
     * @return bool
     */
    public function update(array $attributes = [], array $options = []) {
        Cache::forget('report-resource:' . $this->id);
        return parent::update($attributes, $options);
    }

    /**
     * Override delete to invalidate cache
     *
     * @return bool|null
     *
     * @throws \Exception
     */
    public function delete()
    {
        Cache::forget('report-resource:' . $this->id);
        return parent::delete();
    }

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
        return env('APP_URL').$this->getImage()->image_name;
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

    /**
    * Is this report verified?
    *
    * @return bool
    */
    public function isVerified() : bool
    {
        return $this->verified === RoadDamageReport::VERIFIED;
    }

    /**
     * Get associated RoadDamageReport IDs with the same image
     *
     * @return array
     */
    public function getAssociatedReportIds()
    {
        return RoadDamageReport::select('id')->where('image_id', '=', $this->image_id)->get()->toArray();
    }

    /**
     * Get associated RoadDamage IDs with the same image
     *
     * @return array
     */
    public function getAssociatedDamageIds()
    {
        return RoadDamageReport::select('roaddamage_id')->where('image_id', '=', $this->image_id)->get()->toArray();
    }

    /**
     * Get associated road damage and reports that share this reports image
     *
     * @return array
     */
    public function getAssociatedIds()
    {
        return RoadDamageReport::select('id', 'roaddamage_id')->where('image_id', '=', $this->image_id)->get()->toArray();
    }
}
