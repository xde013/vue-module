import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import swal from 'sweetalert'


new Vue({
    el: '#app',
    // Attach the Vue instance to the window,
    // so it's available globally.
    created: function() {
        window.Vue = this
    },
    router,
    store,
    render: h => h(App)
})