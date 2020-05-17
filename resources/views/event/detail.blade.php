<?php
$title = 'Detail Event';
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
<detail-event
    data-event="{{$event}}"
    data-city="{{$city}}"
    data-organizer="{{$organizer}}"
    data-incoming="{{$incoming}}"
/>
@endsection
