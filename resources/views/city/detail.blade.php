<?php
$title = $city->name;
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
<city-detail
data-city="{{$city}}"
data-others="{{$othercities}}"
data-events="{{$citiesEvents}}"/>
@endsection
