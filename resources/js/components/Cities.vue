<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="heading-text text-center">Kota / Kabupaten</h4>
            <div class="clear-fix">
              <!-- <a
                href="javascript:void(0)"
                class="btn btn-purple float-right my-3"
                @click="showModal(null)"
              >
                <i class="fa fa-plus mr-1"></i> Kota/Kabupaten Baru
              </a>-->
            </div>
            <div class="responsive-table-plugin mt-5">
              <div class="table-rep-plugin">
                <div class="table-responsive" data-pattern="priority-columns">
                  <table
                    id="responsive-datatable"
                    class="table table-bordered table-bordered dt-responsive nowrap"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Warna</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in cities" :key="row.id">
                        <td>{{index+1}}</td>
                        <td>{{row.name | sentence}}</td>
                        <td>
                          <input
                            class="form-control"
                            type="color"
                            v-model="row.color"
                            @change="changeColor(row.id, $event)"
                          />
                        </td>
                        <td>
                          <a :href="urlCity+'/'+row.id" class="btn btn-sm btn-success">
                            <i class="mdi mdi-information-outline"></i> Detail
                          </a>
                          <button @click="showModal(row)" class="btn btn-sm btn-outline-info">
                            <i class="mdi mdi-lead-pencil"></i>
                          </button>
                          <!-- <button @click="deleteData(row.id)" class="btn btn-sm btn-outline-danger">
                            <i class="mdi mdi-delete"></i>
                          </button>-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="modal-create"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modal-create-label"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modal-create-label">Tambah kota/kabupaten baru</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="resetModal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="name">Nama</label>
                <input type="text" class="form-control" v-model="form.name" id="name" />
                <small class="form-text text-muted">
                  format inputan
                  <strong>[Kabupaten/Kota] [nama]</strong>, cth:
                  <strong>Kota Pekanbaru</strong>
                </small>
              </div>
              <div class="form-group">
                <label for="description">Deskripsi</label>
                <textarea class="form-control" v-model="form.description" id="name" />
                <small class="form-text text-muted">deskripsi kota/kabupaten</small>
              </div>
              <div class="form-group">
                <label for="color">Warna</label>
                <input type="color" class="form-control" v-model="form.color" id="color" />
                <small class="form-text text-muted">warna penanda pada calendar event</small>
              </div>
              <div class="form-group mt-3">
                <label for="file_input">Foto Header</label>
                <br />
                <button
                  class="btn btn-primary btn-sm mb-2"
                  @click="changePhoto"
                  v-if="form.header != '' && form.header != null"
                >Ubah Foto</button>
                <div>
                  <div class="custom-file" v-if="form.header == '' || form.header == null">
                    <input
                      type="file"
                      id="file_input"
                      class="custom-file-input"
                      @change="handleFileChange"
                    />
                    <label class="custom-file-label" for="customFile">Pilih foto...</label>
                    <small>foto akan ditampilkan di halaman detail kota/kab.</small>
                  </div>
                  <img :src="fileUrl" width="250rem" v-else />
                </div>
              </div>
              <!-- <div class="form-group">
                <label for="meta">Lokasi</label>
                <div class="input-group">
                  <gmap-autocomplete class="form-control col-10 mr-2" @place_changed="setPlace"></gmap-autocomplete>
                  <button class="btn btn-primary" @click.prevent="addMarker">Add</button>
                </div>
                <small class="form-text text-muted">lokasi google maps</small>
                <gmap-map
                  :center="center"
                  :zoom="15"
                  style="width:100%;  height: 400px;"
                  class="mt-3"
                >
                  <gmap-marker :position="marker.position" @click="center=marker.position"></gmap-marker>
                </gmap-map>
              </div>-->
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="resetModal"
              >Close</button>
              <button type="button" class="btn btn-primary" @click="handleSubmit()">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    urlGetCities: String,
    urlCity: String,
    urlColor: String
  },
  mounted: function() {
    this.loadData();
  },
  data: function() {
    return {
      cities: {},
      form: {},
      marker: {},
      center: { lat: 0.5070677, lng: 101.4477793 },
      currentPlace: null
    };
  },
  methods: {
    loadData() {
      axios.get(this.urlGetCities).then(response => {
        this.cities = response.data;
      });
    },
    showModal(data = null) {
      if (data != null) {
        this.form = _.clone(data);
        this.geolocate();
      }
      $("#modal-create").modal("show");
    },
    resetModal() {
      this.form = {};
      $("#modal-create").modal("hide");
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
      this.center = { lat: 0.5070677, lng: 101.4477793 };
      this.marker = {};
      this.currentPlace = null;
    },
    handleFileChange(e) {
      this.form.header = e.target.files[0];
      console.log(typeof this.form.header);
    },
    changePhoto() {
      this.form.header = "";
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.marker = { position: marker };
        this.center = marker;
        this.form.meta = JSON.stringify(marker);
      }
    },
    geolocate: function() {
      if (this.form.meta) {
        const marker = JSON.parse(this.form.meta);
        this.marker = { position: marker };
        this.center = marker;
      }
      this.marker;
    },
    changeColor(id, event) {
      console.log(event.target.value);
      axios
        .post(this.urlColor + "/" + id, {
          color: event.target.value
        })
        .then(response => {
          this.cities = response.data.data;
          Toast.fire({
            icon: "success",
            title: response.data.message
          });
        });
    },
    handleSubmit() {
      let file = this.form.header;
      let form = new FormData();
      if (typeof file != "string") {
        form.append("file", file, file.name);
      }
      form.append("data", JSON.stringify(this.form));
      if (file == "") {
        Toast.fire({
          icon: "warning",
          title: "Header tidak boleh kosong!"
        });
        return;
      }
      this.isLoading = true;
      axios
        .post(this.urlCity, form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.cities = response.data;
          this.resetModal();
        })
        .catch(error => {
          console.error(error);
          Toast.fire({
            icon: "warning",
            title: error.message
          });
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    deleteData(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .delete(this.urlCity + "/" + id)
            .then(response => {
              Toast.fire({
                icon: "success",
                title: response.data.message
              });
              this.cities = response.data.data;
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    }
  },
  computed: {
    fileUrl() {
      let file = this.form.header;
      let type = typeof file;
      if (type == "file" || type == "object") {
        return URL.createObjectURL(file);
      } else {
        return file;
      }
    }
  }
};
</script>
