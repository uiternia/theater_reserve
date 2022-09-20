<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\ReserveController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';

Route::prefix('admin')->name('admin.')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->middleware(['auth:admin', 'verified'])->name('dashboard');


    Route::resource('images', ImageController::class)->middleware(['auth:admin', 'verified']);
    Route::resource('events', EventController::class)->middleware(['auth:admin', 'verified']);
    Route::resource('reserves', ReserveController::class)->middleware(['auth:admin', 'verified']);

    Route::get('visit', [VisitController::class, 'index'])->middleware(['auth:admin', 'verified'])->name('visit.index');
    Route::get('visit/true/{id}', [VisitController::class, 'true'])->middleware(['auth:admin', 'verified'])->name('visit.true');
    Route::get('visit/false/{id}', [VisitController::class, 'false'])->middleware(['auth:admin', 'verified'])->name('visit.false');

    require __DIR__ . '/admin.php';
});
