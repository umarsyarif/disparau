<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <div class="card-box card-height mb-6">
          <a
            href="javascript:void(0)"
            class="btn btn-purple btn-back float-left ml-2 mt-2"
            @click="back"
          >
            <i class="mdi mdi-arrow-left logo-back"></i>
          </a>
          <div
            class="jumbotron jumbotron-fluid py-2"
            :style="{'background-image': 'url(' + [wisata.header != null ? wisata.header : header] + ')', 'background-size': 'cover', 'min-height': '22.5rem', 'width': '100%', 'background-position': 'center'}"
          >
            <div class="container"></div>
          </div>
          <div class="card-header bg-white">
            <br />
            <h2 class="text-center">
              <span class="label label-danger">{{wisata.title}}</span>
            </h2>
          </div>
          <div class="card-body text-left text-muted">
            <p class="text-muted font-15">
              <i class="mdi mdi-map-marker-radius"></i>
              <span class="ml-2">
                <strong>{{ city.name | sentence }}</strong>
              </span>
            </p>
            <!-- <p class="text-muted font-15">
              <i class="mdi mdi-calendar"></i>
              <span class="ml-2">
                <strong>{{ wisata.start | start }} - {{ wisata.end | end }}</strong>
              </span>
            </p>-->
            <!-- <p class="text-muted font-13 ml-4"> -->
            <span class="text-muted font-13" v-html="wisata.description"></span>
            <!-- </p> -->
            <div class="col-12 mt-5">
              <gmap-map :center="center" :zoom="15" style="width:100%;  height: 400px;">
                <gmap-marker :position="marker.position" @click="center=marker.position"></gmap-marker>
              </gmap-map>
            </div>
          </div>
        </div>
        <!-- <div class="card-box">
          <h5 class="header-title mt-0 float-left">
            <i class="mdi mdi-map-clock"></i> wisata yang akan datang
          </h5>
          <div class="card-body pl-0">
            <div class="row">
              <div class="card-event col-lg-4 col-md-6 py-2" v-for="row in incoming" :key="row.id">
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
                    <p class="text-muted">{{row.city.name | sentence}}</p>
                  </div>
                  <button
                    class="btn btn-purple btn-rounded waves-effect waves-light mt-auto mx-2"
                    @click="detail(row.url)"
                  >Lihat rincian</button>
                </div>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props: {
    dataWisata: String,
    dataCity: String,
    dataIncoming: String
  },
  data: function() {
    return {
      wisata: {},
      city: { name: "" },
      organizer: {},
      incoming: {},
      header: "/images/selatpanjang_4.jpeg",
      center: { lat: 10, lng: 10 },
      marker: {}
    };
  },
  mounted() {
    this.loadData();
    this.setPosition();
  },
  methods: {
    loadData() {
      this.wisata = JSON.parse(this.dataWisata);
    },
    back() {
      window.history.back();
    },
    detail(url) {
      window.location = url;
    },
    setPosition() {
      if (this.currentPlace) {
        const marker = this.currentPlace;
        this.marker = { position: marker };
        this.center = this.marker.position;
      }
    }
  },
  computed: {
    currentPlace() {
      return JSON.parse(this.wisata.meta) ?? JSON.parse(this.city.meta);
    }
  }
};
</script>
