<?php

namespace App\Http\Controllers;

use App\Dokumen;
use App\Dropfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DropfileController extends Controller
{
    public function __construct()
    {
        $this->dropbox = Storage::disk('dropbox')->getDriver()->getAdapter()->getClient();
    }

    public function index()
    {
        $files = Dropfile::all();
        $jenis = Dokumen::all();
        $data = [
            'files' => $files,
            'jenis' => $jenis
        ];
        return view('pages.upload', $data);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $judul = $request->judul;
        $slug = \Str::slug($judul);
        $jenis = Dokumen::where('id_jenis', $request->jenis)->first();
        $file = $request->file('foto');

        $fileExtension = $file->getClientOriginalExtension();
        $fileName = $slug . '.' . $fileExtension;

        Storage::disk('dropbox')->putFileAs('dokumen/' . $jenis->nama_jenis . '/', $file, $fileName);
        $this->dropbox->createSharedLinkWithSettings('dokumen/' . $jenis->nama_jenis . '/' . $fileName);

        Dropfile::create([
            'id_jenis' => $jenis->id_jenis,
            'judul' => $judul,
            'file_dokumen' => $jenis->nama_jenis . '/' . $slug,
            'gambar' => $fileName,
            'dibaca' => 0,
            'shlink' => $slug
        ]);
        return redirect()->route('upload.index');
        // $data = [
        //     'id_jenis' => $jenis->id_jenis,
        //     'judul' => $judul,
        //     'file_dokumen' => $jenis->nama_jenis.'/'.$slug,
        //     'gambar' => $slug.'.'.$fileExtension,
        //     'shlink' => $slug
        // ];
        // return $data;
    }

    public function show($fileTitle)
    { }
}
