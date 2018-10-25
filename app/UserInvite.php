<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserInvite extends Model
{
    protected $fillable = [
        'email', 'token', 'organization_id'
    ];
}
