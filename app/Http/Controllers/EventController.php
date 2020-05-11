<?php

namespace App\Http\Controllers;

use App\City;
use App\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Event::with('city')->orderBy('start')->get();
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
        $data = $request->form;
        $start = date('Y-m-d', strtotime($data['start']));
        $end = date('Y-m-d', strtotime($data['end'] . "+1 days"));
        Event::updateOrCreate(['id' => optional($data)['id']], [
            'title' => $data['title'],
            'description' => $data['description'],
            'organizer_id' => $data['organizer_id'],
            'city_id' => $data['city_id'],
            'address' => $data['address'],
            'start' => $start,
            'end' => $end,
            'url' => $data['url'] ?? 'calendar'
        ]);
        $data = [
            'message' => 'Data berhasil disimpan!',
            'data' => $this->index()
        ];
        return $data;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show($month)
    {
        return Event::whereMonth('start', $month)->orWhereMonth('end', $month)->orderBy('start')->with('city')->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function changeColor(Request $request, $id)
    {
        $city = City::findOrFail($id);
        $city->update(['color' => $request->color]);
        $data = [
            'message' => 'Data berhasil disimpan!',
            'data' => $this->cities()
        ];
        return $data;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Event::findOrFail($id)->delete();
        $data = [
            'message' => 'Data berhasil dihapus!',
            'data' => $this->index()
        ];
        return $data;
    }

    public function cities()
    {
        return City::all();
    }
}
