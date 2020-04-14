@extends('layouts.app')

@section('title', 'Dokumen')

@section('content')
<div class="col-6">
    <a href="" data-toggle="modal" data-target="#createModal" class="btn btn-sm btn-primary mb-3">Tambah Dokumen Baru</a>
    <ul class="list-group">
    @foreach ($dokumen as $row)
    <li class="list-group-item d-flex justify-content-between align-items-center">
        {{ $row->nama_jenis }}
        {{-- <a href="{{ route('students.show', $student) }}" class="badge badge-primary badge-pill">detail</a> --}}
    </li>
    @endforeach
    </ul>
</div>


<!-- Modal -->
<div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createModalLabel">Tambah Dokumen</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form action="{{ route('dokumen.store') }}" method="post">
        <div class="modal-body">
            <div class="form-group">
                <label for="nama">Nama</label>
                <input type="text" class="form-control" id="nama" name="nama">
            </div>
        </div>
        <div class="modal-footer">
            @csrf
            <button type="submit" class="btn btn-primary">Save</button>
        </div>
        </form>
      </div>
    </div>
</div>
@endsection
