<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\Organization;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Register a user.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email|max:255',
            'name' => 'required|max:255',
            'password' => 'required|min:8',
        ]);

        $role = User::USER_ROLE;

        if ($request->input('organization')) {
            $request->validate([
                'organization' => 'unique:organizations,name|max:255',
            ]);

            $organization = Organization::create([
                'name' => $request->input('organization'),
            ]);

            $role = User::ADMIN_ROLE;
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'organization_id' => isset($organization) ? $organization->id : config('organization.default_id'),
            'role' => $role,
        ]);

        return response()->json(['user' => new UserResource(User::find($user->id))], 200);
    }

    /**
     * Log in.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!$token = auth('api')->attempt([
            'email' => $request->input('email'),
            'password' => $request->input('password'), ])
        ) {
            return response()->json(['error' => 'Invalid email or password!'], 401);
        }

        return response()->json(
            array_merge(
                ['user' => new UserResource(User::find(auth('api')->user()->id))],
                $this->getTokenArray($token)
            )
        );
    }

    /**
     * Get the authenticated User.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        return [
            'user' => new UserResource(
                User::find(auth('api')->user()->id)
            ),
        ];
    }

    /**
     * Refresh a token.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        return response()->json($this->getTokenArray(auth('api')->refresh()));
    }

    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function getTokenArray($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ];
    }
}
