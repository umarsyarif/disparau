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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dokumen', 'DokumenController@index')->name('dokumen.index');
Route::post('/dokumen', 'DokumenController@store')->name('dokumen.store');

Route::get('/dokumen/upload', 'DropfileController@index')->name('upload.index');
Route::post('/dokumen/upload', 'DropfileController@store')->name('upload.store');
