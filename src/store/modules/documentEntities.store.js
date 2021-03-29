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

      const entity = {
        title: payload.title,
        properties: [],
        relations: [],
      };

      document.entities.push(entity);
      commit(storeActions.SET_SELECTED_DOCUMENT, document);
    },
    DELETE_ENTITY({ state, commit }, payload) {
      console.log("NOT IMPLEMENTED");
    },
  },
};

export default entities;
