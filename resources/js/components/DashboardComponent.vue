<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <div class="card-box">
          <div class="card-header bg-white">
            <h4 class="header-title mt-0">
              <strong>Event hari ini</strong>
            </h4>
          </div>
          <div class="card-body pt-2">
            <h2 class="font-weight-normal mb-1">
              <strong>{{dayEvent.length}}</strong>
            </h2>
            <p class="text-muted">Event</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card-box">
          <div class="card-header bg-white">
            <h4 class="header-title mt-0">
              <strong>Event bulan ini</strong>
            </h4>
          </div>
          <div class="card-body pt-2">
            <h2 class="font-weight-normal mb-1">
              <strong>{{monthEvent.length}}</strong>
            </h2>
            <p class="text-muted">Event</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card-box">
          <div class="card-header bg-white">
            <h4 class="header-title mt-0">
              <strong>Event tahun ini</strong>
            </h4>
          </div>
          <div class="card-body pt-2">
            <h2 class="font-weight-normal mb-1">
              <strong>{{yearEvent.length}}</strong>
            </h2>
            <p class="text-muted">Event</p>
          </div>
        </div>
      </div>
      <!-- end col-->
      <div class="col-lg-6">
        <div class="card-box">
          <h5 class="header-title mt-0 float-left">
            <i class="mdi mdi-clipboard-text-play"></i> Event yang akan datang
          </h5>
          <div class="card-body pl-0">
            <p class="text-center">
              <small class="text-muted" v-if="incomingEvent.length == 0">Tidak ada data</small>
            </p>
            <ul class="list-group mb-0" v-for="(row) in incomingEvent" :key="row.id">
              <li class="list-group-item text-left" v-if="row.id">
                <a href="javascript:void(0)" class="user-list-item row">
                  <div class="user-desc col-md-10 col-10">
                    <h5 class="name mt-0 mb-1">
                      {{ row.title }}
                      <small class="text-muted">({{ row.city.name }})</small>
                    </h5>
                    <p class="desc text-muted mb-0 font-12">{{ row.start | diffForHumans }}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- end col -->
      <div class="col-lg-6">
        <div class="card-box">
          <h5 class="header-title mt-0 float-left">
            <i class="mdi mdi-map-clock"></i> Event tahun ini
            <small class="text-muted">(Kota/Kabupaten)</small>
          </h5>
          <div class="card-body pl-0">
            <ul class="list-group mb-0" v-for="(row) in citiesEvent" :key="row.id">
              <li class="list-group-item text-left" v-if="row.events.length > 0">
                <a href="javascript:void(0)" class="user-list-item row">
                  <div class="user-desc col-md-10 col-10">
                    <h5 class="name mt-0 mb-1">{{ row.name }}</h5>
                    <p class="desc text-muted mb-0 font-12">{{ row.events.length }} event</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    urlGetEvent: String
  },
  data() {
    return {
      yearEvent: {},
      monthEvent: {},
      dayEvent: {},
      incomingEvent: {},
      citiesEvent: {}
    };
  },
  mounted() {
    this.getNextEvents();
  },
  methods: {
    getNextEvents() {
      axios
        .get(this.urlGetEvent)
        .then(response => {
          console.log.response;
          this.dayEvent = response.data.day;
          this.monthEvent = response.data.month;
          this.yearEvent = response.data.year;
          this.incomingEvent = response.data.incoming;
          this.citiesEvent = response.data.cities;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
