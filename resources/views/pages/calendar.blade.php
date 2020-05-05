<?php
$title = 'Kalender Event';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <admin-calendar
    url-get-events="{{route('event.index')}}"
    url-event="{{route('event.store')}}"
    />
@endsection
