<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12" v-if="!isCreate">
        <div class="card">
          <div class="card-body">
            <h4 class="heading-text text-center">Daftar Event</h4>
            <div class="clear-fix">
              <div class="col-12 col-md-2 float-left my-3">
                <label for="tahun">Tahun Event</label>
                <select
                  class="form-control custom-select"
                  name="tahun"
                  id="tahun"
                  v-model="currentYear"
                  @change="changeYear"
                >
                  <option value>All</option>
                  <option v-for="row in years" :key="row" :value="row">
                    {{ row }}
                  </option>
                </select>
              </div>
              <a
                href="javascript:void(0)"
                class="btn btn-purple float-right my-3"
                @click="createData"
              >
                <i class="fa fa-plus mr-1"></i> Event Baru
              </a>
            </div>
            <div class="responsive-table-plugin">
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
                        <th>Waktu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in events" :key="row.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ row.title }}</td>
                        <td>{{ row.city.name | sentence }}</td>
                        <td>
                          {{ row.start | date }}
                          <br />
                          <small class="text-muted"
                            >s.d {{ row.end | end }}</small
                          >
                        </td>
                        <td>
                          <a :href="row.url" class="btn btn-sm btn-success">
                            <i class="mdi mdi-information-outline"></i> Detail
                          </a>
                          <button
                            @click="editData(row)"
                            class="btn btn-sm btn-outline-info"
                          >
                            <i class="mdi mdi-lead-pencil"></i>
                          </button>
                          <button
                            @click="deleteData(row.id)"
                            class="btn btn-sm btn-outline-danger"
                          >
                            <i class="mdi mdi-delete"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="clear-fix">
                    <div class="float-left">
                      <span v-if="rawData">
                        <em
                          >Menampilkan {{ rawData.from }}-{{ rawData.to }} dari
                          {{ rawData.total }}</em
                        >
                      </span>
                    </div>
                    <div class="float-right">
                      <span v-if="rawData">
                        <button @click="prev" class="btn">
                          <h4 class="text-muted">
                            <i class="mdi mdi-chevron-left"></i>
                          </h4>
                        </button>
                        {{ rawData.current_page }}
                        <button @click="next" class="btn">
                          <h4 class="text-muted">
                            <i class="mdi mdi-chevron-right"></i>
                          </h4>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12" v-if="isCreate">
        <div class="card-box">
          <a
            href="javascript:void(0)"
            class="close text-muted"
            @click="createData"
          >
            <i class="mdi mdi-close float-right"></i>
          </a>
          <div class="card-header bg-white text-center">
            <h5>Form Event</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="organizer_id">Penyelenggara</label>
              <select
                type="text"
                class="form-control"
                v-model="form.organizer_id"
                id="organizer_id"
              >
                <option value>Pilih Penyelenggara</option>
                <option v-for="row in organizers" :key="row.id" :value="row.id">
                  {{ row.name }}
                </option>
              </select>
              <small class="form-text text-muted">Penyelenggara event</small>
            </div>
            <div class="form-group">
              <label for="title">Judul</label>
              <input
                type="text"
                class="form-control"
                v-model="form.title"
                id="title"
              />
              <small class="form-text text-muted">Judul event</small>
            </div>
            <div class="form-group">
              <label for="title">Tanggal</label>
              <div class="form-group d-flex py-auto">
                <date-picker
                  v-model="form.start"
                  input-class="form-control"
                  wrapper-class="col-6 pl-0"
                  :language="pickerLocale"
                />-
                <date-picker
                  v-model="form.end"
                  input-class="form-control"
                  wrapper-class="col-6 pr-0"
                  :language="pickerLocale"
                  :disabled-dates="disabledDates"
                />
              </div>
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
              <select
                type="text"
                class="form-control"
                v-model="form.city_id"
                id="city_id"
              >
                <option value>Pilih Kota / Kabupaten</option>
                <option v-for="row in cities" :key="row.id" :value="row.id">
                  {{ row.name }}
                </option>
              </select>
            </div>
            <div class="form-group mt-3">
              <label for="file_input">Foto Header</label>
              <br />
              <button
                class="btn btn-primary btn-sm mb-2"
                @click="changePhoto"
                v-if="form.header != '' && form.header != null"
              >
                Ubah Foto
              </button>
              <div>
                <div
                  class="custom-file"
                  v-if="form.header == '' || form.header == null"
                >
                  <input
                    type="file"
                    id="file_input"
                    class="custom-file-input"
                    @change="handleFileChange"
                  />
                  <label class="custom-file-label" for="customFile"
                    >Pilih foto...</label
                  >
                </div>
                <img :src="fileUrl" width="250rem" v-else />
              </div>
            </div>
            <div class="form-group mt-3">
              <label for="description">Deskripsi</label>
              <ckeditor
                :editor="editor"
                v-model="form.description"
                :config="editorConfig"
              ></ckeditor>
              <small class="form-text text-muted">Deskripsi event</small>
            </div>
            <div class="form-group mt-3">
              <label for>
                G-Maps
                <small class="text-muted">(Optional)</small>
              </label>
              <div class="input-group">
                <gmap-autocomplete
                  class="form-control col-12 mr-2"
                  @place_changed="setPlace"
                ></gmap-autocomplete>
                <button class="btn btn-primary" @click.prevent="addMarker">
                  Add
                </button>
              </div>
              <br />
              <gmap-map
                :center="center"
                :zoom="15"
                style="width: 100%; height: 400px"
              >
                <gmap-marker
                  :position="marker.position"
                  @click="center = marker.position"
                ></gmap-marker>
              </gmap-map>
            </div>
          </div>
          <div class="card-footer bg-white mb-4">
            <button
              class="btn btn-primary float-right"
              id="store"
              @click="storeData"
              :disabled="isLoading"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "../UploadAdapter";
import { id } from "vuejs-datepicker/dist/locale";
import Datepicker from "vuejs-datepicker";
// import VueDropify from "vue-dropify";

export default {
  props: {
    urlGetOrganizers: String,
    urlGetCities: String,
    urlGetEvents: String,
    urlGetYears: String,
    urlEvent: String,
  },
  components: {
    "date-picker": Datepicker,
  },
  mounted: function () {
    this.loadYears();
    this.loadCities();
    this.loadOrganizers();
  },
  data: function () {
    return {
      editor: ClassicEditor,
      editorConfig: {
        extraPlugins: [this.uploader],
      },
      rawData: null,
      events: {},
      form: {},
      organizers: {},
      cities: {},
      years: [],
      marker: {},
      center: { lat: 0.5070677, lng: 101.4477793 },
      pickerLocale: id,
      currentYear: "",
      isCreate: false,
      isLoading: false,
      currentPlace: null,
      disabledDates: {
        customPredictor: (date) => {
          if (date < this.form.start) {
            return true;
          }
        },
      },
    };
  },
  methods: {
    loadData() {
      axios
        .get(this.urlGetEvents)
        .then((response) => {
          this.events = response.data;
        })
        .catch((error) => console.error(error));
    },
    loadYears() {
      axios
        .get(this.urlGetYears)
        .then((response) => {
          this.years = response.data;
          this.currentYear = new Date().getFullYear();
          this.changeYear();
        })
        .catch((error) => console.error(error));
    },
    loadOrganizers() {
      axios
        .get(this.urlGetOrganizers)
        .then((response) => {
          this.organizers = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    loadCities() {
      axios
        .get(this.urlGetCities)
        .then((response) => {
          this.cities = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createData() {
      this.form = {
        organizer_id: "",
        city_id: "",
        start: new Date(),
        end: new Date(),
        header: "",
        city: { name: "" },
      };
      this.isCreate = !this.isCreate;
      this.center = { lat: 0.5070677, lng: 101.4477793 };
      this.marker = {};
      this.currentPlace = null;
    },
    editData(event) {
      this.form = event;
      this.isCreate = !this.isCreate;
      let date = new Date(this.form.end);
      date.setDate(date.getDate() - 1);
      this.form.end = date;
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
          title: "Header tidak boleh kosong!",
        });
        return;
      }
      this.isLoading = true;
      axios
        .post(this.urlEvent, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.isCreate = false;
          this.events = response.data.data.data;
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        })
        .catch((error) => {
          console.error(error);
          Toast.fire({
            icon: "warning",
            title: error,
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
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          axios
            .delete(this.urlEvent + "/" + id)
            .then((response) => {
              this.events = response.data.data.data;
              Toast.fire({
                icon: "success",
                title: response.data.message,
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },
    handleFileChange(e) {
      this.form.header = e.target.files[0];
    },
    changePhoto() {
      this.form.header = "";
    },
    changeYear() {
      axios
        .post(this.urlGetYears, {
          year: this.currentYear,
        })
        .then((response) => {
          this.rawData = response.data;
          this.events = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    prev() {
      const form = {
        year: this.currentYear,
      };
      axios.post(this.rawData.prev_page_url, form).then((response) => {
        this.rawData = response.data;
        this.events = response.data.data;
      });
    },
    next() {
      const form = {
        year: this.currentYear,
      };
      axios.post(this.rawData.next_page_url, form).then((response) => {
        this.rawData = response.data;
        this.events = response.data.data;
      });
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.marker = { position: marker };
        this.center = marker;
        this.form.meta = JSON.stringify(marker);
      }
    },
    geolocate: function () {
      if (this.form.meta) {
        const marker = JSON.parse(this.form.meta);
        this.marker = { position: marker };
        this.center = marker;
      }
      this.marker;
    },
    uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
      };
    },
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
    },
  },
};
</script>
