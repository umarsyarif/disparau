<?php
$title = 'Event Organizer';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <organizer-component
    url-get-organizers="{{route('organizer.index')}}"
    url-organizer="{{route('organizer.store')}}"
    />
@endsection
