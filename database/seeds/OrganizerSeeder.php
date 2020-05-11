<?php

use App\Organizer;
use Illuminate\Database\Seeder;

class OrganizerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Organizer::create(['name' => 'DINAS PARIWISATA KABUPATEN KUANTAN SINGINGI', 'contact' => '081312329867']);
        Organizer::create(['name' => 'DINAS PARIWISATA KABUPATEN INDRAGIRI HULU', 'contact' => '081312329867']);
        Organizer::create(['name' => 'DINAS PARIWISATA KABUPATEN INDRAGIRI HILIR', 'contact' => '081312329867']);
        Organizer::create(['name' => 'DINAS PARIWISATA KABUPATEN PELALAWAN', 'contact' => '081312329867']);
        Organizer::create(['name' => 'DINAS PARIWISATA KABUPATEN SIAK', 'contact' => '081312329867']);
        Organizer::create(['name' => 'DINAS PARIWISATA KABUPATEN KAMPAR', 'contact' => '081312329867']);
        Organizer::create(['name' => 'DINAS PARIWISATA KABUPATEN ROKAN HULU', 'contact' => '081312329867']);
        Organizer::create(['name' => 'DINAS PARIWISATA KABUPATEN BENGKALIS', 'contact' => '081312329867']);
        Organizer::create(['name' => 'DINAS PARIWISATA KABUPATEN ROKAN HILIR', 'contact' => '081312329867']);
        Organizer::create(['name' => 'DINAS PARIWISATA KABUPATEN KEPULAUAN MERANTI', 'contact' => '081312329867']);
        Organizer::create(['name' => 'DINAS PARIWISATA KOTA PEKANBARU', 'contact' => '081312329867']);
        Organizer::create(['name' => 'DINAS PARIWISATA KOTA DUMAI', 'contact' => '081312329867']);
    }
}
