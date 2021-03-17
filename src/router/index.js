import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'

import EditorLayout from "../components/layouts/EditorLayout.vue";
import store from '../store';
import storeActions from '../store/storeActions';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: { showBar: false}
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: { showBar: false}
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { showBar: true}
  },
  {
    path: '/editor',
    name: 'editor',
    component: EditorLayout,
    meta: { showBar: true}
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  base: "/fuml",
  mode: "history",
  routes
})

/*
router.beforeEach((route) => {
  store.commit(storeActions.SET_SHOW_APP_BAR, route.meta.showBar);
  console.log(route);
})
*/

// GOOD
router.beforeEach((to, from, next) => {
  console.log(to);
  //if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' });
  store.commit(storeActions.SET_SHOW_APP_BAR, to.meta.showBar);
  next();
  //else next()
})

export default router
