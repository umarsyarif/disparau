<?php
$title = $city->name;
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
<city-detail
url-wisata="{{route('wisata.index', ['city' => $city->id])}}"
url-wisata-show="{{route('wisata.show')}}"
data-city="{{$city}}"
data-wisata="{{$citiesWisata}}"
data-others="{{$othercities}}"
data-events="{{$citiesEvents}}"/>
@endsection
