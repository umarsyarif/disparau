/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');


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



Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('admin-calendar', () => import('./components/AdminCalendar.vue'));
Vue.component('organizer-component', () => import('./components/Organizer.vue'));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});
