<template>
  <div>
    <div
      class="jumbotron bg-success"
      style="height: 600px; background-image: url('images/Kuansing-Pacu-Jalur.jpg'); background-size: 1350px; background-position: center; opacity: 0.8"
    >
      <div class="container mt-3">
        <h3 class="text-white">Kunjungi Event-Event Menarik</h3>
        <h1 class="display-2 text-white mb-5">
          <strong>Kalender Event Riau</strong>
        </h1>
        <div class="container h-100">
          <div class="d-flex justify-content-center h-100">
            <div class="searchbar">
              <input
                class="search_input"
                type="text"
                v-model="q"
                placeholder="Apa yang anda cari...?"
              />
              <a href="javascript:void(0)" class="search_icon" @click="search">
                <i class="fas fa-search"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12 px-5 my-5">
      <p class="lead text-center">Kunjungi dan jangan lewatkan, event event yang menarik tahun ini</p>
      <h1 class="text-center">Kota dan Kabupaten di Provinsi Riau</h1>
      <div class="row mt-5">
        <div class="col-sm-6 col-md-6 col-lg-4" v-for="row in cities" :key="row.id">
          <div class="card card-kota" @click="detail(row.id)">
            <img
              class="card-img-top img-fluid"
              src="/images/Kuansing-Pacu-Jalur.jpg"
              alt="Card image cap"
            />
            <div class="card-body">
              <h2 class="card-title">{{row.name | kotaSentence}}</h2>
              <h3 class="mb-0">{{row.events.length}} Event</h3>
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
    urlCitiesEvents: String,
    urlCity: String,
    urlSearch: String
  },
  data() {
    return {
      cities: {},
      q: ""
    };
  },
  mounted() {
    this.getCitiesEvents();
  },
  methods: {
    getCitiesEvents() {
      axios
        .get(this.urlCitiesEvents)
        .then(response => {
          this.cities = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    search() {
      if (this.q == "") {
        Toast.fire({
          icon: "error",
          title: "Masukkan kata kunci!"
        });
        return;
      }
      window.location = this.urlSearch + "?q=" + this.q;
    },
    detail(id) {
      window.location = this.urlCity + "/" + id;
    }
  }
};
</script>

<style lang="scss">
.searchbar {
  margin-bottom: auto;
  margin-top: auto;
  height: 60px;
  width: 570px;
  background-color: #ffff;
  border-radius: 30px;
  padding: 10px;
  opacity: 0.8;
}

.search_input {
  color: dimgrey;
  padding: 0 10px;
  border: 0;
  outline: 0;
  background: none;
  width: 510px;
  caret-color: transparent;
  line-height: 40px;
}

.searchbar:hover {
  opacity: 1;
}

.searchbar:hover > .search_input {
  caret-color: red;
}

.searchbar:hover > .search_icon {
  background: #e74c3c;
  color: white;
}

.search_icon {
  height: 40px;
  width: 40px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #e74c3c;
  text-decoration: none;
}

.img-fluid {
  opacity: 0.6;
}

.card-kota {
  height: 380px;
}

.card-kota:hover {
  cursor: pointer;
}

.card-kota:hover > .img-fluid {
  opacity: 0.8;
}
</style>
