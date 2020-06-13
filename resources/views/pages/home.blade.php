<?php
$title = 'Dashboard';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <dashboard-component
    url-get-event="{{route('event.show.dashboard')}}"
    />
@endsection
