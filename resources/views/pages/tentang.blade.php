<?php
$title = 'Detail Event';
?>
@extends('layouts.app')

@section('title', $title)

@section('content')
<div class="container py-4">
    <div class="row">
        <div class="col-12">
            <div class="card-box">
                <div class="card-header bg-white">
                    <h2 class="text-center">
                        <span class="label label-danger">Dinas Pariwisata dan Kebudayaan
                            Provinsi Riau</span>
                    </h2>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <p class="text-dark mt-4">
                                Berdasarkan Peraturan Daerah Provinsi Riau Nomor 4 Tahun 2016, pada tahun 2017, Dinas Pariwisata Provinsi Riau pada awalnya bernama Dinas Pariwisata dan Ekonomi Kreatif Provinsi Riau. Sesuai dengan perkembangan tentang penataan organisasi Pemerintah Daerah maka disusun Peraturan Gubernur Riau Nomor 85 Tahun 2016 Tentang Kedudukan, Susunan Organisasi, Tugas dan Fungsi, serta Tata Kerja Dinas Pariwisata Provinsi Riau.
                            </p>
                        </div>
                        <div class="col-6">
                            <img src="{{asset('images/logo-Riau-The-homeland.png')}}" alt="" width="200">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
