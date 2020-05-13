<?php
$title = 'Kalender Event';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <admin-calendar
    url-get-organizers="{{route('organizer.index')}}"
    url-get-cities="{{route('event.cities')}}"
    url-get-event="{{route('event.index')}}"
    url-event="{{route('event.store')}}"
    />
@endsection
