<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'description', 'color', 'meta', 'header', 'video'];

    public function events()
    {
        return $this->hasMany('App\Event');
    }

    public function wisata()
    {
        return $this->hasMany('App\Wisata');
    }
}
