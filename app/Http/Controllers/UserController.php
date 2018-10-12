<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Http\Resources\User as UserResource;

use App\User;
use App\UserInvite;
use App\Mail\UserInviteMailable;

class UserController extends Controller
{
    /**
     * Get the base Json data of all the models for the authenticated user
     *
     * @return App\Http\Resources\User
     */
    public function getUsersJson()
    {
        return UserResource::collection(
            User::where('organization_id', auth('api')->user()->organization_id)->get()
        );
    }

    /**
     * Invite another user
     *
     * @param Request $request
     * @return App\Http\Resources\RoadDamage
     */
    public function inviteUser(Request $request)
    {
        $token = str_random(16);

        $invite = UserInvite::create([
            'email' => $request->get('email'),
            'organization_id' =>  auth('api')->user()->organization_id,
            'token' => $token
        ]);

        Mail::to($request->get('email'))->send(new UserInviteMailable($invite));
        Nw::log()->debug('here');
        return response()->json(['Invite sent successfully.', 200]);
    }

    /**
     * Revoke an invitation
     *
     * @param Request $request
     * @return App\Http\Resources\RoadDamage
     */
    public function revokeInvite(Request $request)
    {
        if ($request->get('invite_id')) {
            $invite = UserInvite::findOrFail($request->get('invite_id'));
            if ($invite) {
                $invite->delete();
            }
        }

        return response()->json(['Invite revoked successfully.', 200]);
    }
}
