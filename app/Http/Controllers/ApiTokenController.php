<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ApiToken;
use App\Http\Resources\ApiToken as ApiTokenResource;

class ApiTokenController extends Controller
{
    /**
     * Add authentication middleware.
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Insert an API token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function insert(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $new = ApiToken::create([
            'name' => $request->input('name'),
            'user_id' => auth('api')->user()->id
        ]);

        $token = auth()->claims(['token_id' => $new->id])
            ->setTTL(3600 * 24 * 30 * 48)
            ->login(auth('api')->user());

        return array_merge(
            ['jwt' => $token],
            ['token' => new ApiTokenResource($new)]
        );
    }

    /**
     * Delete an API token.
     *
     * @param int id
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function delete(int $id, Request $request)
    {
        $token = ApiToken::find($id);
        $token->delete();

        return ApiTokenResource::collection(
            ApiToken::where('user_id', auth('api')->user()->id)->get()
        );
    }

    /**
     * Get this users API tokens
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getAllJson(Request $request)
    {
        return ApiTokenResource::collection(
            ApiToken::where('user_id', auth('api')->user()->id)->get()
        );
    }
}
