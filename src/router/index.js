import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        component: () =>
            import(/* webpackChunkName: "chat" */ '../views/Home.vue')
    },
    {
        path: '/chat',
        name: 'chat',
        component: () =>
            import(/* webpackChunkName: "chat" */ '../views/Chat.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
