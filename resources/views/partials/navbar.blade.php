<?php
use Illuminate\Support\Facades\Cache;
$cities = Cache::get('cities');
?>
<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div class="container">
        <a class="navbar-brand" href="{{ route('home') }}">
            <img src="{{asset('images/logo-Riau-The-homeland.png')}}" alt="" height="42">
            {{-- {{ config('app.name', 'Laravel') }} --}}
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            <ul class="navbar-nav navigation-menu mx-auto">
                <li class="nav-item has-submenu mx-4">
                    <a class="nav-link" href="{{ route('home') }}"><strong>{{ __('HOME') }}</strong></a>
                </li>
                <li class="nav-item has-submenu dropdown mx-4">
                    <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <strong>{{ __('KABUPATEN / KOTA') }}</strong>
                    </a>
                    <ul class="submenu">
                        @foreach ($cities as $row)
                            <li>
                                <a href="{{route('cities.show', $row)}}">{{$row->name}}</a>
                            </li>
                        @endforeach
                    </ul>
                </li>
                <li class="nav-item has-submenu mx-4">
                    <a class="nav-link" href="{{ route('pages', 'tentang') }}"><strong>{{ __('TENTANG') }}</strong></a>
                </li>
            </ul>

        </div>
        <!-- Right Side Of Navbar -->
        <ul class="navbar-nav ml-auto">
            <!-- Authentication Links -->
            @guest
                <li class="nav-item has-submenu">
                    <a class="nav-link" href="{{ route('login') }}">{{ __('LOGIN') }}</a>
                </li>
                @if (Route::has('register'))
                    <li class="nav-item has-submenu">
                        <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                    </li>
                @endif
            @else
                <li class="nav-item has-submenu">
                    <a class="nav-link" href="{{ route('dashboard') }}">{{ __('DASBOARD') }}</a>
                </li>
            @endguest
        </ul>
    </div>
</nav>
