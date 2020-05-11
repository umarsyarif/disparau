<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import interactionPlugin from "@fullcalendar/interaction";
import idLocale from "@fullcalendar/core/locales/id";
import dayGridPlugin from "@fullcalendar/daygrid";
import { id } from "vuejs-datepicker/dist/locale";
import FullCalendar from "@fullcalendar/vue";
import Datepicker from "vuejs-datepicker";

export default {
  props: {
    urlGetOrganizers: String,
    urlGetCities: String,
    urlEvent: String
  },
  components: {
    "full-calendar": FullCalendar, // make the <FullCalendar> tag available
    "date-picker": Datepicker
  },
  mounted: function() {
    this.loadData();
    this.loadCities();
    this.loadOrganizers();
    this.getCurrentDate();
  },
  data: function() {
    return {
      locale: idLocale,
      pickerLocale: id,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
      calendarPlugins: [
        dayGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      currentDate: "",
      currentMonth: "",
      calendarEvents: [],
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
        .get(this.urlEvent + "/" + this.currentMonth)
        .then(response => {
          this.calendarEvents = response.data.map(x => {
            x.backgroundColor = x.city.color;
            x.borderColor = x.city.color;
            return x;
          });
        })
        .catch(error => {
          console.error(error);
        });
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
    createData(date = null) {
      this.form = {
        organizer_id: "",
        city_id: "",
        start: this.currentDate,
        end: this.currentDate,
        city: { name: "" }
      };
      if (typeof date == "string") {
        this.form.start = new Date(date);
        this.form.end = new Date(date);
      }
      this.isCreate = !this.isCreate;
    },
    actionModal(event) {
      this.form = event;
      $("#event-modal").modal("show");
    },
    editData(event) {
      $("#event-modal").modal("hide");
      this.isCreate = !this.isCreate;
    },
    storeData() {
      axios
        .post(this.urlEvent, {
          form: this.form
        })
        .then(response => {
          this.isCreate = false;
          this.loadData();
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
      $("#event-modal").modal("hide");
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
              this.loadData();
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
    getCurrentDate() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      this.currentDate = new Date(calendarApi.getDate());
    },
    handleMonthChange() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      var date = new Date(calendarApi.getDate());
      this.currentMonth = date.getMonth() + 1;
      this.loadData();
    },
    handleDateClick(arg) {
      this.createData(arg.dateStr);
    }
  }
};
</script>

<style lang='scss'>
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";

.demo-app {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.demo-app-top {
  margin: 0 0 3em;
}
.demo-app-calendar {
  margin: 0 auto;
  max-width: 900px;
}
.fc-button-primary {
  background: lightskyblue;
  border: lightskyblue;
}
.fc-button-primary:hover {
  background: deepskyblue;
}
.fc-button-primary:disabled {
  background: lightblue;
  color: grey;
}
.close:hover {
  color: red;
}
</style>

<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12" v-if="!isCreate">
        <div class="row">
          <!-- end col-->
          <div class="col-lg-8">
            <div class="card-box">
              <full-calendar
                class="demo-app-calendar"
                ref="fullCalendar"
                defaultView="dayGridMonth"
                :header="{
                    left: 'today',
                    center: 'title',
                    right: 'prev,next'
                }"
                :locale="locale"
                :plugins="calendarPlugins"
                :events="calendarEvents"
                @dateClick="handleDateClick"
                @datesRender="handleMonthChange"
              />
              <div class="card-footer bg-white mt-2 pl-0">
                <ul>
                  <li style="list-style-type:none" v-for="row in cities" :key="row.id">
                    <!-- <input class="form-control col-1" type="color" :value="row.color" disabled /> -->
                    <span class="badge" :style="{'background-color': row.color}">&nbsp;</span>
                    {{ row.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="widget">
              <div class="widget-body">
                <a
                  href="javascript:void(0)"
                  class="btn btn-lg btn-success font-16 btn-block waves-effect waves-light"
                  @click="createData"
                >
                  <i class="fa fa-plus mr-1"></i> Event Baru
                </a>
                <div class="card-box mt-2">
                  <h4 class="header-title mt-0 mb-3">
                    <i class="mdi mdi-trophy mr-1"></i> Event Bulan Ini
                  </h4>
                  <p class="card-text text-center" v-if="!calendarEvents.length">
                    <small class="text-muted">Tidak ada data</small>
                  </p>
                  <ul class="list-group mb-0" v-for="(row) in calendarEvents" :key="row.id">
                    <li class="list-group-item" v-if="row.id">
                      <a
                        href="javascript:void(0)"
                        class="user-list-item row"
                        @click="actionModal(row)"
                      >
                        <div class="user-desc col-md-10 col-10">
                          <h5 class="name mt-0 mb-1">
                            {{ row.title }}
                            <small class="text-muted">({{ row.city.name }})</small>
                          </h5>
                          <p class="desc text-muted mb-0 font-12">{{ row.start | date }}</p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <div class="col-12" v-if="isCreate">
        <div class="card-box">
          <a href="javascript:void(0)" class="close" @click="createData">
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
                <option value>Pilih..</option>
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
                <option value>Kota / Kabupaten</option>
                <option v-for="row in cities" :key="row.id" :value="row.id">{{ row.name }}</option>
              </select>
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
      <!-- Modal -->
      <div
        class="modal fade bd-example-modal-sm"
        id="event-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="event-modal-label"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="event-modal-label">Detail Event</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5
                class="modal-title text-center"
                id="event-modal-label"
                v-if="form.title && !isCreate"
              >
                {{ form.title }}
                <br />
                <small class="text-muted" v-if="!isCreate">({{ form.city.name }})</small>
              </h5>
              <div class="text-center mt-3">
                <button class="btn btn-warning btn-sm" @click="showData(form)">
                  <i class="mdi mdi-information"></i>
                </button>
                <button class="btn btn-primary btn-sm" @click="editData(form)">
                  <i class="mdi mdi-lead-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteData(form.id)">
                  <i class="mdi mdi-delete"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal -->
    </div>
  </div>
</template>
