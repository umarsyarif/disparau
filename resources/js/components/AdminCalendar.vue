<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import idLocale from "@fullcalendar/core/locales/id";
import { formatDate } from "@fullcalendar/core";

export default {
  props: {
    urlGetEvents: String,
    urlEvent: String
  },
  components: {
    "full-calendar": FullCalendar // make the <FullCalendar> tag available
  },
  mounted: function() {
    this.loadData();
  },
  data: function() {
    return {
      locale: idLocale,
      currentMonth: "",
      calendarPlugins: [
        // plugins must be defined in the JS
        dayGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarEvents: [
        // initial event data
        { title: "Event Now", start: new Date() }
      ]
    };
  },
  methods: {
    loadData() {
      axios.get(this.urlEvent + "/" + this.currentMonth).then(response => {
        console.log(response.data);
        this.calendarEvents = response.data;
      });
    },
    handleMonthChange() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      var date = new Date(calendarApi.getDate());
      this.currentMonth = date.getMonth() + 1;
      this.loadData();
    },
    handleDateClick(arg) {
      if (
        confirm(
          "Would you like to add an event to " +
            formatDate(arg.dateStr, this.format) +
            " ?"
        )
      ) {
        this.calendarEvents.push({
          // add new event data
          title: "New Event",
          start: arg.date,
          end: arg.date + 1,
          allDay: arg.allDay
        });
      }
    }
  }
};
</script>

<style lang='scss'>
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
// @import "~@fullcalendar/timegrid/main.css";
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
            </div>
          </div>
          <div class="col-lg-4">
            <div class="widget">
              <div class="widget-body">
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#add-category"
                  class="btn btn-lg btn-success font-16 btn-block waves-effect waves-light"
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
                      <a href="javascript:void(0)" class="user-list-item row">
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

        <!-- BEGIN MODAL -->
        <div class="modal fade none-border" id="event-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title mt-0">
                  <strong>Add New Event</strong>
                </h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div class="modal-body"></div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light waves-effect" data-dismiss="modal">Close</button>
                <button
                  type="button"
                  class="btn btn-success save-event waves-effect waves-light"
                >Create event</button>
                <button
                  type="button"
                  class="btn btn-danger delete-event waves-effect waves-light"
                  data-dismiss="modal"
                >Delete</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Add Category -->
        <div class="modal fade none-border" id="add-category">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title mt-0">
                  <strong>Add a category</strong>
                </h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div class="modal-body">
                <form role="form">
                  <div class="row">
                    <div class="col-md-6">
                      <label class="control-label">Category Name</label>
                      <input
                        class="form-control form-white"
                        placeholder="Enter name"
                        type="text"
                        name="category-name"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="control-label">Choose Category Color</label>
                      <select
                        class="form-control form-white"
                        data-placeholder="Choose a color..."
                        name="category-color"
                      >
                        <option value="success">Success</option>
                        <option value="danger">Danger</option>
                        <option value="info">Info</option>
                        <option value="pink">Pink</option>
                        <option value="primary">Primary</option>
                        <option value="warning">Warning</option>
                        <option value="inverse">Inverse</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light waves-effect" data-dismiss="modal">Close</button>
                <button
                  type="button"
                  class="btn btn-danger waves-effect waves-light save-category"
                  data-dismiss="modal"
                >Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
