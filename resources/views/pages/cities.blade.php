<?php
$title = 'Kota/Kabupaten';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <cities-component
    url-get-cities="{{route('event.cities')}}"
    url-color="{{route('event.color')}}"
    />
@endsection
