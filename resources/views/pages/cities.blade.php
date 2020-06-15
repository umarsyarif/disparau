<?php
$title = 'Kota/Kabupaten';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <cities-component
    url-get-cities="{{route('cities.index')}}"
    url-city="{{route('cities.store')}}"
    url-color="{{route('cities.color')}}"
    />
@endsection
