<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\UserInvite as Invite;

class UserInvite extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new UserInvite message instance.
     *
     * @param App\UserInvite $invite
     * @return void
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
                'token' => $this->invite->token
            ]);
    }
}
