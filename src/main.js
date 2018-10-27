import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from 'lodash'
import swal from 'vue-sweetalert2'

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash }) // Make lodash available as an instance method for all components
Vue.use(swal)
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