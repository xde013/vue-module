import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import swal from 'sweetalert'
import lodash from 'lodash'
Object.defineProperty(Vue.prototype, '$lodash', { value: lodash }) // Make lodash available as an instance method for all components


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