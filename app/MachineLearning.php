<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MachineLearning extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ml_models';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'path'
        ];

    /**
     * Get the ML Model URL.
     *
     * @return string image URL
     */
    public function getMachineLearningModelUrl()
    {
        return url($this->path);
    }
}
