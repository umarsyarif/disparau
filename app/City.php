<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = ['name', 'color'];

    public function events()
    {
        return $this->hasMany('App\Event');
    }
}
