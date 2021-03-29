import DBConnector from "../../services/database/dbConnector";
import storeActions from "../storeActions";

export const projectActions = {
  SET_LOADING: "SET_LOADING",
  SET_QUEUED_FOR_LOADING: "SET_QUEUED_FOR_LOADING",
  SET_QUEUED_FOR_LOADING_DOCUMENT: "SET_QUEUED_FOR_LOADING_DOCUMENT",
};

const projects = {
  state: {
    projects: [],
    modalCreateProject: false,
    selectedProject: null,
    queuedForLoading: null,
    queuedForLoadingDocument: null,
    loading: false,
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
    SET_MODAL_CREATE_PROJECT(state, modalCreateProject) {
      state.modalCreateProject = modalCreateProject;
    },
    SET_SELECTED_PROJECT(state, selectedProject) {
      state.selectedProject = selectedProject;
    },
    SET_QUEUED_FOR_LOADING(state, queuedForLoading) {
      state.queuedForLoading = queuedForLoading;
    },
    SET_QUEUED_FOR_LOADING_DOCUMENT(state, queuedForLoadingDocument) {
      state.queuedForLoadingDocument = queuedForLoadingDocument;
    },
  },
  actions: {
    async LOAD_SELECTED_PROJECT({ state, commit, rootState }, payload) {
      commit(projectActions.SET_LOADING, true);
      const docs = await DBConnector.loadProjectDocuments(payload);
      commit(storeActions.SET_SELECTED_PROJECT, payload);
      commit(storeActions.SET_DOCUMENTS, docs);
      commit(projectActions.SET_LOADING, false);

      // Queued For Loading Document is the value set from router if queryParam documentId != null
      if (state.queuedForLoadingDocument != null) {
        const document = rootState.documents.documents.filter(
          (p) => p._id == state.queuedForLoadingDocument
        )[0];
        commit(storeActions.SET_SELECTED_DOCUMENT, document);
        commit(projectActions.SET_QUEUED_FOR_LOADING_DOCUMENT, null);
      }
    },
    async LOAD_PROJECTS({ state, commit, dispatch }) {
      commit(projectActions.SET_LOADING, true);

      const data = await DBConnector.getProjects();
      commit(storeActions.SET_PROJECTS, data);
      commit(projectActions.SET_LOADING, false);

      // Queued For Loading is the value set from router if queryParam projectId != null
      if (state.queuedForLoading != null) {
        const project = state.projects.filter(
          (p) => p._id == state.queuedForLoading
        )[0];

        dispatch(storeActions.LOAD_SELECTED_PROJECT, project);
        commit(projectActions.SET_QUEUED_FOR_LOADING, null);
      }
    },
    CREATE_PROJECT({ state, commit }, payload) {
      return new Promise(async (resolve) => {
        const title = payload.title;
        const project = await DBConnector.createProject(title); 
        const projects = [...state.projects, project];
        commit(storeActions.SET_PROJECTS, projects);
        resolve(project);
      });
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
