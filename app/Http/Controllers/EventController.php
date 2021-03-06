<?php

namespace App\Http\Controllers;

use App\City;
use App\Event;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;

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
        return Event::with('city', 'organizer')
            ->orderBy('start')
            ->paginate(15);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getYear()
    {
        $year = Event::select('start', 'end')->distinct()->get();
        $x = [];
        foreach ($year as $row) {
            array_push($x, date('Y', strtotime($row->start)));
            array_push($x, date('Y', strtotime($row->end)));
        }
        $years = array_unique($x);
        return $years;
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
        $start = date('Y-m-d', strtotime($data->start));
        $end = date('Y-m-d', strtotime($data->end . '+1 days'));
        $event = Event::updateOrCreate(['id' => optional($data)->id], [
            'title' => $data->title,
            'description' => $data->description,
            'organizer_id' => $data->organizer_id,
            'city_id' => $data->city_id,
            'address' => $data->address,
            'start' => $start,
            'end' => $end,
            'meta' => optional($data)->meta
        ]);
        $file = $request->file;
        if (!!$file) {
            $path = $this->strorageStore($file, $event);
            if ($path == '') {
                return $data['message'] = 'File tidak sesuai';
            }
            $event->update(['header' => $path]);
        }
        $event->update(['url' => route('event.show', $event->id)]);
        $data = [
            'message' => 'Data berhasil disimpan!',
            'data' => $this->index()
        ];
        return $data;
    }

    public function strorageStore($file, $event)
    {
        $folder = 'header';
        $name = $event->id;
        $extension = $file->getClientOriginalExtension();
        $mimeType = $file->getClientMimeType();
        if ($mimeType == 'image/png' || $mimeType == 'image/jpg' || $mimeType == 'image/jpeg') {
            if ($event->header != null) {
                Storage::delete($event->header);
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
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        $date = date('Y-m-d');
        $event = Event::find($event->id);
        $event->makeVisible('description');
        $incomingEvents = Event::whereDate('start', '>=', $date)
            ->whereDate('end', '>', $date)
            ->orderBy('start')->limit(3)->with('city', 'organizer')
            ->get();
        $data = [
            'event' => $event,
            'city' => $event->city,
            'organizer' => $event->organizer,
            'incoming' => $incomingEvents
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
        $incomingEvents = Event::whereDate('start', '>=', $date)
            ->whereDate('end', '>', $date)
            ->orderBy('start')->limit(3)->with('city', 'organizer')->get();
        $data = [
            'date' => $date,
            'events' => $events,
            'incomingEvents' => $incomingEvents,
        ];
        return view('event.day', $data);
    }

    public function showPerYear(Request $request)
    {
        $year = $request->year;
        if (is_null($year)) {
            $yearEvents = $this->index();
        } else {
            $yearEvents = Event::with('city', 'organizer')->whereYear('start', $year)
                ->orWhereYear('end', $year)
                ->orderBy('start')->paginate(15);
        }
        $yearEvents->makeVisible('description');
        return $yearEvents;
    }

    public function incomingEvents()
    {
        $date = date('Y-m-d');
        $incomingEvents = Event::whereDate('start', '>=', $date)
            ->whereDate('end', '>', $date)
            ->orderBy('start')->limit(6)->with('city', 'organizer')->get();
        // if ($incomingEvents->isEmpty()) {
        //     $incomingEvents = Event::orderBy('start')->with('city', 'organizer')->limit(6)->get();
        // }
        return $incomingEvents;
    }

    public function dashboard()
    {
        $date = date('Y-m-d');
        $year = date('Y', strtotime($date));
        $month = date('n', strtotime($date));
        $yearEvents = Event::whereYear('start', $year)
            ->orWhereYear('end', $year)
            ->orderBy('start')->get();
        $monthEvents = Event::whereYear('start', $year)->whereMonth('start', $month)
            ->orWhereYear('end', $year)->whereMonth('end', $month)
            ->orderBy('start')->get();
        $dayEvents = Event::whereDate('start', '<=', $date)
            ->whereDate('end', '>', $date)
            ->orderBy('start')->get();
        $incomingEvents = Event::whereDate('start', '>=', $date)
            ->whereDate('end', '>', $date)
            ->orderBy('start')->limit(5)->with('city', 'organizer')->get();
        $citiesEvents = City::with(['events' => function ($query) use ($year) {
            $query->whereYear('start', $year)->orWhereYear('end', $year);
        }])->get();
        $data = [
            'year' => $yearEvents,
            'month' => $monthEvents,
            'day' => $dayEvents,
            'incoming' => $incomingEvents,
            'cities' => $citiesEvents,
        ];
        return $data;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $query = $request->q;
        if ($query == null) {
            return redirect()->route('home');
        }
        return view('event.search', compact('query'));
    }

    public function searchResult(Request $request)
    {
        $query = $request->q;
        if ($query == null) {
            $data = [
                'status' => false,
                'message' => 'Masukkan kata kunci!',
            ];
            return $data;
        }
        $date = date('Y-m-d');
        $result = Event::where('title', 'like', '%' . $query . '%')->with('city', 'organizer')->get();
        $incomingEvents = Event::whereDate('start', '>=', $date)
            ->whereDate('end', '>', $date)
            ->orderBy('start')->limit(3)->with('city', 'organizer')->get();
        $data = [
            'result' => $result,
            'incoming' => $incomingEvents,
        ];
        $reply = [
            'status' => true,
            'data' => $data
        ];
        return $reply;
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */


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
}
