<script>
import interactionPlugin from "@fullcalendar/interaction";
import idLocale from "@fullcalendar/core/locales/id";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/vue";

export default {
  props: {
    urlGetOrganizers: String,
    urlGetCities: String,
    urlEvent: String
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
      alert(arg.dateStr);
      window.location = "/event/" + arg.dateStr;
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
              />
              <div class="card-footer bg-white mt-2 pl-0">
                <ul>
                  <li style="list-style-type:none" v-for="row in cities" :key="row.id">
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
                <div class="card-box">
                  <h4 class="header-title mt-0 mb-3">
                    <i class="mdi mdi-trophy mr-1"></i> Event Bulan Ini
                  </h4>
                  <p class="card-text text-center" v-if="!calendarEvents.length">
                    <small class="text-muted">Tidak ada data</small>
                  </p>
                  <ul class="list-group mb-0" v-for="(row) in calendarEvents" :key="row.id">
                    <li class="list-group-item" v-if="row.id">
                      <a href="javascript:void(0)" class="user-list-item row">
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
</template>
