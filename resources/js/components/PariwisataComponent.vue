<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="heading-text text-center">Pariwisata</h4>
            <div class="clear-fix">
              <a href="javascript:void(0)" class="btn btn-success float-right my-3">
                <i class="fa fa-plus mr-1"></i> Wisata Baru
              </a>
            </div>
            <div class="responsive-table-plugin mt-5">
              <div class="table-rep-plugin">
                <div class="table-responsive" data-pattern="priority-columns">
                  <table
                    id="responsive-datatable"
                    class="table table-bordered table-bordered dt-responsive nowrap"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Lokasi</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in wisata" :key="row.id">
                        <td>{{index+1}}</td>
                        <td>{{row.title}}</td>
                        <td>{{row.city.name}}</td>
                        <td>
                          <button @click="showModal(row)" class="btn btn-sm btn-info">
                            <i class="mdi mdi-lead-pencil"></i>
                          </button>
                          <button @click="deleteData(row.id)" class="btn btn-sm btn-danger">
                            <i class="mdi mdi-delete"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
    urlGetWisata: String,
    urlWisata: String
  },
  mounted: function() {
    this.loadData();
  },
  data: function() {
    return {
      wisata: {},
      form: {}
    };
  },
  methods: {
    loadData() {
      axios.get(this.urlGetWisata).then(response => {
        this.wisata = response.data;
      });
    },
    changeColor(id, event) {
      console.log(event.target.value);
      axios
        .post(this.urlColor + "/" + id, {
          color: event.target.value
        })
        .then(response => {
          this.cities = response.data.data;
          Toast.fire({
            icon: "success",
            title: response.data.message
          });
        });
    }
  }
};
</script>
