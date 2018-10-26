<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
}
