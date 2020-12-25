<script>
import interactionPlugin from "@fullcalendar/interaction";
import idLocale from "@fullcalendar/core/locales/id";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/vue";
// import moment from "moment/locale/id";

export default {
  props: {
    urlGetOrganizers: String,
    urlGetCities: String,
    urlGetEvent: String,
    urlCitiesEvents: String,
    urlIncomingEvents: String,
    urlCity: String,
    urlSearch: String
  },
  components: {
    "full-calendar": FullCalendar
  },
  mounted: function() {
    this.loadData();
    this.loadCities();
    this.getCitiesEvents();
    this.getIncomingEvents();
  },
  data: function() {
    return {
      calendarPlugins: [
        dayGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      nextDayThreshold: "00:00:00",
      locale: idLocale,
      currentMonth: "",
      calendarEvents: [],
      cities: {},
      citiesEvent: {},
      incomingEvents: {}
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
    getCitiesEvents() {
      axios
        .get(this.urlCitiesEvents)
        .then(response => {
          this.citiesEvent = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getIncomingEvents() {
      axios
        .get(this.urlIncomingEvents)
        .then(response => {
          this.incomingEvents = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    detail(id) {
      window.location = this.urlCity + "/" + id;
    },
    handleMonthChange() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      var date = new Date(calendarApi.getDate());
      this.currentDate = date.toDateString();
      this.loadData();
    },
    handleDateClick(arg) {
      window.location = "/event/" + arg.dateStr;
    },
    handleEventClick(url) {
      window.location = url;
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
  padding-left: auto;
  padding-top: auto;
}
#fcYearly .fc-day-hover .fc-day-hover-container .fc-day-hover-helper {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}
</style>

<template>
  <div>
    <welcome-component
      :url-cities-events="urlCitiesEvents"
      :url-city="urlCity"
      :url-search="urlSearch"
    />
    <div class="col-lg-12 px-5 my-5">
      <p class="lead text-center">Jangan Lewatkan Keseruan Liburan Anda!</p>
      <h1 class="text-center">Event yang akan datang</h1>
      <div class="row mt-5">
        <div class="card-event col-lg-4 col-md-6 py-2" v-for="row in incomingEvents" :key="row.id">
          <div class="text-center card pb-3 shadow">
            <div class="item-img item-img-card bg--gradient-50">
              <div style="height: 200px">
                <img
                  :src="[row.header != null ? row.header : header]"
                  alt="header-event"
                  class="img-fluid mw-100 h-auto"
                  style="opacity: 1"
                />
              </div>
            </div>
            <div class="bg-white px-3 pt-2" style="position: relative">
              <p class="text-dark font-15 mb-0">
                <strong>{{ row.title }}</strong>
              </p>
              <h6 class="font-13 mb-0">{{ row.start | start }} - {{ row.end | end }}</h6>
              <p class="text-muted">{{row.city.name | sentence}}</p>
            </div>
            <a
              class="btn btn-purple btn-rounded waves-effect waves-light mt-auto mx-2"
              :href="row.url"
            >Lihat rincian</a>
          </div>
        </div>
        <p class="text-muted mx-auto">Tidak ada event yang akan datang</p>
      </div>
    </div>
    <div class="container-fluid mt-5 pb-4 px-4">
      <h4 class="text-center text-muted">Dinas Pariwisata Prov.Riau</h4>
      <h1 class="text-center mb-4">Kalender Event Provinsi Riau</h1>
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
                />
                <h6 class="text-danger">*Klik tanggal untuk melihat event harian</h6>
                <div class="card-footer bg-white mt-2 pl-0">
                  <h5>Keterangan warna :</h5>
                  <ul class="pl-0 col-12">
                    <div class="row">
                      <li
                        style="list-style-type:none"
                        class="col-6"
                        v-for="row in cities"
                        :key="row.id"
                      >
                        <span class="badge" :style="{'background-color': row.color}">&nbsp;</span>
                        {{ row.name | sentence}}
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="widget">
                <div class="widget-body">
                  <div class="card-box">
                    <h4 class="header-title mt-0 mb-3">
                      <i class="mdi mdi-calendar mr-1"></i> Event Bulan Ini
                    </h4>
                    <p class="card-text text-center" v-if="!calendarEvents.length">
                      <small class="text-muted">Tidak ada data</small>
                    </p>
                    <ul class="list-group mb-0" v-for="(row) in calendarEvents" :key="row.id">
                      <li class="list-group-item" v-if="row.id">
                        <a
                          href="javascript:void(0)"
                          class="user-list-item row"
                          @click="handleEventClick(row.url)"
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
      </div>
    </div>
    <div class="col-lg-12 px-5 my-5">
      <p class="lead text-center">Kunjungi dan jangan lewatkan, event event yang menarik tahun ini</p>
      <h1 class="text-center">Kota dan Kabupaten di Provinsi Riau</h1>
      <div class="row mt-5">
        <div class="card-event col-sm-6 col-md-6 col-lg-4" v-for="row in citiesEvent" :key="row.id">
          <div class="text-center card pb-3 shadow" @click="detail(row.id)">
            <div class="item-img item-img-card bg--gradient-50">
              <div style="height: 200px">
                <img
                  :src="[row.header != null ? row.header : header]"
                  alt="header-event"
                  class="img-fluid mw-100 h-auto"
                  style="opacity: 1"
                />
              </div>
            </div>
            <div class="bg-white px-3 pt-2" style="position: relative">
              <p class="text-dark font-16 mb-0">
                <strong>{{ row.name | kotaSentence }}</strong>
              </p>
              <p class="text-muted">{{ row.events.length }} Event</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
