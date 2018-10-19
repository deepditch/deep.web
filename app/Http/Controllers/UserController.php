<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

use App\Http\Resources\User as UserResource;
use App\Http\Resources\UserInvite as UserInviteResource;

use App\User;
use App\UserInvite;
use App\Mail\UserInvite as UserInviteMailable;

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
     * Get the base Json data of all the models for the authenticated user
     *
     * @return App\Http\Resources\Invite
     */
    public function getInvitesJson()
    {
        return UserInviteResource::collection(
            UserInvite::where(
                'organization_id', auth('api')->user()->organization_id
            )->get()
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
        $request->validate([
            'email' =>
            'required|email|unique:users,email|unique:user_invites,email|max:255',
        ]);

        $token = str_random(16);

        $invite = UserInvite::create([
            'email' => $request->input('email'),
            'organization_id' =>  auth('api')->user()->organization_id,
            'token' => $token
        ]);

        Mail::to($request->input('email'))->send(new UserInviteMailable($invite));

        return UserInviteResource::collection(
            UserInvite::where(
                'organization_id', auth('api')->user()->organization_id
            )->get()
        );
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

        return UserInviteResource::collection(
            UserInvite::where(
                'organization_id', auth('api')->user()->organization_id
            )->get()
        );
    }
}