<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dropfile extends Model
{
    protected $table = 'dokumen_par';
    protected $primaryKey = 'id_dokumen';

    protected $guarded = [];
    const CREATED_AT = 'tgl_posting';
    const UPDATED_AT = null;
}
