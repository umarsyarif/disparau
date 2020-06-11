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
    urlGetEvent: String,
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
        .get(this.urlGetEvent + "/" + this.currentDate)
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
      this.form.end = new Date(this.form.end);
      this.form.end.setDate(this.form.end.getDate() - 1);
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
    showData(url) {
      window.location = url;
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
    handleMonthChange() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      var date = new Date(calendarApi.getDate());
      this.currentDate = date.toDateString();
      this.loadData();
    },
    handleDateClick(arg) {
      this.createData(arg.dateStr);
    },
    dayRender: function(info) {
      var element = info.el;
      var date = new Date(info.date);
      date.setDate(date.getDate() + 1);
      var currentDate = date.toISOString().substring(0, 10);
      var hoverDivs =
        '<div class="fc-day-hover-container">' +
        '   <div class="fc-day-hover-button"><i class="far fa-calendar-plus"></i></div>' +
        '   <div class="fc-day-hover-helper"></div>' +
        "</div>";

      // Change background of a date cell upon hover and add a centralized "+" icon
      $("td")
        .find('[data-date="' + currentDate + '"]')
        .hover(
          function() {
            $('td [data-date="' + currentDate + '"]').addClass("fc-day-hover"); // Monthly view
            $(element).append(hoverDivs);
          },
          function() {
            $('[data-date="' + currentDate + '"]').removeClass("fc-day-hover");
            $(".fc-day-hover-container").remove();
          }
        );
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

#fcYearly .fc-day-hover {
  /* triggered when hovering over calendar date cells */
  background-color: rgba(0, 0, 0, 0.05);
}
#fcYearly .fc-day-hover .fc-day-hover-container {
  background-color: rgba(20, 20, 20, 0.1);
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  color: #9b9b9b;
  font-size: 20pt;
  cursor: pointer;
  text-align: center;
}
#fcYearly .fc-day-hover .fc-day-hover-container .fc-day-hover-button {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  white-space: normal;
  padding-left: 5px;
}
#fcYearly .fc-day-hover .fc-day-hover-container .fc-day-hover-helper {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}
</style>

<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12">
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
                @dayRender="dayRender"
              />
              <h6 class="text-danger">*Klik tanggal untuk membuat event baru</h6>
              <div class="card-footer bg-white mt-2 pl-0">
                <h5>Keterangan warna :</h5>
                <ul class="pl-0">
                  <li style="list-style-type:none" v-for="row in cities" :key="row.id">
                    <span class="badge" :style="{'background-color': row.color}">&nbsp;</span>
                    {{ row.name | sentence}}
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
                    <i class="mdi mdi-calendar-clock mr-1"></i> Event Bulan Ini
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
                          <p
                            class="desc text-muted mb-0 font-12"
                          >{{ row.start | start }} - {{ row.end | end }}</p>
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
                <button class="btn btn-warning btn-sm" @click="showData(form.url)">
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
