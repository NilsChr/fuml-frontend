import * as plantumlEncoder from "plantuml-encoder";
import DBConnector from "../../services/database/dbConnector";
import UMLParser from "../../services/umlParser/uml.parser";

const uml = {
  state: {
    url: null,
  },
  mutations: {
    SET_URL(state, url) {
      state.url = url;
    },
  },
  actions: {
    PARSE_UML({ commit, rootState }) {
      //db.saveData();

      const document = rootState.documents.selectedDocument;
      //DBConnector.updateDocument(document)
      DBConnector.documents.update(document);

      const code = UMLParser(document);
      const encoded = plantumlEncoder.encode(code);
      
      if (encoded == "0m00") {
        commit("SET_URL", null);
        return;
      }
      const plantImg = "http://www.plantuml.com/plantuml/svg/" + encoded;

      commit("SET_URL", plantImg);
    },
  },
};

export default uml;
