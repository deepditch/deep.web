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

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');
Route::post('recover', 'AuthController@recover');

Route::group(['middleware' => ['jwt.auth']], function() {
    Route::get('logout', 'AuthController@logout');
    Route::get('test', function(){
        return response()->json(['foo'=>'bar']);
    });
    Route::get('/road-damage/{id}', 'RoadDamageController@getJson');
    Route::post('/road-damage/new', 'RoadDamageController@insert');
});

