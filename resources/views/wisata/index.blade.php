<?php
$title = 'Pariwisata';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <pariwisata-component
    url-get-wisata="{{route('wisata.index')}}"
    url-get-cities="{{route('cities.index')}}"
    url-wisata="{{route('wisata.store')}}"
    />
@endsection
