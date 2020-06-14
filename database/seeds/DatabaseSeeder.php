<?php

use Illuminate\Database\Seeder;
use bfinlay\SpreadsheetSeeder\SpreadsheetSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(SpreadsheetSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(CitySeeder::class);
        $this->call(OrganizerSeeder::class);
    }
}
