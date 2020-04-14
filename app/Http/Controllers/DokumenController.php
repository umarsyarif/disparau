<?php

namespace App\Http\Controllers;

use App\Dokumen;
use Illuminate\Http\Request;

class DokumenController extends Controller
{
    public function index()
    {
        $dokumen = Dokumen::all();
        return view('pages.dokumen', compact('dokumen'));
    }

    public function store(Request $request)
    {
        // return $request;
        Dokumen::create([
            'nama_jenis' => $request->nama
        ]);
        return redirect('dokumen');
    }
}
