<template>
  <div>
    <!-- <transition-group tag="div" class="img-slider" name="slide">
      <div v-for="number in [currentImg]" v-bind:key="number">
        <img :src="imgList[Math.abs(currentImg) % imgList.length]" />
      </div>
    </transition-group>
    <div class="container mt-3">
      <h3 class="text-white">Kunjungi Event-Event Menarik</h3>
      <h1 class="display-2 text-white mb-5">
        <strong>Kalender Event Riau</strong>
      </h1>
      <div class="container container-slider h-100">
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
    </div>-->
    <div
      class="jumbotron bg-success"
      :style="{'height': '600px', 'background-image': 'url('+imgList[Math.abs(currentImg) % imgList.length]+')', 'background-size': '1350px', 'background-position': 'center', 'opacity': '0.8'}"
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
      imgList: [
        "images/Kuansing-Pacu-Jalur.jpg",
        "images/selatpanjang_4.jpeg",
        "images/Kuansing-Pacu-Jalur.jpg"
      ],
      currentImg: 0,
      cities: {},
      q: ""
    };
  },
  mounted() {
    setInterval(() => {
      this.currentImg = this.currentImg + 1;
    }, 3000);
  },
  methods: {
    search() {
      if (this.q == "") {
        Toast.fire({
          icon: "error",
          title: "Masukkan kata kunci!"
        });
        return;
      }
      window.location = this.urlSearch + "?q=" + this.q;
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

// slider
#demo {
  overflow: hidden;
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.img-slider {
  overflow: hidden;
  position: relative;
  height: 600px;
  //   width: 100%;
}

.img-slider img {
  position: absolute;
  width: 100%;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
}

.container-slider {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
