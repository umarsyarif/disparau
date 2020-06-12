<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="{{asset('adminto/css/bootstrap.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('adminto/css/icons.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('adminto/css/app.min.css')}}">

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
</head>
<body>
    <div id="wrapper">
        @include('partials.navbar')
        <!-- Pre-loader -->
        <div id="preloader">
            <div id="status">
            <div class="spinner">Loading...</div>
            </div>
        </div>
        <!-- End Preloader-->
        <div id="app" >
            <main class="pb-4">
                @yield('content')
            </main>
        </div>
        @include('partials.big-footer')
    </div>
    <!-- Vendor js -->
    <script src="{{asset('adminto/js/vendor.min.js')}}"></script>
    <!-- App js -->
    <script src="{{asset('adminto/js/app.min.js')}}"></script>
</body>
</html>
