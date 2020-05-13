/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

// CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue';
Vue.use(CKEditor);

// Datatable
import { VuejsDatatableFactory } from 'vuejs-datatable';
Vue.use(VuejsDatatableFactory);

// Sweetalert
import Swal from 'sweetalert2';
window.Swal = Swal;
window.Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
window.swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-primary mr-2'
    },
    buttonsStyling: false
})

// Filters
import { formatDate } from "@fullcalendar/core";
Vue.filter('date', function (date) {
    return formatDate(date, {
        month: "long",
        year: "numeric",
        day: "numeric",
        weekday: "long",
        locale: "id"
    });
})
Vue.filter('start', function (date) {
    return formatDate(date, {
        month: "long",
        day: "numeric",
        weekday: "long",
        locale: "id"
    });
})
Vue.filter('end', function (date) {
    date = new Date(date);
    date.setDate(date.getDate() - 1);
    return formatDate(date, {
        month: "long",
        year: "numeric",
        day: "numeric",
        weekday: "long",
        locale: "id"
    });
})
Vue.filter('sentence', function (value) {
    value = value.toLowerCase();
    return value.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
})



Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('admin-calendar', require('./components/AdminCalendar.vue').default);
Vue.component('user-calendar', require('./components/UserCalendar.vue').default);
Vue.component('organizer-component', require('./components/Organizer.vue').default);
Vue.component('event-component', require('./components/Events.vue').default);
Vue.component('detail-event', require('./components/EventDetail.vue').default);
Vue.component('cities-component', require('./components/Cities.vue').default);
Vue.component('day-component', require('./components/Day.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});
