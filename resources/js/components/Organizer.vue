<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="heading-text text-center">Penyelenggara Event</h4>
            <div class="clear-fix">
              <a
                href="javascript:void(0)"
                class="btn btn-purple float-right my-3"
                @click="showModal"
              >
                <i class="fa fa-plus mr-1"></i> Penyelenggara Baru
              </a>
            </div>
            <div class="responsive-table-plugin">
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
                        <th>Kontak</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in organizers" :key="row.id">
                        <td>{{index+1}}</td>
                        <td>{{row.name}}</td>
                        <td>{{row.contact}}</td>
                        <td>
                          <button @click="showModal(row)" class="btn btn-sm btn-outline-info">
                            <i class="mdi mdi-lead-pencil"></i>
                          </button>
                          <button @click="deleteData(row.id)" class="btn btn-sm btn-outline-danger">
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
      <div
        class="modal fade"
        id="modal-organizer"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modal-organizer-label"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modal-organizer-label">Add New Organizer</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="resetModal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="name">Nama</label>
                <input type="text" class="form-control" v-model="form.name" id="name" />
                <small class="form-text text-muted">Nama penyelenggara event</small>
              </div>
              <div class="form-group">
                <label for="contact">Kontak</label>
                <input type="text" class="form-control" v-model="form.contact" id="contact" />
                <small class="form-text text-muted">No Telp / Whatsapp</small>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="resetModal"
              >Close</button>
              <button type="button" class="btn btn-primary" @click="handleSubmit()">Simpan</button>
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
    urlGetOrganizers: String,
    urlOrganizer: String
  },
  mounted: function() {
    this.loadData();
  },
  data: function() {
    return {
      organizers: {},
      form: {}
    };
  },
  methods: {
    loadData() {
      axios.get(this.urlGetOrganizers).then(response => {
        this.organizers = response.data;
      });
    },
    showModal(data = null) {
      if (data != null) {
        this.form = _.clone(data);
      }
      $("#modal-organizer").modal("show");
    },
    resetModal() {
      this.form = {};
      $("#modal-organizer").modal("hide");
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
    },
    handleSubmit() {
      axios
        .post(this.urlOrganizer, {
          form: this.form
        })
        .then(response => {
          this.organizers = response.data;
          this.resetModal();
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteData(id) {
      axios
        .delete(this.urlOrganizer + "/" + id)
        .then(response => {
          this.organizers = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
