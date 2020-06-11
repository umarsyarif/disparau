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

Auth::routes(['register' => false]);

// Cities
Route::prefix('city')->name('cities.')->group(function () {
    Route::get('/get', 'CityController@index')->name('index');
    Route::get('/with-events', 'CityController@showWithEvents')->name('events');
    Route::get('/{city?}', 'CityController@show')->name('show');
});

// Pariwisata
Route::prefix('wisata')->name('wisata.')->group(function () {
    Route::get('/', 'WisataController@page')->name('page');
});

// Events
Route::prefix('event')->name('event.')->group(function () {
    Route::get('/get', 'EventController@index')->name('index');
    Route::get('/cities', 'EventController@cities')->name('cities');
    Route::get('/year', 'EventController@getYear')->name('year');
    Route::post('/year', 'EventController@showPerYear')->name('show.year');
    Route::post('/', 'EventController@store')->name('store');
    Route::get('/search', 'EventController@search')->name('search');
    Route::post('/search', 'EventController@searchResult')->name('search-result');
    Route::post('/color/{id?}', 'EventController@changeColor')->name('color');
    Route::delete('/{id?}', 'EventController@destroy')->name('destroy');
    Route::get('/detail/{event?}', 'EventController@show')->name('show');
    Route::get('/incoming', 'EventController@incomingEvents')->name('show.incoming');
    Route::get('/{date?}', 'EventController@showPerDay')->name('show.day');
    Route::get('/get/{date?}', 'EventController@showPerMonth')->name('show.month');
});

// Organizer
Route::prefix('organizer')->name('organizer.')->group(function () {
    Route::get('/get', 'OrganizerController@index')->name('index');
    Route::post('/', 'OrganizerController@store')->name('store');
    Route::delete('{id?}', 'OrganizerController@destroy')->name('destroy');
});

// Artisan
Route::prefix('artisan')->name('artisan')->group(function () {
    Route::get('optimize', 'ArtisanController@optimize')->name('optimize');
    Route::get('cache', 'ArtisanController@cache')->name('cache');
    Route::get('clear', 'ArtisanController@clear')->name('clear');
    Route::get('migrate-fresh', 'ArtisanController@migrateFresh')->name('migrate-fresh');
});

Route::get('/{page}', 'HomeController@pages')->name('pages');
