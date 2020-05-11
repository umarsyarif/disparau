<?php
$title = 'Kota / Kabupateen';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <cities-component
    url-get-cities="{{route('event.cities')}}"
    url-color="{{route('event.color')}}"
    />
@endsection
