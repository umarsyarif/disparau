<?php
$title = 'Detail Event';
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
<detail-event
    data-city="{{$city}}"
    data-event="{{$event}}"
    data-wisata="{{$wisata}}"
    data-organizer="{{$organizer}}"
    data-incoming="{{$incoming}}"
/>
@endsection
