<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="heading-text text-center">Pariwisata</h4>
            <div class="clear-fix"></div>
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
                        <th>Warna</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in cities" :key="row.id">
                        <td>{{index+1}}</td>
                        <td>{{row.name}}</td>
                        <td>
                          <input
                            class="form-control"
                            type="color"
                            v-model="row.color"
                            @change="changeColor(row.id, $event)"
                          />
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
    urlGetCities: String,
    urlColor: String
  },
  mounted: function() {
    this.loadData();
  },
  data: function() {
    return {
      cities: {},
      form: {}
    };
  },
  methods: {
    loadData() {
      axios.get(this.urlGetCities).then(response => {
        this.cities = response.data;
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
