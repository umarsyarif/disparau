@extends('layouts.app')

@section('title', 'Upload')

@section('content')
<div class="col-6">
    <a href="" data-toggle="modal" data-target="#createModal" class="btn btn-sm btn-primary mb-3">Upload Dokumen Baru</a>
    <ul class="list-group">
    @foreach ($files as $row)
    <li class="list-group-item d-flex justify-content-between align-items-center">
        {{ $row->judul }}
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
          <h5 class="modal-title" id="createModalLabel">Upload Dokumen</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form action="{{ route('upload.store') }}" method="post" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="form-group">
                    <label for="judul">Judul</label>
                    <input type="text" class="form-control" id="judul" name="judul">
                </div>
                <div class="form-group">
                    <label for="jenis">Jenis Dokumen</label>
                    <select class="form-control custom-select" name="jenis" id="jenis">
                    @foreach ($jenis as $row)
                        <option value="{{ $row->id_jenis }}">{{ $row->nama_jenis }}</option>
                    @endforeach
                    </select>
                </div>
                <div class="form-group">
                    <label for="foto">Gambar</label>
                    <input type="file" id="foto" name="foto">
                    {{-- <label class="custom-file-label" for="foto">Choose file</label> --}}
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
