<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
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
            <div id="external-events" class="mt-3">
              <h5>List Kategori</h5>
              <p>
                <small>Drag and drop kategori atau klik pada kalender</small>
              </p>
              <div class="external-event bg-primary" data-class="bg-primary">
                <i class="mdi mdi-checkbox-blank-circle mr-2 vertical-middle"></i>Wisata
              </div>
              <div class="external-event bg-pink" data-class="bg-pink">
                <i class="mdi mdi-checkbox-blank-circle mr-2 vertical-middle"></i>Budaya
              </div>
              <div class="external-event bg-warning" data-class="bg-warning">
                <i class="mdi mdi-checkbox-blank-circle mr-2 vertical-middle"></i>Event Baru
              </div>
              <div class="external-event bg-purple" data-class="bg-purple">
                <i class="mdi mdi-checkbox-blank-circle mr-2 vertical-middle"></i>Expo
              </div>
            </div>

            <!-- checkbox -->
            <div class="custom-control custom-checkbox mt-3">
              <input type="checkbox" class="custom-control-input" id="drop-remove" />
              <label class="custom-control-label" for="drop-remove">Remove after drop</label>
            </div>
          </div>
        </div>
      </div>
      <!-- end col-->
      <div class="col-lg-9">
        <div class="card-box">
          <div id="calendar"></div>
        </div>
      </div>
      <!-- end col -->
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("Component mounted.");
  }
};
</script>
