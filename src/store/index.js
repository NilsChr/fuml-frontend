import Vue from "vue";
import Vuex from "vuex";
import projects from "./modules/projects.store";
import documentEntities from "./modules/documentEntities.store";
import documents from "./modules/documents.store";
import documentSequence from "./modules/documentSequence.store";
import site from "./modules/site.store";
import user from "./modules/user.store";
import kanban from "./modules/kanbanBoard.store";

import uml from "./modules/uml.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    projects,
    uml,
    documents,
    documentSequence,
    documentEntities,
    site,
    user,
    kanban
  },
});
