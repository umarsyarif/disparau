<?php

namespace App\Http\Controllers;

use App\City;
use App\Event;
use Illuminate\Http\Request;

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
        //
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
    public function destroy(City $city)
    {
        //
    }
}
