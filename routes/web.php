<?php

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

Route::get('/', 'HomeController@index')->name('home');
Route::get('/dashboard', 'HomeController@dashboard')->name('dashboard');

Auth::routes();

// Cities
// Route::prefix('cities')->name('cities.')->group(function () { });

// Events
Route::prefix('event')->name('event.')->group(function () {
    Route::get('/get', 'EventController@index')->name('index');
    Route::get('/cities', 'EventController@cities')->name('cities');
    Route::post('/', 'EventController@store')->name('store');
    Route::post('/color/{id?}', 'EventController@changeColor')->name('color');
    Route::delete('/{id?}', 'EventController@destroy')->name('destroy');
    Route::get('/detail/{event?}', 'EventController@show')->name('show');
    Route::get('/{date?}', 'EventController@showPerDay')->name('show.day');
    Route::get('/get/{date?}', 'EventController@showPerMonth')->name('show.month');
});

// Organizer
Route::prefix('organizer')->name('organizer.')->group(function () {
    Route::get('/get', 'OrganizerController@index')->name('index');
    Route::post('/', 'OrganizerController@store')->name('store');
    Route::delete('{id?}', 'OrganizerController@destroy')->name('destroy');
});

Route::get('/{page}', 'HomeController@pages')->name('pages');
