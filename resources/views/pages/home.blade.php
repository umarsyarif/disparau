<?php
$title = 'Dashboard';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-12">
                <div class="card-box">
                    <div class="card-header">Dashboard</div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        You are logged in!
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection