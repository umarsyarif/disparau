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
        City::create(['name' => 'KABUPATEN KUANTAN SINGINGI', 'color' => '#ff8080', 'meta' => '{"lat":-0.4411596,"lng":101.5248055}']);
        City::create(['name' => 'KABUPATEN INDRAGIRI HULU', 'color' => '#400080', 'meta' => '{"lat":-0.7361181,"lng":102.2547919}']);
        City::create(['name' => 'KABUPATEN INDRAGIRI HILIR', 'color' => '#80ff80', 'meta' => '{"lat":-0.1456733,"lng":102.989615}']);
        City::create(['name' => 'KABUPATEN PELALAWAN', 'color' => '#0080ff', 'meta' => '{"lat":0.1460923,"lng":102.2547919}']);
        City::create(['name' => 'KABUPATEN SIAK', 'color' => '#ff80ff', 'meta' => '{"lat":0.8118812,"lng":101.7979613}']);
        City::create(['name' => 'KABUPATEN KAMPAR', 'color' => '#804040', 'meta' => '{"lat":0.146671,"lng":101.1617356}']);
        City::create(['name' => 'KABUPATEN ROKAN HULU', 'color' => '#008080', 'meta' => '{"lat":1.0410934,"lng":100.439656}']);
        City::create(['name' => 'KABUPATEN BENGKALIS', 'color' => '#8000ff', 'meta' => '{"lat":1.4139187,"lng":101.6157773}']);
        City::create(['name' => 'KABUPATEN ROKAN HILIR', 'color' => '#ff8040', 'meta' => '{"lat":1.6463978,"lng":100.8000051}']);
        City::create(['name' => 'KABUPATEN KEPULAUAN MERANTI', 'color' => '#0000a0', 'meta' => '{"lat":0.9208765,"lng":102.6675575}']);
        City::create(['name' => 'KOTA PEKANBARU', 'color' => '#808040', 'meta' => '{"lat":0.5070677,"lng":101.4477793}']);
        City::create(['name' => 'KOTA DUMAI', 'color' => '#408080', 'meta' => '{"lat":1.6666349,"lng":101.4001855}']);
    }
}
