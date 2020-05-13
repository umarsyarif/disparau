<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organizer extends Model
{
    protected $fillable = ['name', 'contact'];

    public function events()
    {
        return $this->hasMany('App\Event');
    }
}
