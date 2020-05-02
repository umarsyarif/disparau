<?php
$title = 'Event Organizer';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-12">
                <div class="card-box">

                    <div class="card-body">
                        {{$title}}
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection
