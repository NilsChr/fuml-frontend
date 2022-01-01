import DBConnector from "../../services/database/dbConnector";
import storeActions from "../storeActions";

export const projectActions = {
  DELETE_PROJECT: "DELETE_PROJECT",
  SET_PROJECTS: "SET_PROJECTS",
  SET_LOADING: "SET_LOADING",
  SET_QUEUED_FOR_LOADING: "SET_QUEUED_FOR_LOADING",
  SET_QUEUED_FOR_LOADING_DOCUMENT: "SET_QUEUED_FOR_LOADING_DOCUMENT",
  UPDATE_PROJECT_TITLE: "UPDATE_PROJECT_TITLE",
  SET_SELECTED_PROJECT: "SET_SELECTED_PROJECT",
  SET_SELECTED_PROJECT_COLLABORATORS: "SET_SELECTED_PROJECT_COLLABORATORS",
  LOAD_SELECTED_PROJECT_COLLABORATORS: "LOAD_SELECTED_PROJECT_COLLABORATORS",
  REMOVE_CURRENTUSER_AS_COLLAB: 'REMOVE_CURRENTUSER_AS_COLLAB'
};

const projects = {
  state: {
    projects: [],
    modalCreateProject: false,
    selectedProject: null,
    selectedProjectCollaborators: [],
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
    SET_SELECTED_PROJECT_COLLABORATORS(state, selectedProjectCollaborators) {
      state.selectedProjectCollaborators = selectedProjectCollaborators;
    },
    SET_QUEUED_FOR_LOADING(state, queuedForLoading) {
      state.queuedForLoading = queuedForLoading;
    },
    SET_QUEUED_FOR_LOADING_DOCUMENT(state, queuedForLoadingDocument) {
      state.queuedForLoadingDocument = queuedForLoadingDocument;
    },
  },
  actions: {
    async LOAD_SELECTED_PROJECT_COLLABORATORS({ commit, state, dispatch }) {
      const collabs = await DBConnector.projects.getCollaborators(
        state.selectedProject
      ); 
      commit(projectActions.SET_SELECTED_PROJECT_COLLABORATORS, collabs);
    },
    async LOAD_SELECTED_PROJECT(
      { state, dispatch, commit, rootState },
      payload
    ) {
      commit(projectActions.SET_LOADING, true);
      const docs = await DBConnector.projects.loadProjectDocuments(payload);
      commit(storeActions.SET_SELECTED_PROJECT, payload);
      commit(storeActions.SET_DOCUMENTS, docs);
      commit(projectActions.SET_LOADING, false);
      dispatch(projectActions.LOAD_SELECTED_PROJECT_COLLABORATORS);

      if (state.queuedForLoadingDocument != null) {
        const document = rootState.documents.documents.filter(
          (p) => p._id === state.queuedForLoadingDocument
        )[0];
        commit(storeActions.SET_SELECTED_DOCUMENT, document);
        commit(projectActions.SET_QUEUED_FOR_LOADING_DOCUMENT, null);
        dispatch(storeActions.PARSE_UML);
      }

      // LOAD BOARDS
      const boards = await DBConnector.projects.loadProjectBoards(payload);
      commit(storeActions.kanban.SET_BOARDS, boards);
      dispatch(storeActions.kanban.LOAD_BOARDS, boards);

    },
    async LOAD_PROJECTS({ state, commit, dispatch }) {
      commit(projectActions.SET_LOADING, true);

      const data = await DBConnector.projects.get();
      commit(storeActions.SET_PROJECTS, data);
      commit(projectActions.SET_LOADING, false);

      // Queued For Loading is the value set from router if queryParam projectId != null
      if (state.queuedForLoading != null) {
        const project = state.projects.filter(
          (p) => p._id === state.queuedForLoading
        )[0];

        dispatch(storeActions.LOAD_SELECTED_PROJECT, project);
        commit(projectActions.SET_QUEUED_FOR_LOADING, null);
      }
    },
    CREATE_PROJECT({ state, commit, dispatch }, payload) {
      return new Promise(async (resolve) => {
        const title = payload.title;
        const project = await DBConnector.projects.create(title);

        console.log('Created', project);
        if(project?.status === 'failed') {
          return resolve(project);
        }

        const projects = [...state.projects, project];
        commit(storeActions.SET_PROJECTS, projects);
        dispatch(storeActions.LOAD_SELECTED_PROJECT, project);
        resolve(project);
      });
    },
    DELETE_PROJECT({ state, commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          if (state.selectedProject === payload.id) {
            commit(storeActions.SET_SELECTED_PROJECT, null);
          }
          for (let i = 0; i < state.projects.length; i++) {
            if (state.projects[i]._id === payload._id) {
              state.projects.splice(i, 1);
              break;
            }
          }
          commit(storeActions.SET_PROJECTS, state.projects);
          await DBConnector.projects.delete(payload);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },
    UPDATE_PROJECT_TITLE({ state, commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          console.log(state.selectedProject);
          state.selectedProject.title = payload;
          await DBConnector.projects.update(state.selectedProject);
          commit(projectActions.SET_PROJECTS, state.projects);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },
    async REMOVE_CURRENTUSER_AS_COLLAB({state, rootState, commit}) {
      const user = rootState.user.currentUser;
      const project = state.selectedProject;

      await DBConnector.removeCollaborator(project, user);

      const projects = state.projects.filter(p => p._id != project._id);
      commit(projectActions.SET_PROJECTS, projects);
      commit(projectActions.SET_SELECTED_PROJECT, null);
    }
  },
};

export default projects;
