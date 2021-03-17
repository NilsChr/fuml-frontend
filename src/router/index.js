import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EditorLayout from "../components/layouts/EditorLayout.vue";
import store from '../store';
import storeActions from '../store/storeActions';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { showBar: false}
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
  //if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' });
  store.commit(storeActions.SET_SHOW_APP_BAR, to.meta.showBar);
  next();
  //else next()
})

export default router
