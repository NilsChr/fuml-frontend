import Vue from "vue";
import Vuex from "vuex";

import projects from "./modules/projects.store";
import entities from "./modules/entities.store";
import documents from "./modules/documents.store";

import uml from "./modules/uml.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    projects,
    entities,
    uml,
    documents,
  },
});
