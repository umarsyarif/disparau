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
    Route::post('/', 'CityController@store')->name('store');
    Route::get('/get', 'CityController@index')->name('index');
    Route::post('/color/{id?}', 'CityController@changeColor')->name('color');
    Route::get('/with-events', 'CityController@showWithEvents')->name('events');
    Route::get('/{city?}', 'CityController@show')->name('show');
    Route::delete('/{id?}', 'CityController@destroy')->name('destroy');
});

// Pariwisata
Route::prefix('wisata')->name('wisata.')->group(function () {
    Route::get('/get', 'WisataController@index')->name('index');
    Route::get('/', 'WisataController@page')->name('page');
    Route::post('/', 'WisataController@store')->name('store');
    Route::get('/{id?}', 'WisataController@show')->name('show');
    Route::delete('/{id?}', 'WisataController@destroy')->name('destroy');
});

// Events
Route::prefix('event')->name('event.')->group(function () {
    Route::get('/get', 'EventController@index')->name('index');
    Route::get('/year', 'EventController@getYear')->name('year');
    Route::post('/year', 'EventController@showPerYear')->name('show.year');
    Route::post('/', 'EventController@store')->name('store');
    Route::get('/search', 'EventController@search')->name('search');
    Route::post('/search', 'EventController@searchResult')->name('search-result');
    Route::delete('/{id?}', 'EventController@destroy')->name('destroy');
    Route::get('/detail/{event?}', 'EventController@show')->name('show');
    Route::get('/incoming', 'EventController@incomingEvents')->name('show.incoming');
    Route::get('/dashboard', 'EventController@dashboard')->name('show.dashboard');
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
Route::prefix('artisan')->name('artisan.')->group(function () {
    Route::get('optimize', 'ArtisanController@optimize')->name('optimize');
    Route::get('cache', 'ArtisanController@cache')->name('cache');
    Route::get('clear', 'ArtisanController@clear')->name('clear');
    Route::get('migrate-fresh', 'ArtisanController@migrateFresh')->name('migrate-fresh');
});

Route::get('/{page}', 'HomeController@pages')->name('pages');
