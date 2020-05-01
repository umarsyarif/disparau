@extends('layouts.admin')

@section('content')
<div id="app">
    <div class="container">
        <div class="row justify-content-center">
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
</div>
@endsection
