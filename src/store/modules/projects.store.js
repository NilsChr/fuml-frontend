import DBConnector from "../../services/database/dbConnector";
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
    async LOAD_SELECTED_PROJECT({state, commit}, payload) {
      const docs = await DBConnector.loadProjectDocuments(payload);
      commit(storeActions.SET_SELECTED_PROJECT, payload);
      commit(storeActions.SET_DOCUMENTS, docs);
    },
    async LOAD_PROJECTS({ commit }) {
      //let data = await db.loadData();
      const data = await DBConnector.getProjects();
      commit(storeActions.SET_PROJECTS,data);
    },
    CREATE_PROJECT({ state, commit }, payload) {
      return new Promise(async (resolve) => {
        const title = payload.title;
        const project = await DBConnector.createProject(title); //projectFactory.createProject(title);
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
