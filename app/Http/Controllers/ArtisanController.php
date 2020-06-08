<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ArtisanController extends Controller
{
    public function cache()
    {
        Artisan::call('config:cache');
        print 'Configuration cached successfully!<br />';
        Artisan::call('route:cache');
        print 'Route cached successfully!<br />';
        Artisan::call('view:cache');
        print 'View cached successfully!';
    }

    public function clear()
    {
        Artisan::call('config:clear');
        print 'Configuration cache cleared!<br />';
        Artisan::call('route:clear');
        print 'Route cache cleared!<br />';
        Artisan::call('view:clear');
        print 'View cache cleared!';
    }

    public function optimize()
    {
        Artisan::call('optimize');
        print 'Configuration cache cleared!
        Configuration cached successfully!
        Route cache cleared!
        Routes cached successfully!
        Files cached successfully!';
    }
}
