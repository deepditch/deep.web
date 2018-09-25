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

Route::group(['middleware' => 'api'], function ($router) {
    Route::post('register', ['as' => 'register', 'uses' =>'AuthController@register']);
    Route::post('login', ['as' => 'login', 'uses' =>'AuthController@login']);
    Route::get('logout', 'AuthController@logout');
    Route::get('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
    Route::get('/road-damage/', 'RoadDamageController@getAllJson');
    Route::post('/road-damage/new', 'RoadDamageController@insert');
    Route::get('/road-damage/{id}', 'RoadDamageController@getJson');
});
