import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/admin',
    name: 'login',
    component: Login,
  },
  {
    path: '/admin/post',
    name: 'adminPost',
    component: () => import('../views/admin/post/List.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        return next({ name: 'login' });
      } else next();
    },
  },
  {
    path: '/post/:id',
    name: 'postShow',
    component: () => import('../views/post/ShowPost.vue'),
  },
  {
    path: '/admin/post/create',
    name: 'createPost',
    component: () => import('../views/admin/post/Create.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        return next({ name: 'login' });
      } else next();
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
