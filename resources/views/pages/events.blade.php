<?php
$title = 'Events Data';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <event-component
    url-get-organizers="{{route('organizer.index')}}"
    url-get-cities="{{route('cities.index')}}"
    url-get-events="{{route('event.index')}}"
    url-get-years="{{route('event.year')}}"
    url-event="{{route('event.store')}}"
    />
@endsection
