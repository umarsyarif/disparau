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

Route::get('/dokumen', 'DokumenController@index')->name('dokumen.index');
Route::post('/dokumen', 'DokumenController@store')->name('dokumen.store');

Route::get('/dokumen/upload', 'DropfileController@index')->name('upload.index');
Route::post('/dokumen/upload', 'DropfileController@store')->name('upload.store');

Route::get('/{page}', 'HomeController@pages')->name('pages');
