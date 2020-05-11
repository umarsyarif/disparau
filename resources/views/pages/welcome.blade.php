<?php
$title = 'Home';
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
    <user-calendar
    url-get-organizers="{{route('organizer.index')}}"
    url-get-cities="{{route('event.cities')}}"
    url-event="{{route('event.store')}}"
    />
@endsection
