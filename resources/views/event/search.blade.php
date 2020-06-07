<?php
$title = 'Home';
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
    <search-component
    query="{{$query}}"
    url-search="{{route('event.search-result')}}"
    />
@endsection
