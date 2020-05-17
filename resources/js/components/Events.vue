<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12" v-if="!isCreate">
        <div class="card">
          <div class="card-body">
            <h4 class="heading-text text-center">Daftar Event</h4>
            <div class="clear-fix">
              <a
                href="javascript:void(0)"
                class="btn btn-primary float-right my-3"
                @click="createData"
              >Tambah Event</a>
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
                        <td>{{index+1}}</td>
                        <td>{{row.title}}</td>
                        <td>{{row.city.name}}</td>
                        <td>{{row.start | date}} - {{row.end | end}}</td>
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
            <!-- <datatable :columns="columns" :data="rows"></datatable> -->
          </div>
        </div>
      </div>
      <div class="col-12" v-if="isCreate">
        <div class="card-box">
          <a href="javascript:void(0)" class="close text-muted" @click="createData">
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
                <option v-for="row in organizers" :key="row.id" :value="row.id">{{ row.name }}</option>
              </select>
              <small class="form-text text-muted">Penyelenggara event</small>
            </div>
            <div class="form-group">
              <label for="title">Judul</label>
              <input type="text" class="form-control" v-model="form.title" id="title" />
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
              <input type="text" class="form-control" v-model="form.address" id="address" />
              <small class="form-text text-muted">Alamat lengkap event</small>
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
                <input
                  type="file"
                  id="file_input"
                  class="form-control"
                  @change="handleFileChange"
                  v-if="form.header == '' || form.header == null"
                />
                <img :src="fileUrl" width="250rem" v-else />
              </div>
            </div>
            <div class="form-group mt-3">
              <label for="description">Deskripsi</label>
              <ckeditor :editor="editor" v-model="form.description" :config="editorConfig"></ckeditor>
              <small class="form-text text-muted">Deskripsi event</small>
            </div>
          </div>
          <div class="card-footer bg-white mb-4">
            <button class="btn btn-primary float-right" @click="storeData">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { id } from "vuejs-datepicker/dist/locale";
import Datepicker from "vuejs-datepicker";
// import VueDropify from "vue-dropify";

export default {
  props: {
    urlGetOrganizers: String,
    urlGetCities: String,
    urlGetEvents: String,
    urlEvent: String
  },
  components: {
    "date-picker": Datepicker
  },
  mounted: function() {
    this.loadData();
    this.loadOrganizers();
    this.loadCities();
  },
  data: function() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
      pickerLocale: id,
      events: {},
      form: {},
      organizers: {},
      cities: {},
      isCreate: false,
      disabledDates: {
        customPredictor: date => {
          if (date < this.form.start) {
            return true;
          }
        }
      }
    };
  },
  methods: {
    loadData() {
      axios
        .get(this.urlGetEvents)
        .then(response => {
          this.events = response.data;
        })
        .catch(error => console.error(error));
    },
    loadOrganizers() {
      axios
        .get(this.urlGetOrganizers)
        .then(response => {
          this.organizers = response.data;
        })
        .catch(error => {
          console.error(error);
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
    createData() {
      this.form = {
        organizer_id: "",
        city_id: "",
        start: new Date(),
        end: new Date(),
        header: "",
        city: { name: "" }
      };
      this.isCreate = !this.isCreate;
    },
    editData(event) {
      this.form = event;
      this.isCreate = !this.isCreate;
    },
    storeData() {
      let file = this.form.header;
      let form = new FormData();
      form.append("data", JSON.stringify(this.form));
      form.append("file", file, file.name);
      axios
        .post(this.urlEvent, form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.isCreate = false;
          this.events = response.data.data;
          Toast.fire({
            icon: "success",
            title: response.data.message
          });
        })
        .catch(error => {
          console.error(error);
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
            .delete(this.urlEvent + "/" + id)
            .then(response => {
              this.events = response.data.data;
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
    handleFileChange(e) {
      console.log(e.target.files[0]);
      this.form.header = e.target.files[0];
    },
    changePhoto() {
      this.form.header = "";
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
