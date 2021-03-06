<?php
$title = 'Home';
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
    <user-calendar
    url-get-organizers="{{route('organizer.index')}}"
    url-get-cities="{{route('cities.index')}}"
    url-get-event="{{route('event.index')}}"
    url-cities-events="{{route('cities.events')}}"
    url-incoming-events="{{route('event.show.incoming')}}"
    url-city="{{route('cities.show')}}"
    url-search="{{route('event.search')}}"
    />
@endsection
