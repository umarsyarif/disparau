<?php
$title = 'Kalender Event';
?>
@extends('layouts.admin')

@section('title', $title)

@section('content')
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-12">

                <div class="row">
                    <div class="col-lg-3">
                        <div class="widget">
                            <div class="widget-body">
                                <a href="#" data-toggle="modal" data-target="#add-category" class="btn btn-lg btn-success font-16 btn-block waves-effect waves-light">
                                    <i class="fa fa-plus mr-1"></i> Event Baru
                                </a>
                                <div id="external-events" class="mt-3">                                    
                                    <h5>List Kategori</h5>
                                    <p><small>Drag and drop kategori atau klik pada kalender</small></p>
                                    <div class="external-event bg-primary" data-class="bg-primary">
                                        <i class="mdi mdi-checkbox-blank-circle mr-2 vertical-middle"></i>Wisata
                                    </div>
                                    <div class="external-event bg-pink" data-class="bg-pink">
                                        <i class="mdi mdi-checkbox-blank-circle mr-2 vertical-middle"></i>Budaya
                                    </div>
                                    <div class="external-event bg-warning" data-class="bg-warning">
                                        <i class="mdi mdi-checkbox-blank-circle mr-2 vertical-middle"></i>Event Baru
                                    </div>
                                    <div class="external-event bg-purple" data-class="bg-purple">
                                        <i class="mdi mdi-checkbox-blank-circle mr-2 vertical-middle"></i>Expo
                                    </div>
                                </div>

                                <!-- checkbox -->
                                <div class="custom-control custom-checkbox mt-3">
                                    <input type="checkbox" class="custom-control-input" id="drop-remove">
                                    <label class="custom-control-label" for="drop-remove">Remove after drop</label>
                                </div>

                            </div>
                        </div>
                    </div> <!-- end col-->
                    <div class="col-lg-9">
                        <div class="card-box">
                            <div id="calendar"></div>
                        </div>
                    </div> <!-- end col -->
                </div>  <!-- end row -->

                <!-- BEGIN MODAL -->
                <div class="modal fade none-border" id="event-modal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title mt-0"><strong>Add New Event</strong></h4>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body"></div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light waves-effect" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-success save-event waves-effect waves-light">Create event</button>
                                <button type="button" class="btn btn-danger delete-event waves-effect waves-light" data-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Add Category -->
                <div class="modal fade none-border" id="add-category">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title mt-0"><strong>Add a category </strong></h4>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <form role="form">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class="control-label">Category Name</label>
                                            <input class="form-control form-white" placeholder="Enter name" type="text" name="category-name"/>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="control-label">Choose Category Color</label>
                                            <select class="form-control form-white" data-placeholder="Choose a color..." name="category-color">
                                                <option value="success">Success</option>
                                                <option value="danger">Danger</option>
                                                <option value="info">Info</option>
                                                <option value="pink">Pink</option>
                                                <option value="primary">Primary</option>
                                                <option value="warning">Warning</option>
                                                <option value="inverse">Inverse</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light waves-effect" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger waves-effect waves-light save-category" data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
