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

// Events
Route::prefix('event')->name('event.')->group(function () {
    Route::get('/get', 'EventController@index')->name('index');
    Route::get('/cities', 'EventController@cities')->name('cities');
    Route::post('/', 'EventController@store')->name('store');
    Route::get('/{month?}', 'EventController@show')->name('show');
});

// Organizer
Route::prefix('organizer')->name('organizer.')->group(function () {
    Route::get('/get', 'OrganizerController@index')->name('index');
    Route::post('/', 'OrganizerController@store')->name('store');
    Route::delete('{id?}', 'OrganizerController@destroy')->name('destroy');
});

Route::get('/{page}', 'HomeController@pages')->name('pages');
