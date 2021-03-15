import db from "../../services/database/dbDelegate";
import projectFactory from "../../services/factories/project.factory";
import storeActions from "../storeActions";

const projects = {
  state: {
    projects: [],
    modalCreateProject: false,
    selectedProject: null,
  },
  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
    SET_MODAL_CREATE_PROJECT(state, modalCreateProject) {
      state.modalCreateProject = modalCreateProject;
    },
    SET_SELECTED_PROJECT(state, selectedProject) {
      state.selectedProject = selectedProject;
    },
  },
  actions: {
    async LOAD_PROJECTS({ commit }) {
      let data = await db.loadData();
      commit(storeActions.SET_PROJECTS,data);
    },
    CREATE_PROJECT({ state, commit }, payload) {
      return new Promise((resolve) => {
        const title = payload.title;
        const project = projectFactory.createProject(title);
        const projects = [...state.projects, project];
        commit(storeActions.SET_PROJECTS, projects);
        resolve(project);
      })

    },
    DELETE_PROJECT({ state, commit }, payload) {
      if (state.selectedProject == payload.id) {
        commit(storeActions.SET_SELECTED_PROJECT, null);
      }
      for (let i = 0; i < state.projects.length; i++) {
        if (state.projects[i].id == payload.id) {
          state.projects.splice(i, 1);
          break;
        }
      }
      commit(storeActions.SET_PROJECTS, state.projects);
    },
  },
};

export default projects;
