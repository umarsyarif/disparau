<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'color', 'meta'];

    public function events()
    {
        return $this->hasMany('App\Event');
    }

    public function wisata()
    {
        return $this->hasMany('App\Wisata');
    }
}
