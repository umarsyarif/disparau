<?php
$title = $city->name;
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
<city-detail
url-wisata="{{route('wisata.index', ['city' => $city->id])}}"
data-city="{{$city}}"
data-others="{{$othercities}}"
data-events="{{$citiesEvents}}"/>
@endsection
