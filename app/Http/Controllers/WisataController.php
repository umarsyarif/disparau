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
    public function index(Request $request)
    {
        $city = $request->city;
        return Wisata::with('city')->when($city, function ($query) use ($city) {
            return $query->where('city_id', $city);
        })->get();
    }

    public function city($city)
    {
        return Wisata::where('city_id', $city)->with('city')->get();
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
            $path = $this->strorageStore($file, $wisata);
            if ($path == '') {
                return $data['message'] = 'File tidak sesuai';
            }
            $wisata->update(['header' => $path]);
        }
        $data = [
            'message' => 'Data berhasil disimpan!',
            'data' => $this->index($request)
        ];
        return $data;
    }

    public function strorageStore($file, $wisata)
    {
        $folder = 'wisata';
        $name = $wisata->title;
        $extension = $file->getClientOriginalExtension();
        $mimeType = $file->getClientMimeType();
        if ($mimeType == 'image/png' || $mimeType == 'image/jpg' || $mimeType == 'image/jpeg') {
            if ($wisata->header != null) {
                Storage::delete($wisata->header);
            }
            $newName =  $name . '.' . $extension;
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
    public function show($id)
    {
        $wisata = Wisata::where('id', $id)->with('city')->first();
        $data = [
            'wisata' => $wisata
        ];
        return view('wisata.detail', $data);
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
    public function destroy(Request $request, $id)
    {
        Wisata::findOrFail($id)->delete();
        $data = [
            'message' => 'Data berhasil dihapus!',
            'data' => $this->index($request)
        ];
        return $data;
    }
}
