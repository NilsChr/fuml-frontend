import uniqid from "uniqid";

const entities = {
  state: {
    selectedEntity: null,
  },
  mutations: {
    SET_SELECTED_ENTITY(state, selectedEntity) {
      state.selectedEntity = selectedEntity;
    },
  },
  actions: {
    CREATE_ENTITY({ state, commit, rootState }, payload) {
      const project = rootState.projects.projects.filter(p => p.id == rootState.projects.selectedProject)[0];
      project.entities.push(payload);
      commit('SET_PROJECTS', rootState.projects.projects);
      
    },
    DELETE_ENTITY({ state, commit }, payload) {
      console.log("NOT IMPLEMENTED");
      /*
      if (state.selectedProject == payload.id) {
        commit("SET_SELECTED_PROJECT", null);
      }
      for (let i = 0; i < state.projects.length; i++) {
        if (state.projects[i].id == payload.id) {
          state.projects.splice(i, 1);
          break;
        }
      }
      commit("SET_PROJECTS", state.projects);
      */
    },
  },
};

export default entities;
