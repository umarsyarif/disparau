<?php

namespace App\Http\Controllers;

use App\City;
use App\Event;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return City::all();
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
        $file = $request->file;
        $data = json_decode($request->data);
        $city = City::updateOrCreate(['id' => optional($data)->id], [
            'name' => $data->name,
            'color' => $data->color,
            'meta' => $data->meta ?? null,
        ]);
        if (!!$file) {
            $path = $this->strorageStore($file, $city);
            if ($path == '') {
                return $data['message'] = 'File tidak sesuai';
            }
            $city->update(['header' => $path]);
        }
        $city->update(['url' => route('cities.show', $city->id)]);
        $data = [
            'message' => 'Data berhasil disimpan!',
            'data' => $this->index()
        ];
        return $this->index();
    }

    public function strorageStore($file, $city)
    {
        $folder = 'city';
        $name = Str::slug($city->name, '-');
        $extension = $file->getClientOriginalExtension();
        $mimeType = $file->getClientMimeType();
        if ($mimeType == 'image/png' || $mimeType == 'image/jpg' || $mimeType == 'image/jpeg') {
            if ($city->header != null) {
                Storage::delete($city->header);
            }
            $newName =  $name  . '.' . $extension;
            Storage::putFileAs('public/' . $folder, $file, $newName);
            return Storage::url($folder . '/' . $newName);
        } else {
            return false;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\City  $city
     * @return \Illuminate\Http\Response
     */
    public function show(City $city)
    {
        $year = date('Y');
        $citiesEvents = Event::where('city_id', $city->id)->with('organizer')->where(function ($q) use ($year) {
            $q->whereYear('start', $year)->orWhereYear('end', $year);
        })->get();
        $id = $city->id;
        $otherCities = City::where('id', '<>', $id)
            ->inRandomOrder()->limit(3)
            ->with('events')->get();
        $data = [
            'city' => $city,
            'citiesEvents' => $citiesEvents,
            'othercities' => $otherCities
        ];
        // return $data;
        return view('city.detail', $data);
    }

    public function showWithEvents()
    {
        $year = date('Y');
        $citiesEvents = City::with(['events' => function ($query) use ($year) {
            $query->whereYear('start', $year)->orWhereYear('end', $year);
        }])->get();
        return $citiesEvents;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\City  $city
     * @return \Illuminate\Http\Response
     */
    public function edit(City $city)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\City  $city
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, City $city)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\City  $city
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        City::findOrFail($id)->delete();
        $data = [
            'message' => 'Data berhasil dihapus!',
            'data' => $this->index()
        ];
        return $data;
    }
}
