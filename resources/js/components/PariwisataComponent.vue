<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12" v-if="!isCreate">
        <div class="card">
          <div class="card-body">
            <h4 class="heading-text text-center">Pariwisata</h4>
            <div class="clear-fix">
              <a
                href="javascript:void(0)"
                class="btn btn-purple float-right my-3"
                @click="createData"
              >
                <i class="fa fa-plus mr-1"></i> Wisata Baru
              </a>
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
                        <th>Lokasi</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in wisata" :key="row.id">
                        <td>{{index+1}}</td>
                        <td>{{row.title}}</td>
                        <td>{{row.city.name}}</td>
                        <td>
                          <button @click="editData(row)" class="btn btn-sm btn-info">
                            <i class="mdi mdi-lead-pencil"></i>
                          </button>
                          <button @click="deleteData(row.id)" class="btn btn-sm btn-danger">
                            <i class="mdi mdi-delete"></i>
                          </button>
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
      <div class="col-12" v-if="isCreate">
        <div class="card-box">
          <a href="javascript:void(0)" class="close text-muted" @click="createData">
            <i class="mdi mdi-close float-right"></i>
          </a>
          <div class="card-header bg-white text-center">
            <h5>Form Wisata</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="title">Nama</label>
              <input type="text" class="form-control" v-model="form.title" id="title" />
              <small class="form-text text-muted">Nama tempat wisata</small>
            </div>
            <div class="form-group">
              <label for="address">Alamat</label>
              <input
                type="text"
                class="form-control"
                v-model="form.address"
                id="address"
                placeholder="nama jalan, gedung, atau lokasi spesifik"
              />
            </div>
            <div class="form-group">
              <select type="text" class="form-control" v-model="form.city_id" id="city_id">
                <option value>Pilih Kota / Kabupaten</option>
                <option v-for="row in cities" :key="row.id" :value="row.id">{{ row.name }}</option>
              </select>
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
                </div>
                <img :src="fileUrl" width="250rem" v-else />
              </div>
            </div>
            <div class="form-group mt-3">
              <label for="description">Deskripsi</label>
              <ckeditor :editor="editor" v-model="form.description" :config="editorConfig"></ckeditor>
              <small class="form-text text-muted">Deskripsi tempat wisata</small>
            </div>
            <div class="form-group mt-3">
              <label for>
                G-Maps
                <small class="text-muted">(Optional)</small>
              </label>
              <div class="input-group">
                <gmap-autocomplete class="form-control col-12 mr-2" @place_changed="setPlace"></gmap-autocomplete>
                <button class="btn btn-primary" @click.prevent="addMarker">Add</button>
              </div>
              <br />
              <gmap-map :center="center" :zoom="15" style="width:100%;  height: 400px;">
                <gmap-marker :position="marker.position" @click="center=marker.position"></gmap-marker>
              </gmap-map>
            </div>
          </div>
          <div class="card-footer bg-white mb-4">
            <button
              class="btn btn-primary float-right"
              id="store"
              @click="storeData"
              :disabled="isLoading"
            >Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: {
    urlGetWisata: String,
    urlGetCities: String,
    urlWisata: String
  },
  mounted: function() {
    this.loadData();
    this.loadCities();
  },
  data: function() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
      wisata: {},
      cities: {},
      form: {},
      marker: {},
      center: { lat: 0.5070677, lng: 101.4477793 },
      isCreate: false,
      isLoading: false,
      currentPlace: null
    };
  },
  methods: {
    loadData() {
      axios.get(this.urlGetWisata).then(response => {
        this.wisata = response.data;
      });
    },
    loadCities() {
      axios
        .get(this.urlGetCities)
        .then(response => {
          this.cities = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleFileChange(e) {
      this.form.header = e.target.files[0];
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
    createData() {
      this.form = {
        city_id: "",
        header: "",
        city: { name: "" }
      };
      this.isCreate = !this.isCreate;
    },
    editData(event) {
      this.form = event;
      this.isCreate = !this.isCreate;
      this.geolocate();
    },
    storeData() {
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
        .post(this.urlWisata, form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.isCreate = false;
          this.wisata = response.data.data;
          Toast.fire({
            icon: "success",
            title: response.data.message
          });
        })
        .catch(error => {
          console.error(error);
          Toast.fire({
            icon: "warning",
            title: error
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
            .delete(this.urlWisata + "/" + id)
            .then(response => {
              this.wisata = response.data.data;
              Toast.fire({
                icon: "success",
                title: response.data.message
              });
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    },
    geolocate: function() {
      if (this.form.meta) {
        const marker = JSON.parse(this.form.meta);
        this.marker = { position: marker };
        this.center = marker;
      }
      this.marker;
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
