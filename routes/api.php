<?php

use Illuminate\Http\Request;
use App\Http\Resources\RoadDamage as RoadDamageResource;
use App\Http\Controllers\RoadDamageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('forgot-password', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::post('reset-password', 'Auth\ResetPasswordController@reset');

Route::post('register', ['as' => 'register', 'uses' =>'AuthController@register']);
Route::post('login', ['as' => 'login', 'uses' =>'AuthController@login']);

Route::group(['middleware' => ['api', 'token']], function ($router) {
    Route::get('logout', 'AuthController@logout');
    Route::get('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
    Route::post('change-password', 'AuthController@changePassword');
});

Route::group(['middleware' => ['api', 'jwt.refresh', 'token']], function ($router) {
    Route::get('user', 'UserController@getUsersJson')
        ->middleware('role:admin');
    Route::delete('user/{id}', 'UserController@deleteUser')
        ->middleware('role:admin');
    Route::get('user/{id}/change-role', 'UserController@changeUserRole')
        ->middleware('role:admin');
    Route::get('user-invite', 'UserController@getInvitesJson')
        ->middleware('role:admin');
    Route::post('user-invite/new', 'UserController@inviteUser')
        ->middleware('role:admin');
    Route::get('user-invite/{inv_id}/revoke', 'UserController@revokeInvite')
        ->middleware('role:admin');
    Route::get('user-invite/{inv_id}/resend', 'UserController@resendInvite')
        ->middleware('role:admin');
    Route::get('user-invite/{token}', ['as' => 'getInviteJson', 'uses' =>'UserController@getInviteJson']);
    Route::get('road-damage/', 'RoadDamageController@getAllJson');
    Route::post('road-damage/new', 'RoadDamageController@insert');
    Route::get('road-damage/verified-images', 'RoadDamageController@getVerifiedImages');
    Route::get('road-damage/{id}', 'RoadDamageController@getJson');
    Route::post('road-damage/report/{id}/edit', 'RoadDamageController@editReport');
    Route::post('road-damage/{id}/edit', 'RoadDamageController@editDamage');
    Route::post('machine-learning/upload-model', 'MachineLearningController@insert')
        ->middleware('role:machine');
    Route::get('machine-learning/get-latest', 'MachineLearningController@getLatestJson');
    Route::get('api-token', 'ApiTokenController@getAllJson')
        ->middleware('role:admin');
    Route::post('api-token/new', 'ApiTokenController@insert')
        ->middleware('role:admin');
    Route::delete('api-token/{id}', 'ApiTokenController@delete')
        ->middleware('role:admin');

    Route::any('/{path?}', function () {
        return request()->json(['Non-existent endpoint'], 404);
    })->where('path', '.*');
});
