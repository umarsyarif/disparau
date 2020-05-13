<?php
$title = 'Event Harian';
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
<day-component
    date="{{$date}}"
    events="{{$events}}"
/>
@endsection
