<?php
$title = 'Detail Wisata';
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
<detail-pariwisata
    data-wisata="{{$wisata}}"
    {{-- data-city="{{$city}}" --}}
    {{-- data-incoming="{{$incoming}}" --}}
/>
@endsection
