<?php

use App\Event;
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
        $this->endDate();
    }

    public function endDate()
    {
        $events = Event::all();
        foreach ($events as $event) {
            $end = strtotime($event->end . ' +1 day');
            $event->update(['end' => date('Y-m-d', intval($end))]);
        }
        echo 'done';
    }
}
