import uniqid from "uniqid";
import db from "../../services/database/dbDelegate";

const projects = {
  state: {
    projects: [],
    selectedProject: null,
  },
  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
    SET_SELECTED_PROJECT(state, selectedProject) {
      state.selectedProject = selectedProject;
    },
  },
  actions: {
    async LOAD_PROJECTS({ state, commit }) {
      console.log('LOOAD')
      let data = await db.loadData();
      commit('SET_PROJECTS',data);
    },
    CREATE_PROJECT({ state, commit }, payload) {
      let project = {
        id: uniqid(),
        name: payload.name,
        entities: []
      };
      let projects = [...state.projects, project];
      commit("SET_PROJECTS", projects);
    },
    DELETE_PROJECT({ state, commit }, payload) {
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
    },
  },
};

export default projects;
