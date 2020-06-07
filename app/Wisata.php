<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wisata extends Model
{
    protected $table = 'wisata';
    protected $guarded = ['id'];

    public function city()
    {
        return $this->belongsTo('App\City');
    }
}
