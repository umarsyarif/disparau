<template>
  <div>
    <div
      class="jumbotron bg-success mb-2"
      :style="{'height': '480px', 'background-image': 'url(' +[city.header != null ? city.header : header] + ')', 'background-size': '1350px', 'background-position': 'center', 'opacity': '0.8'}"
    ></div>
    <div class="col-12">
      <div class="row">
        <div class="col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div class="card-box px-5">
            <h1 class="display-6 text-center mb-4">
              <strong>{{city.name | kotaSentence}}</strong>
            </h1>
            <div class="card-body">
              <p
                v-if="!city.description"
                class="text-dark"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore est debitis et vel optio, reiciendis, recusandae suscipit eos expedita repellat quidem. Tempora laboriosam molestiae nam vitae quibusdam reprehenderit, suscipit accusamus.</p>
              <!-- <p v-else class="text-dark mb-2" align="justify">{{city.description}}</p> -->
              <span v-else class="text-dark text-justify font-16" v-html="city.description"></span>
              <div class="mt-2" v-if="city.video">
                <center>
                  <iframe
                    width="520"
                    height="300"
                    :src="city.video"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </center>
              </div>
              <div class="card mt-5 mb-3">
                <h5 class="header-title mt-0 float-left">
                  <i class="mdi mdi-google-maps"></i> G-Maps
                </h5>
                <div class="col-12 mt-4 px-0">
                  <gmap-map :center="center" :zoom="15" style="width:100%;  height: 300px;">
                    <gmap-marker :position="marker.position" @click="center=marker.position"></gmap-marker>
                  </gmap-map>
                </div>
              </div>
            </div>
            <h5 class="header-title mt-0 float-left" v-if="city">
              <i class="mdi mdi-format-list-bulleted"></i>
              List Event di {{city.name | kotaSentence}}
            </h5>
            <div class="card-body px-0" v-if="events.length > 0">
              <div class="row">
                <div class="card-event col-lg-6 col-md-6 py-2" v-for="row in events" :key="row.id">
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
                      <div class="text-left mt-2">
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
          <div class="card-box">
            <h5 class="header-title mt-0 float-left" v-if="city">
              <i class="mdi mdi-format-list-bulleted"></i>
              Destinasi Wisata di {{city.name | kotaSentence}}
            </h5>
            <div class="card-body">
              <div class="row">
                <div class="card-event col-lg-6 col-md-6 py-2" v-for="row in wisata" :key="row.id">
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
                      <p class="text-muted">{{row.city.name | sentence}}</p>
                    </div>
                    <a
                      class="btn btn-purple btn-rounded waves-effect waves-light mt-auto mx-2"
                      :href="urlWisataShow+'/'+row.id"
                    >Lihat rincian</a>
                  </div>
                </div>
              </div>
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
    urlWisata: String,
    urlWisataShow: String,
    dataCity: String,
    dataOthers: String,
    dataEvents: String,
    dataWisata: String
  },
  data() {
    return {
      city: {},
      events: {},
      wisata: {},
      others: {},
      marker: {},
      center: { lat: 10, lng: 10 },
      header: "/images/Kuansing-Pacu-Jalur.jpg"
    };
  },
  mounted() {
    this.getData();
    this.setPosition();
    // this.getWisata();
  },
  methods: {
    getData() {
      this.city = JSON.parse(this.dataCity);
      this.others = JSON.parse(this.dataOthers);
      this.events = JSON.parse(this.dataEvents);
      this.wisata = JSON.parse(this.dataWisata);
    },
    setPosition() {
      if (this.currentPlace) {
        const marker = this.currentPlace;
        this.marker = { position: marker };
        this.center = this.marker.position;
      }
    },
    back() {
      window.history.back();
    },
    detail(url) {
      window.location = url;
    }
  },
  computed: {
    currentPlace() {
      return JSON.parse(this.city.meta) ?? this.center;
    }
  }
};
</script>
