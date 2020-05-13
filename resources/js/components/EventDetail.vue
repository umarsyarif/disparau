<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <div class="card-box px-0 pt-0">
          <div class="item-img item-img-card bg--gradient-50">
            <div class="container px-0">
              <img :src="header" alt class height="623rem" style="opacity: 0.7" />
              <a href="javascript:void(0)" class="close top-left" @click="back">
                <i class="mdi mdi-arrow-left"></i>
              </a>
            </div>
          </div>
          <div class="col-12 centered">
            <div class="card-box card-height mb-6">
              <div class="card-header bg-white">
                <br />
                <h2 class="text-center">
                  <span class="label label-danger">{{event.title}}</span>
                </h2>
              </div>
              <div class="card-body text-left text-muted">
                <p class="text-muted font-15">
                  <i class="mdi mdi-map-marker-radius"></i>
                  <span class="ml-2">
                    <strong>{{ city.name | sentence }}</strong>
                  </span>
                </p>
                <p class="text-muted font-15">
                  <i class="mdi mdi-calendar"></i>
                  <span class="ml-2">
                    <strong>{{ event.start | start }} - {{ event.end | end }}</strong>
                  </span>
                </p>
                <!-- <p class="text-muted font-13 ml-4"> -->
                <span class="text-muted font-13" v-html="event.description"></span>
                <!-- </p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.container {
  position: relative;
  text-align: center;
  color: white;
}
.top-left {
  color: white;
  position: absolute;
  top: 8px;
  left: 16px;
}
.centered {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.card-height {
  min-height: 500px;
}
.close:hover {
  color: cornflowerblue;
}
</style>

<script>
export default {
  props: {
    dataEvent: String,
    dataCity: String,
    dataOrganizer: String
  },
  data: function() {
    return {
      event: {},
      city: { name: "" },
      organizer: {},
      header: "/images/selatpanjang_4.jpeg"
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.event = JSON.parse(this.dataEvent);
      this.city = JSON.parse(this.dataCity);
      this.organizer = JSON.parse(this.dataOrganizer);
    },
    back() {
      window.history.back();
    }
  }
};
</script>
