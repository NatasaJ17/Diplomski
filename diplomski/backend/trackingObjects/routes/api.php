<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LocationInfoController;
use App\Http\Controllers\ObjectTypeController;
use App\Http\Controllers\TrackingObjectController;
use App\Models\ObjectType;

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


//public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


Route::group(['middleware' => ['auth:sanctum']], function () {
     //Route::get('/admin/dashboard', [DashboardController::class, 'index']);
     Route::post('/logout', [AuthController::class, 'logout']);
     Route::get('/users', [AuthController::class, 'getAllUsers']);
     Route::delete('/users/{id}', [AuthController::class, 'destroy']);

     //object types
     Route::post('/objectType', [ObjectTypeController::class, 'addObjectType']);
     Route::get('/objectTypes', [ObjectTypeController::class, 'getObjectTypes']);
     Route::delete('/objectTypes/{id}', [ObjectTypeController::class, 'destroy']);
    
     //objects
     Route::post('/object', [TrackingObjectController::class, 'addObject']);
     Route::delete('/objects/{id}', [TrackingObjectController::class, 'destroy']);
     Route::get('/objects', [TrackingObjectController::class, 'getObjects']);
     Route::put('/objects/{id}', [TrackingObjectController::class, 'updateObject']);
  
     //location
     Route::post('/addLocationAndTime', [LocationInfoController::class, 'addLocationAndTime']);
     Route::delete('/locations/{id}', [LocationInfoController::class, 'destroy']);


});