import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing.vue";
import Auth from "../views/Auth.vue";
import Dashboard from "../views/Dashboard.vue";

import Layout from "../components/layouts/Layout.vue";
import store from "../store";
import storeActions from "../store/storeActions";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
    meta: { showBar: false },
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    meta: { showBar: false },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { showBar: true },
  },
  {
    path: "/editor",
    name: "editor",
    component: Layout,
    meta: { showBar: true },
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  base: "/fuml",
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "dashboard") {
    handleDashboardLink(to);  
  }

  //if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' });
  store.commit(storeActions.site.SET_SHOW_APP_BAR, to.meta.showBar);
  next();
  //else next()
});

function handleDashboardLink(to) {
  const projectId = to.query.projectId;
    if (projectId) {
      const project = store.state.projects.projects.filter(
        (p) => p._id == projectId
      )[0];
      if (project) {
        store.commit(storeActions.SET_SELECTED_PROJECT, project);
      } else if (!project) {
        store.commit(storeActions.project.SET_QUEUED_FOR_LOADING, projectId);
      }
    }

    const documentId = to.query.documentId;
    if (documentId) {
      const document = store.state.documents.documents.filter(
        (p) => p._id == documentId
      )[0];
      if (document) {
        store.commit(storeActions.SET_SELECTED_DOCUMENT, document);
      } else if (!document) {
        store.commit(storeActions.project.SET_QUEUED_FOR_LOADING_DOCUMENT, documentId);
      }
    }
}

export default router;
