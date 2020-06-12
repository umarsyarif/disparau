<?php

namespace App\Http\Controllers;

use App\Wisata;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WisataController extends Controller
{
    public function page()
    {
        return view('wisata.index');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Wisata::with('city')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = json_decode($request->data);
        $wisata = Wisata::updateOrCreate(['id' => optional($data)->id], [
            'title' => $data->title,
            'description' => $data->description,
            'city_id' => $data->city_id,
            'address' => $data->address,
            'meta' => $data->meta
        ]);
        $file = $request->file;
        if (!!$file) {
            if ($wisata->header != null) {
                //
            }
            $path = $this->strorageStore($file, $wisata);
            if ($path == '') {
                return $data['message'] = 'File tidak sesuai';
            }
            $wisata->update(['header' => $path]);
        }
        $data = [
            'message' => 'Data berhasil disimpan!',
            'data' => $this->index()
        ];
        return $data;
    }

    public function strorageStore($file, $event)
    {
        $folder = 'wisata';
        $name = Str::slug($event->title, '-');
        $extension = $file->getClientOriginalExtension();
        $mimeType = $file->getClientMimeType();
        if ($mimeType == 'image/png' || $mimeType == 'image/jpg' || $mimeType == 'image/jpeg') {
            $newName =  $name . '-' . $event->start . '.' . $extension;
            Storage::putFileAs('public/' . $folder, $file, $newName);
            return Storage::url($folder . '/' . $newName);
        } else {
            return false;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Wisata  $wisata
     * @return \Illuminate\Http\Response
     */
    public function show(Wisata $wisata)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Wisata  $wisata
     * @return \Illuminate\Http\Response
     */
    public function edit(Wisata $wisata)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Wisata  $wisata
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Wisata $wisata)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Wisata  $wisata
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Wisata::findOrFail($id)->delete();
        $data = [
            'message' => 'Data berhasil dihapus!',
            'data' => $this->index()
        ];
        return $data;
    }
}
