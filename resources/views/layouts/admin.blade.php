<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Styles -->
    {{-- <link href="{{ asset('css/app.css') }}" rel="stylesheet"> --}}
    <link rel="stylesheet" type="text/css" href="{{asset('adminto/css/bootstrap.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('adminto/css/icons.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('adminto/css/app.min.css')}}">
    <!-- Scripts -->
    {{-- <script src="{{ asset('js/app.js') }}" defer></script> --}}
</head>
<body>
    <div id="wrapper">
        @include('partials.topbar')
        @include('partials.sidebar')
        <div class="content-page">
            <div class="content">
                <!-- Start Content-->
                {{-- <div class="container-fluid"> --}}
                    @yield('content')
                {{-- </div> <!-- container-fluid --> --}}
            </div> <!-- content -->
            @include('partials.footer')
        </div>
    </div>
    <!-- Script -->
    <script src="{{asset('adminto/js/vendor.min.js')}}"></script>
    <script src="{{asset('adminto/js/app.min.js')}}"></script>
</body>
</html>
