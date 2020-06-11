<?php
$title = 'Pariwisata';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <pariwisata-component
    url-get-cities="{{route('event.cities')}}"
    url-color="{{route('event.color')}}"
    />
@endsection
