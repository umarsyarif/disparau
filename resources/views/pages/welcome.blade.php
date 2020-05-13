<?php
$title = 'Home';
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
    <user-calendar
    url-get-organizers="{{route('organizer.index')}}"
    url-get-cities="{{route('event.cities')}}"
    url-get-event="{{route('event.index')}}"
    />
@endsection
