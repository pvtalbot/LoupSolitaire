import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import LoggedOutView from "../views/LoggedOutView.vue";
import { useUserStore } from "../stores/userStore.ts";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: DashboardView,
            meta: {authenticated: true}
        },
        {
            path: '/auth',
            name: 'auth',
            component: LoggedOutView,
            meta: {authenticated: false}
        },
    ]
});

router.beforeEach(async (to, _, next) => {
    const userStore = useUserStore();

    if (userStore.token && !userStore.user) {
        await userStore.fetchCurrentUser();
    }

    if (to.meta.authenticated && !userStore.isAuthenticated) {
        return next({name: 'auth'});
    }

    if (!to.meta.authenticated && userStore.isAuthenticated) {
        return next({name: 'dashboard'});
    }

    next();
})

export default router;
