<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dokumen extends Model
{
    protected $table = 'jenis_dok';
    protected $guarded = [];
    protected $primaryKey = 'id_jenis';
    public $timestamps = false;
}
