import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes.js'
import store from './store.js'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    // console.log(to)
    // console.log(from)
    if (to.meta.requiresAuth && !store.getters.auth.token) {
        // console.log(1)
        next({ path: '/login' });
    } else if (to.meta.requiresRoot) {
        // console.log(2)
        let isManager = store.getters.auth.isManager;
        if (isManager) {
            // console.log(3)
            next();
        } else {
            next({ path: '/product' });
        }
    } else {
        next();
    }
})

export default router
