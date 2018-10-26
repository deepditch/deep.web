<?php

namespace App\Mail;

use App\UserInvite as Invite;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserInvite extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new UserInvite message instance.
     *
     * @param App\UserInvite $invite
     */
    public function __construct(Invite $invite)
    {
        $this->invite = $invite;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.invite')
            ->with([
                'token' => $this->invite->token,
            ]);
    }
}
