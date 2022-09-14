<?php

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\DB;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:admin')
    ->get('/imagesAll', function (Request $request) {
        return DB::table('images')
            ->select('id', 'image')
            ->get();
    });

Route::middleware('auth:admin')
    ->get('/searchUsers', function (Request $request) {
        return User::searchUsers($request->search)->select('id', 'name', 'email')->get();
    });

Route::middleware('auth:admin')
    ->get('/searchProgram', function (Request $request) {
        return Event::where('name', $request->program)->select('id', 'name', 'start_date')->get();
    });
