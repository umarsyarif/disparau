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
    urlCity: String,
    urlSearch: String
  },
  components: {
    "full-calendar": FullCalendar
  },
  mounted: function() {
    this.loadData();
    this.loadCities();
  },
  data: function() {
    return {
      locale: idLocale,
      nextDayThreshold: "00:00:00",
      calendarPlugins: [
        dayGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      currentMonth: "",
      calendarEvents: [],
      cities: {}
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
    },
    dayRender: function(info) {
      //   console.group("dayRender(info) called", info);

      var element = info.el;
      var date = new Date(info.date);
      date.setDate(date.getDate() + 1);
      var currentDate = date.toISOString().substring(0, 10);
      var hoverDivs = '<div class="fc-day-hover-container">' + "</div>";

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
    <div class="container-fluid mt-3 pb-4">
      <h1 class="text-center">Kalender Event Provinsi Riau</h1>
      <h4 class="text-center text-muted mb-4">Dinas Pariwisata Prov.Riau</h4>
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
                <h6 class="text-danger">*Klik tanggal untuk melihat event harian</h6>
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
                  <div class="card-box">
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
  </div>
</template>
