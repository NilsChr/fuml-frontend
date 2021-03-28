import DBConnector from "../../services/database/dbConnector";
import documentFactory from "../../services/factories/document.factory";
import storeActions from "../storeActions";

const documents = {
  state: {
    documents: [],
    modalCreateDocument: false,
    selectedDocument: null,
  },
  mutations: {
    SET_DOCUMENTS(state, documents) {
      state.documents = documents;
    },
    SET_MODAL_CREATE_DOCUMENT(state, modalCreateDocument) {
      state.modalCreateDocument = modalCreateDocument;
    },
    SET_SELECTED_DOCUMENT(state, selectedDocument) {
      state.selectedDocument = selectedDocument;
    },
  },
  actions: {
    async LOAD_DOCUMENTS({ state, commit }) {
      console.log("LOAD DOCUMENTS");
    },
    async UPDATE_DOCUMENT({state}, payload) {
      await DBConnector.updateDocument(payload);
    },
    CREATE_DOCUMENT({ state, commit, rootState }, payload) {
      return new Promise(async (resolve) => {
        const title = payload.title;
        const type = payload.type;
        //const document = documentFactory.createDocument(title, type);

        console.log(rootState.projects)
        const project = rootState.projects.selectedProject;
        // CALL DB HERE
        const document = await DBConnector.createDocument(type, title, project._id);
       // console.log("GOT", document);

        const documents = [...state.documents, document];
        commit(storeActions.SET_DOCUMENTS, documents);
        resolve(document);
      });
    },
    DELETE_DOCUMENT({ state, commit }, documentId) {
      if (state.selectedDocument == documentId) {
        commit(storeActions.SET_SELECTED_DOCUMENT, null);
      }
      for (let i = 0; i < state.documents.length; i++) {
        if (state.documents[i].id == documentId) {
          state.documents.splice(i, 1);
          break;
        }
      }
      commit(storeActions.SET_PROJECTS, state.projects);
    },
  },
};

export default documents;
