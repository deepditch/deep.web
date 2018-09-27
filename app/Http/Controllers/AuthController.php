<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Http\Resources\User as UserResource;

use App\User;
use App\Organization;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Register a user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email|max:255',
            'name' => 'required|max:255',
        ]);

        if ($request->input('organization')) {
            $request->validate([
                'organization' => 'unique:organizations,name|max:255'
            ]);
            $organization = Organization::create([
                'name' => $request->input('name')
            ]);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'organization_id' => $organization->id ?? 0
        ]);

        return response()->json(['success' => true, 'data'=> [ 'Registration success.' ]], 200);
    }

    /**
     * Log in.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (! $token = auth('api')->attempt([
            'email' => $request->input('email'),
            'password' => $request->input('password')])
        ) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(
            array_merge(
                ['user' => (new UserResource(User::find(auth('api')->user()->id)))->toArray($request)],
                $this->respondWithToken($request)
            )
        );
    }

    /**
     * Get the authenticated User.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        return [
            'user' => (new UserResource(
                User::find(auth('api')->user()->id)
             ))->toArray($request)
        ];
    }

    /**
     * Refresh a token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        return response()->json($this->respondWithToken(auth('api')->refresh()));
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ];
    }

    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
