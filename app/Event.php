<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $guarded = ['id'];

    protected $hidden = ['description'];

    public function city()
    {
        return $this->belongsTo('App\City');
    }

    public function organizer()
    {
        return $this->belongsTo('App\Organizer');
    }
}
