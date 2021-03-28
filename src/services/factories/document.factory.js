import uniqid from "uniqid";
import store from "../../store/index";
import sequenceFactory from "./sequence.factory";

export const documentTypes = {
  ENTITY: "ENTITY",
  SEQUENCE: "SEQUENCE",
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
/*
function createSequenceDocument(title) {
  return {
    id: uniqid(),
    projectId: store.state.projects.selectedProject.id,
    type: documentTypes.SEQUENCE,
    title: title,
    participants: [
        {title: 'test1'},
        {title: 'test2'},
        {title: 'test3'},
        {title: 'test4'},

    ],
    parts: [],
    created: new Date().getTime(),
  };
}
*/
const documentFactory = {
  createDocument: function(title, type) {
      console.log(' CREATE', title, type)
    switch (type) {
      case documentTypes.ENTITY:
        return createEntityDocument(title);
      case documentTypes.SEQUENCE:
        return sequenceFactory.createSequence(title); //createSequenceDocument(title);
    }
    throw "Invalid type";
  },
};

export default documentFactory;
