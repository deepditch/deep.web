<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Mail\UserInvite as UserInviteMailable;

class UserInvite extends Model
{
    protected $fillable = [
        'email', 'token', 'organization_id',
    ];

    /**
     * Send an invite
     */
    public function sendInvite() {
        Mail::to($this->email)
            ->from(env('MAIL_FROM_ADDRESS'))
            ->send(new UserInviteMailable($this));
    }
}
