<?php

namespace App;

use App\Mail\UserInvite as UserInviteMailable;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class UserInvite extends Model
{
    protected $fillable = [
        'email', 'token', 'organization_id',
    ];

    /**
     * Send an invite
     */
    public function sendInvite() {
        return Mail::to($this->email)
            ->send(new UserInviteMailable($this));
    }
}
