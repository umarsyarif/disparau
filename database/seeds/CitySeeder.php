<?php

use App\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        City::create(['name' => 'KABUPATEN KUANTAN SINGINGI']);
        City::create(['name' => 'KABUPATEN INDRAGIRI HULU']);
        City::create(['name' => 'KABUPATEN INDRAGIRI HILIR']);
        City::create(['name' => 'KABUPATEN PELALAWAN']);
        City::create(['name' => 'KABUPATEN SIAK']);
        City::create(['name' => 'KABUPATEN KAMPAR']);
        City::create(['name' => 'KABUPATEN ROKAN HULU']);
        City::create(['name' => 'KABUPATEN BENGKALIS']);
        City::create(['name' => 'KABUPATEN ROKAN HILIR']);
        City::create(['name' => 'KABUPATEN KEPULAUAN MERANTI']);
        City::create(['name' => 'KOTA PEKANBARU']);
        City::create(['name' => 'KOTA DUMAI']);
    }
}
