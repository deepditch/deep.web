<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\Http\Resources\UserInvite as UserInviteResource;
use App\User;
use App\UserInvite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Create a new AuthController instance.
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['getInviteJson']]);
    }

    /**
     * Get the base Json data of all the models for the authenticated user.
     *
     * @return App\Http\Resources\User
     */
    public function getUsersJson()
    {
        return UserResource::collection(
            User::where('organization_id', auth('api')->user()->organization_id)
            ->where('role', '!=', User::ML_ROLE)
            ->get()
        );
    }

    /**
     * Get the base Json data of the specified user invite by token.
     *
     * @param string $token
     *
     * @return App\Http\Resources\Invite
     */
    public function getInviteJson($token)
    {
        return new UserInviteResource(UserInvite::where('token', $token)->first());
    }

    /**
     * Get the base Json data of all the models for the authenticated user.
     *
     * @return App\Http\Resources\Invite
     */
    public function getInvitesJson()
    {
        return UserInviteResource::collection(
            UserInvite::where(
                'organization_id',
                auth('api')->user()->organization_id
            )->get()
        );
    }

    /**
     * Invite another user.
     *
     * @param Request $request
     *
     * @return App\Http\Resources\RoadDamage
     */
    public function inviteUser(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email|unique:user_invites,email|max:255',
        ]);

        $token = str_random(16);

        $invite = UserInvite::create([
            'email' => $request->input('email'),
            'organization_id' => auth('api')->user()->organization_id,
            'token' => $token,
        ]);

        $invite->sendInvite();

        return UserInviteResource::collection(
            UserInvite::where(
                'organization_id',
                auth('api')->user()->organization_id
            )->get()
        );
    }

    /**
     * Resend an invitation
     *
     * @param int $inv_id
     *
     * @return App\Http\Resources\RoadDamage
     */
    public function resendInvite(int $inv_id)
    {
        try {
            if ($invite = UserInvite::find($inv_id)) {
                $invite->sendInvite();
            }
        } catch (\Throwable $e) {
            // It's OK.
        }

        return UserInviteResource::collection(
            UserInvite::where(
                'organization_id',
                auth('api')->user()->organization_id
            )->get()
        );
    }

    /**
     * Revoke an invitation.
     *
     * @param int $inv_id
     *
     * @return App\Http\Resources\RoadDamage
     */
    public function revokeInvite(int $inv_id)
    {
        $invite = UserInvite::find($inv_id);
        if ($invite) {
            $invite->delete();
        }

        return UserInviteResource::collection(
            UserInvite::where(
                'organization_id',
                auth('api')->user()->organization_id
            )->get()
        );
    }

    /**
     * Delete a user.
     *
     * @param int $id
     *
     * @return App\Http\Resources\User
     */
    public function deleteUser(int $id)
    {
        try {
            $user = User::findOrFail($id);
            if ($user->organization_id === auth('api')->user()->organization_id) {
                $user->delete();
            } else {
                return response()->json(['You do not have permission to delete this user'], 403);
            }
        } catch (\Throwable $e) {
            return response()->json(['Deletion failed'], 404);
        }

        return UserResource::collection(
            User::where('organization_id', auth('api')->user()->organization_id)->get()
        );
    }

    /**
     * Change user role
     *
     * @param int $id
     *
     * @return App\Http\Resources\User
     */
    public function changeUserRole(int $id)
    {
        try {
            $user = User::findOrFail($id);
            if ($user->organization_id === auth('api')->user()->organization_id) {
                $user->role = $user->role === User::USER_ROLE ? User::ADMIN_ROLE : User::USER_ROLE;
                $user->save();
            } else {
                return response()->json(['You do not have permission to change role on this user.'], 403);
            }
        } catch (\Throwable $e) {
            return response()->json(['Change role failed'], 404);
        }

        return UserResource::collection(
            User::where('organization_id', auth('api')->user()->organization_id)->get()
        );
    }
}
