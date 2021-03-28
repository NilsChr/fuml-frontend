import storeActions from "../storeActions";

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
    CREATE_ENTITY({ commit, rootState }, payload) {
      const document = rootState.documents.selectedDocument;
      document.entities.push(payload);
      console.log("ADDED", document)
      commit(storeActions.SET_SELECTED_DOCUMENT,document);
    },
    DELETE_ENTITY({ state, commit }, payload) {
      console.log("NOT IMPLEMENTED");
      
    },
  },
};

export default entities;
