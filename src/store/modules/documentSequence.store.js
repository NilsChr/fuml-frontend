import storeActions from "../storeActions";

export const documentSequenceActions = {
  ADD_PARTICIPANT_TO_SEQUENCE: "ADD_PARTICIPANT_TO_SEQUENCE",
  ADD_PART_TO_SEQUENCE: "ADD_PART_TO_SEQUENCE"
};

const documentSequence = {
  state: {
    editIndex: -1,
  },
  mutations: {
    SET_EDIT_INDEX(state, editIndex) {
      state.editIndex = editIndex;
    },
  },
  actions: {
    ADD_PARTICIPANT_TO_SEQUENCE({ commit, rootState }, payload) {
      if (!rootState.documents.selectedDocument.participants) {
        rootState.documents.selectedDocument.participants = [];
      }
      rootState.documents.selectedDocument.participants.push({
        title: "untitled",
      });

      commit(
        storeActions.SET_SELECTED_DOCUMENT,
        rootState.documents.selectedDocument
      );
    },
    ADD_PART_TO_SEQUENCE({commit, rootState}, payload) {
      if (!rootState.documents.selectedDocument.parts) {
        rootState.documents.selectedDocument.parts = [];
      }
  
      const part = {
        title: "untitled",
        editorOpen: true,
        visible: true,
        block: false,
        codeLines: [],
        code: "",
      };
      rootState.documents.selectedDocument.parts.push(part);
      commit(
        storeActions.SET_SELECTED_DOCUMENT,
        rootState.documents.selectedDocument
      );
      return part;
    }
  },
};

export default documentSequence;
