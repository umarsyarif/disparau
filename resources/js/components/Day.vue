<template>
  <div class="col-12 py-4">
    <div class="col-12">
      <div class="card-box">
        <a href="javascript:void(0)" class="btn btn-purple btn-back float-left" @click="back">
          <i class="mdi mdi-arrow-left logo-back"></i>
        </a>
        <div class="card-header bg-white">
          <h1 class="text-center">
            <i class="mdi mdi-calendar"></i>
          </h1>
          <br />
          <h2 class="text-center">
            <span class="label label-danger">Event Tanggal : {{date | date}}</span>
          </h2>
        </div>
        <div class="card-body px-0" v-if="listEvent.length > 0">
          <div class="row">
            <div class="col-lg-4 col-md-6 py-2" v-for="row in listEvent" :key="row.id">
              <div class="text-center card h-100 pb-3 shadow">
                <div class="item-img item-img-card bg--gradient-50">
                  <div style="background-position: center; background-size: cover;">
                    <img :src="[row.header != null ? row.header : header]" alt class="w-100" />
                  </div>
                </div>
                <div class="px-3 pt-2">
                  <p class="text-dark font-13 mb-3">
                    <strong>{{ row.title }}</strong>
                  </p>

                  <div class="text-left">
                    <p class="text-muted font-13">
                      <i class="mdi mdi-map-marker-radius"></i>
                      <span class="ml-2">{{ row.city.name | sentence }}</span>
                    </p>
                    <p class="text-muted font-13">
                      <i class="mdi mdi-calendar"></i>
                      <span class="ml-2">{{ row.start | start }} - {{ row.end | end }}</span>
                    </p>
                    <p class="text-muted font-13">
                      <i class="mdi mdi-account"></i>
                      <span class="ml-2">{{ row.organizer.name | sentence }}</span>
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
        <p class="text muted text-center" v-else>Tidak ada event hari ini</p>
      </div>
    </div>
    <div class="col-12">
      <div class="card-box">
        <h5 class="header-title mt-0 float-left">
          <i class="mdi mdi-map-clock"></i> Event yang akan datang
        </h5>
        <div class="card-body pl-0">
          <div class="row">
            <div class="col-lg-4 col-md-6 py-2" v-for="row in incomingEvents" :key="row.id">
              <div class="text-center card pb-3 shadow">
                <div class="item-img item-img-card bg--gradient-50">
                  <div style="background-position: center; background-size: cover;">
                    <img :src="[row.header != null ? row.header : header]" alt class="w-100" />
                  </div>
                </div>
                <div class="px-3 pt-2">
                  <p class="text-dark font-13 mb-0">
                    <strong>{{ row.title }}</strong>
                  </p>
                  <h6 class="font-13 mb-0">{{ row.start | start }} - {{ row.end | end }}</h6>
                  <p class="text-muted">{{row.city.name}}</p>
                </div>
                <button
                  class="btn btn-purple btn-rounded waves-effect waves-light mt-auto mx-2"
                  @click="detail(row.url)"
                >Lihat rincian</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.btn-back {
  border-color: white;
  opacity: 0.8;
}

.btn-back:hover {
  background-color: white;
  opacity: 1;
}
.btn-back:hover > .logo-back {
  color: purple;
}
</style>

<script>
export default {
  props: {
    date: String,
    events: String,
    incoming: String
  },
  data: function() {
    return {
      listEvent: {},
      incomingEvents: {},
      header: "/images/selatpanjang_4.jpeg"
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.listEvent = JSON.parse(this.events);
      this.incomingEvents = JSON.parse(this.incoming);
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
