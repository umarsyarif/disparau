<?php

namespace App\Http\Controllers;

use App\City;
use App\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    private $month;

    public function __construct()
    {
        //
    }
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
        $end = date('Y-m-d', strtotime($data['end'] . '+1 days'));
        $event = Event::updateOrCreate(['id' => optional($data)['id']], [
            'title' => $data['title'],
            'description' => $data['description'],
            'organizer_id' => $data['organizer_id'],
            'city_id' => $data['city_id'],
            'address' => $data['address'],
            'start' => $start,
            'end' => $end,
        ]);
        $event->update(['url' => route('event.show', $event->id)]);
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
    public function show(Event $event)
    {
        $event = Event::find($event->id);
        $data = [
            'event' => $event,
            'city' => $event->city,
            'organizer' => $event->organizer,
        ];
        return view('event.detail', $data);
    }

    public function showPerMonth($date)
    {
        $year = date('Y', strtotime($date));
        $month = date('n', strtotime($date));
        return Event::whereYear('start', $year)->whereMonth('start', $month)
            ->orWhereYear('end', $year)->whereMonth('end', $month)
            ->orderBy('start')->with('city')->get();
    }

    public function showPerDay($date)
    {
        $date = date('Y-m-d', strtotime($date));
        $events = Event::whereDate('start', '<=', $date)
            ->whereDate('end', '>', $date)
            ->orderBy('start')->with('city', 'organizer')->get();
        // $date = date('d F Y', strtotime($date));
        return view('event.day', compact('events', 'date'));
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
