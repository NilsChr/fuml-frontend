import DBConnector from "../../services/database/dbConnector";
import storeActions from "../storeActions";

export const documentTypes = {
  ENTITY: "ENTITY",
  SEQUENCE: "SEQUENCE",
};

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
      //await DBConnector.updateDocument(payload);
      await DBConnector.documents.update(payload);
    },
    CREATE_DOCUMENT({ state, commit, rootState }, payload) {
      return new Promise(async (resolve) => {
        const title = payload.title;
        const type = payload.type;

        const project = rootState.projects.selectedProject;
        //const document = await DBConnector.createDocument(type, title, project._id);
        const document = await DBConnector.documents.create(type, title, project._id);

        const documents = [...state.documents, document];
        commit(storeActions.SET_DOCUMENTS, documents);
        resolve(document);
      });
    },
    async DELETE_DOCUMENT({ state, commit }, document) {
      if (state.selectedDocument && state.selectedDocument._id == document._id) {
        commit(storeActions.SET_SELECTED_DOCUMENT, null);
      }
      
      for (let i = 0; i < state.documents.length; i++) {
        if (state.documents[i]._id == document._id) {
          state.documents.splice(i, 1);
          break;
        }
      }
      //await DBConnector.deleteDocument(document);
      await DBConnector.documents.delete(document);
      commit(storeActions.SET_DOCUMENTS, state.documents);
    },
  },
};

export default documents;
