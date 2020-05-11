<?php
$title = 'Events Data';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <event-component
    url-get-organizers="{{route('organizer.index')}}"
    url-get-cities="{{route('event.cities')}}"
    url-get-events="{{route('event.index')}}"
    url-event="{{route('event.store')}}"
    />
@endsection
