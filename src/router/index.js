import Vue from 'vue'
import VueRouter from 'vue-router'
import ModuleList from '../components/ModuleList.vue'
import About from '../components/About.vue'
import Fallback from '../components/Fallback.vue'
import ModuleForm from '../components/ModuleForm.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        // Routes
        {
            path: '/',
            name: 'home',
            component: ModuleList
        },

        {
            path: '/new',
            name: 'newMod',
            alias: '/new',
            component: ModuleForm
        },

        {
            path: '/edit',
            name: 'editMod',
            component: ModuleForm,
            props: true,
        },

        {
            path: '/about',
            name: 'about',
            component: About
        },

        {
            path: '*',
            name: 'fallback',
            component: Fallback
        }
    ]
})