<!-- ========== Left Sidebar Start ========== -->
<div class="left-side-menu">

    <div class="slimscroll-menu">

        <!-- User box -->
        {{-- <div class="user-box text-center">
            <img src="{{asset('adminto/images/users/user-1.jpg')}}" alt="user-img" title="Mat Helme" class="rounded-circle img-thumbnail avatar-lg">
            <div class="dropdown">
                <a href="#" class="text-dark dropdown-toggle h5 mt-2 mb-1 d-block" data-toggle="dropdown">Nowak Helme</a>
                <div class="dropdown-menu user-pro-dropdown">

                    <!-- item-->
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <i class="fe-user mr-1"></i>
                        <span>My Account</span>
                    </a>

                    <!-- item-->
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <i class="fe-settings mr-1"></i>
                        <span>Settings</span>
                    </a>

                    <!-- item-->
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <i class="fe-lock mr-1"></i>
                        <span>Lock Screen</span>
                    </a>

                    <!-- item-->
                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <i class="fe-log-out mr-1"></i>
                        <span>Logout</span>
                    </a>

                </div>
            </div>
            <p class="text-muted">Admin Head</p>
            <ul class="list-inline">
                <li class="list-inline-item">
                    <a href="#" class="text-muted">
                        <i class="mdi mdi-settings"></i>
                    </a>
                </li>

                <li class="list-inline-item">
                    <a href="#" class="text-custom">
                        <i class="mdi mdi-power"></i>
                    </a>
                </li>
            </ul>
        </div> --}}

        <!--- Sidemenu -->
        <div id="sidebar-menu">

            <ul class="metismenu" id="side-menu">

                <li class="menu-title">Menu</li>

                <li>
                    <a href="{{route('dashboard')}}">
                        <i class="mdi mdi-view-dashboard"></i>
                        <span> Dashboard </span>
                    </a>
                </li>

                <li>
                    <a href="{{route('pages', 'cities')}}">
                        <i class="mdi mdi-map-marker"></i>
                        <span> Kota/Kabupaten </span>
                    </a>
                </li>

                <li>
                    <a href="{{route('pages', 'organizer')}}">
                        <i class="mdi mdi-account-supervisor"></i>
                        <span> Event Organizer </span>
                    </a>
                </li>

                <li>
                    <a href="javascript:void(0);">
                        <i class="mdi mdi-calendar"></i>
                        <span> Events </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <ul class="nav-second-level" aria-expanded="false">
                        <li><a href="{{route('pages', 'events')}}">Events Data</a></li>
                        <li><a href="{{route('pages', 'calendar')}}">Events Calendar</a></li>
                    </ul>
                </li>

                {{-- <li>
                    <a href="javascript: void(0);">
                        <i class="mdi mdi-invert-colors"></i>
                        <span> Dropdown Menu </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <ul class="nav-second-level" aria-expanded="false">
                        <li><a href="ui-buttons.html">Buttons</a></li>
                        <li><a href="ui-cards.html">Cards</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);">
                        <i class="mdi mdi-page-layout-sidebar-left"></i>
                        <span class="badge badge-purple float-right">New</span>
                        <span> Menu With Badge </span>
                    </a>
                    <ul class="nav-second-level" aria-expanded="false">
                        <li><a href="layouts-sidebar-sm.html">Small Sidebar</a></li>
                        <li><a href="layouts-dark-sidebar.html">Dark Sidebar</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);">
                        <i class="mdi mdi-share-variant"></i>
                        <span> Multi Level Menu </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <ul class="nav-second-level nav" aria-expanded="false">
                        <li>
                            <a href="javascript: void(0);">Level 1.1</a>
                        </li>
                        <li>
                            <a href="javascript: void(0);" aria-expanded="false">Level 1.2
                                <span class="menu-arrow"></span>
                            </a>
                            <ul class="nav-third-level nav" aria-expanded="false">
                                <li>
                                    <a href="javascript: void(0);">Level 2.1</a>
                                </li>
                                <li>
                                    <a href="javascript: void(0);">Level 2.2</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li> --}}
            </ul>

        </div>
        <!-- End Sidebar -->

        <div class="clearfix"></div>

    </div>
    <!-- Sidebar -left -->

</div>
<!-- Left Sidebar End -->
