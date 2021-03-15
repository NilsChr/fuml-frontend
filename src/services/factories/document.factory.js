import uniqid from "uniqid";
import store from "../../store/index";

export const documentTypes = {
  ENTITY: "entity",
  SEQUENCE: "sequece",
};

function createEntityDocument(title) {
  console.log(store);
  return {
    id: uniqid(),
    projectId: store.state.projects.selectedProject.id,
    type: documentTypes.ENTITY,
    title: title,
    entities: [],
    created: new Date().getTime(),
  };
}

function createSequenceDocument(title) {
  throw "Not implemented";
  return {
    id: uniqid(),
    title: title,
    entities: [],
  };
}

const documentFactory = {
  createDocument: function(title, type) {
    switch (type) {
      case documentTypes.ENTITY:
        return createEntityDocument(title);
      case documentTypes.SEQUENCE:
        return createSequenceDocument(title);
    }
    throw "Invalid type";
  },
};

export default documentFactory;
