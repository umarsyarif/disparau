<template>
  <div>
    <div
      class="jumbotron bg-success mb-2"
      style="height: 480px; background-image: url('/images/Kuansing-Pacu-Jalur.jpg'); background-size: 1350px; background-position: center; opacity: 0.8"
    >
      <div class="container">
        <a href="javascript:void(0)" class="btn btn-purple btn-back float-left" @click="back">
          <i class="mdi mdi-arrow-left logo-back"></i>
        </a>
      </div>
    </div>
    <div class="col-12">
      <div class="row">
        <div class="col-8">
          <div class="card-box">
            <h1 class="display-6 text-center mb-5">
              <strong>{{city.name | kotaSentence}}</strong>
            </h1>
            <h3 class="text-muted mb-2">List Event</h3>
            <div class="card-body px-0" v-if="events.length > 0">
              <div class="row">
                <div class="col-lg-6 col-md-6 py-2" v-for="row in events" :key="row.id">
                  <div class="text-center card h-100 pb-3 shadow">
                    <div class="item-img item-img-card bg--gradient-50">
                      <div style="background-position: center; background-size: cover;">
                        <img :src="header" alt class="w-100" />
                      </div>
                    </div>
                    <div class="px-3 pt-2">
                      <p class="text-muted font-13 mb-3">
                        <strong>{{ row.title }}</strong>
                      </p>

                      <div class="text-left">
                        <p class="text-muted font-13">
                          <i class="mdi mdi-map-marker-radius"></i>
                          <span class="ml-2">{{ city.name | sentence }}</span>
                        </p>
                        <p class="text-muted font-13">
                          <i class="mdi mdi-calendar"></i>
                          <span class="ml-2">{{ row.start | start }} - {{ row.end | end }}</span>
                        </p>
                        <p class="text-muted font-13">
                          <i class="mdi mdi-account"></i>
                          <span class="ml-2">{{ row.organizer.name | sentence}}</span>
                        </p>
                        <p class="text-muted font-13">
                          <i class="mdi mdi-map-search"></i>
                          <span class="ml-2">{{ row.address }}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      class="btn btn-purple btn-rounded waves-effect waves-light mt-auto mx-2"
                      @click="detail(row.url)"
                    >Lihat rincian</button>
                  </div>
                </div>
              </div>
            </div>
            <p class="text muted text-center" v-else>Tidak ada event</p>
          </div>
        </div>
        <div class="col-4">
          <div class="card-box">
            <h5 class="header-title mt-0 float-left">
              <i class="mdi mdi-map-search"></i> Kota/Kabupaten Lainnya
            </h5>
            <div class="card-body pl-0">
              <ul class="list-group mb-0" v-for="(row) in others" :key="row.id">
                <li class="list-group-item text-left" v-if="row.id">
                  <a href="javascript:void(0)" class="user-list-item row">
                    <div class="user-desc col-md-10 col-10">
                      <h5 class="name mt-0 mb-1">{{ row.name | kotaSentence }}</h5>
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
  </div>
</template>

<script>
export default {
  props: {
    dataCity: String,
    dataOthers: String,
    dataEvents: String
  },
  data() {
    return {
      city: {},
      events: {},
      others: {},
      header: "/images/selatpanjang_4.jpeg"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.city = JSON.parse(this.dataCity);
      this.others = JSON.parse(this.dataOthers);
      this.events = JSON.parse(this.dataEvents);
    },
    back() {
      window.history.back();
    },
    detail(url) {
      window.location = url;
    }
  }
};
</script>
