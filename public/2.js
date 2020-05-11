(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Cities.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Cities.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    urlGetCities: String,
    urlColor: String
  },
  mounted: function mounted() {
    this.loadData();
  },
  data: function data() {
    return {
      cities: {},
      form: {}
    };
  },
  methods: {
    loadData: function loadData() {
      var _this = this;

      axios.get(this.urlGetCities).then(function (response) {
        _this.cities = response.data;
      });
    },
    changeColor: function changeColor(id, event) {
      var _this2 = this;

      console.log(event.target.value);
      axios.post(this.urlColor + "/" + id, {
        color: event.target.value
      }).then(function (response) {
        _this2.cities = response.data.data;
        Toast.fire({
          icon: "success",
          title: response.data.message
        });
      });
    },
    showModal: function showModal() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (data != null) {
        this.form = _.clone(data);
      }

      $("#modal-organizer").modal("show");
    },
    resetModal: function resetModal() {
      this.form = {};
      $("#modal-organizer").modal("hide");
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
    },
    // handleSubmit() {
    //   axios
    //     .post(this.urlOrganizer, {
    //       form: this.form
    //     })
    //     .then(response => {
    //       this.organizers = response.data;
    //       this.resetModal();
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // },
    deleteData: function deleteData(id) {
      var _this3 = this;

      axios["delete"](this.urlCity + "/" + id).then(function (response) {
        _this3.organizers = response.data;
      })["catch"](function (error) {
        console.error(error);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Cities.vue?vue&type=template&id=3a449cf4&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Cities.vue?vue&type=template&id=3a449cf4& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container-fluid mt-3" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12" }, [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-body" }, [
            _c("h4", { staticClass: "heading-text text-center" }, [
              _vm._v("Kota / Kabupaten")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "clear-fix" }, [
              _c(
                "a",
                {
                  staticClass: "btn btn-primary float-right my-3 disabled",
                  attrs: { href: "javascript:void(0)" },
                  on: { click: _vm.showModal }
                },
                [_vm._v("Tambah Kota/Kabupaten")]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "responsive-table-plugin" }, [
              _c("div", { staticClass: "table-rep-plugin" }, [
                _c(
                  "div",
                  {
                    staticClass: "table-responsive",
                    attrs: { "data-pattern": "priority-columns" }
                  },
                  [
                    _c(
                      "table",
                      {
                        staticClass:
                          "table table-bordered table-bordered dt-responsive nowrap",
                        attrs: { id: "responsive-datatable" }
                      },
                      [
                        _vm._m(0),
                        _vm._v(" "),
                        _c(
                          "tbody",
                          _vm._l(_vm.cities, function(row, index) {
                            return _c("tr", { key: row.id }, [
                              _c("td", [_vm._v(_vm._s(index + 1))]),
                              _vm._v(" "),
                              _c("td", [_vm._v(_vm._s(row.name))]),
                              _vm._v(" "),
                              _c("td", [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: row.color,
                                      expression: "row.color"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  attrs: { type: "color" },
                                  domProps: { value: row.color },
                                  on: {
                                    change: function($event) {
                                      return _vm.changeColor(row.id, $event)
                                    },
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        row,
                                        "color",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-sm btn-info",
                                    attrs: { disabled: "" },
                                    on: {
                                      click: function($event) {
                                        return _vm.showModal(row)
                                      }
                                    }
                                  },
                                  [
                                    _c("i", {
                                      staticClass: "mdi mdi-lead-pencil"
                                    })
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-sm btn-danger",
                                    attrs: { disabled: "" },
                                    on: {
                                      click: function($event) {
                                        return _vm.deleteData(row.id)
                                      }
                                    }
                                  },
                                  [_c("i", { staticClass: "mdi mdi-delete" })]
                                )
                              ])
                            ])
                          }),
                          0
                        )
                      ]
                    )
                  ]
                )
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "modal fade",
          attrs: {
            id: "modal-organizer",
            tabindex: "-1",
            role: "dialog",
            "aria-labelledby": "modal-organizer-label",
            "aria-hidden": "true"
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "modal-dialog modal-dialog-centered",
              attrs: { role: "document" }
            },
            [
              _c("div", { staticClass: "modal-content" }, [
                _c("div", { staticClass: "modal-header" }, [
                  _c(
                    "h5",
                    {
                      staticClass: "modal-title",
                      attrs: { id: "modal-organizer-label" }
                    },
                    [_vm._v("Add New Organizer")]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "close",
                      attrs: {
                        type: "button",
                        "data-dismiss": "modal",
                        "aria-label": "Close"
                      },
                      on: { click: _vm.resetModal }
                    },
                    [
                      _c("span", { attrs: { "aria-hidden": "true" } }, [
                        _vm._v("×")
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modal-body" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "name" } }, [_vm._v("Nama")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.name,
                          expression: "form.name"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: { type: "text", id: "name" },
                      domProps: { value: _vm.form.name },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.form, "name", $event.target.value)
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("small", { staticClass: "form-text text-muted" }, [
                      _vm._v("Nama penyelenggara event")
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "contact" } }, [
                      _vm._v("Kontak")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.contact,
                          expression: "form.contact"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: { type: "text", id: "contact" },
                      domProps: { value: _vm.form.contact },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.form, "contact", $event.target.value)
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("small", { staticClass: "form-text text-muted" }, [
                      _vm._v("No Telp / Whatsapp")
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modal-footer" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-secondary",
                      attrs: { type: "button", "data-dismiss": "modal" },
                      on: { click: _vm.resetModal }
                    },
                    [_vm._v("Close")]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.handleSubmit()
                        }
                      }
                    },
                    [_vm._v("Save changes")]
                  )
                ])
              ])
            ]
          )
        ]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("#")]),
        _vm._v(" "),
        _c("th", [_vm._v("Nama")]),
        _vm._v(" "),
        _c("th", [_vm._v("Warna")]),
        _vm._v(" "),
        _c("th", [_vm._v("Actions")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Cities.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Cities.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Cities_vue_vue_type_template_id_3a449cf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cities.vue?vue&type=template&id=3a449cf4& */ "./resources/js/components/Cities.vue?vue&type=template&id=3a449cf4&");
/* harmony import */ var _Cities_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cities.vue?vue&type=script&lang=js& */ "./resources/js/components/Cities.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Cities_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Cities_vue_vue_type_template_id_3a449cf4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Cities_vue_vue_type_template_id_3a449cf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Cities.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Cities.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Cities.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Cities_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Cities.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Cities.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Cities_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Cities.vue?vue&type=template&id=3a449cf4&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Cities.vue?vue&type=template&id=3a449cf4& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Cities_vue_vue_type_template_id_3a449cf4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Cities.vue?vue&type=template&id=3a449cf4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Cities.vue?vue&type=template&id=3a449cf4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Cities_vue_vue_type_template_id_3a449cf4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Cities_vue_vue_type_template_id_3a449cf4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);