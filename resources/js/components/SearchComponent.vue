<template>
  <div class="container">
    <div class="col-12">
      <div class="container h-100 mt-5 mb-2">
        <div class="d-flex justify-content-center h-100">
          <div class="searchbar">
            <input
              class="search_input"
              type="text"
              v-model="q"
              placeholder="Apa yang anda cari...?"
            />
            <a href="javascript:void(0)" class="search_icon" @click="loadSearch">
              <i class="fas fa-search"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="card-box">
        <div class="card-body px-0" v-if="result.length > 0">
          <p class="text-muted text-left">
            <em>Menampilkan {{result.length}} hasil pencarian</em>
          </p>
          <div class="row">
            <div class="col-lg-6 col-md-6 py-2" v-for="row in result" :key="row.id">
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
        <p class="text-muted text-center" v-if="result.length == 0">Tidak ada event yang sesuai</p>
      </div>
      <div class="card-box">
        <h5 class="header-title mt-0 float-left">
          <i class="mdi mdi-map-clock"></i> Event yang akan datang
        </h5>
        <div class="card-body pl-0">
          <div class="row">
            <div class="col-lg-4 col-md-6 py-2" v-for="row in incoming" :key="row.id">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    query: String,
    urlSearch: String
  },
  data() {
    return {
      q: "",
      result: {},
      incoming: {},
      header: "/images/selatpanjang_4.jpeg"
    };
  },
  mounted() {
    this.search(this.query);
  },
  methods: {
    loadSearch() {
      if (this.q == "") {
        Toast.fire({
          icon: "error",
          title: "Masukkan kata kunci!"
        });
        return;
      }
      window.location = this.urlSearch + "?q=" + this.q;
    },
    search(q) {
      axios
        .post(this.urlSearch, {
          q: q
        })
        .then(response => {
          if (response.data.status) {
            this.result = response.data.data.result;
            this.incoming = response.data.data.incoming;
          }
        })
        .catch(error => {
          Toast.fire({
            icon: "error",
            title: response.data.data.message
          });
        });
      this.q = q;
    },
    detail(url) {
      window.location = url;
    }
  }
};
</script>
