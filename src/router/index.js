import Vue from 'vue'
import VueRouter from 'vue-router'
import ModuleList from '../components/ModuleList'
import About from '../components/About'
import ModuleForm from '../components/ModuleForm'
import ConsentWall from '../components/ConsentWall'
import store from '../store'
Vue.use(VueRouter)

const router =  new VueRouter({
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
            path: '/consent',
            name: 'consent',
            component: ConsentWall
        }
    ]
})

router.beforeResolve((to, from, next) => {
    const userConsent = store.getters.userConsent
    if (to.name === 'consent' && userConsent) next({name: 'home'})
    if (to.name !== 'consent' && !userConsent) {
        next({name: 'consent'})
    } else {
        next()
    }
})

export default router;
