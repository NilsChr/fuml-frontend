import uniqid from "uniqid";
import store from "../../store/index";
import  {documentTypes} from "./document.factory";

const sequenceFactory = {
  createSequence: function(title) {
      console.log('CREATEING SEQ')
    const sequence = {
      id: uniqid(),
      title: title,
      projectId: store.state.projects.selectedProject.id,
      type: documentTypes.SEQUENCE,
      participants: [
          {title: 'test1'},
          {title: 'test2'},
          {title: 'test3'}
      ],
      parts: [],
      created: new Date().getTime(),
    };

    return sequence;
  },
  addParticipantToSequence(title) {
    if(!store.state.documents.selectedDocument.participants) {
      store.state.documents.selectedDocument.participants = [];
    }
    store.state.documents.selectedDocument.participants.push({
        title: 'untitled'
    });
  },
  addPartToSequence(title) {
    if(!store.state.documents.selectedDocument.parts) {
      store.state.documents.selectedDocument.parts = [];
    }
    
    const part = {
        title: 'untitled',
        editorOpen: true,
        visible: true,
        block: false,
        codeLines: [],
        code: ''
    }
    store.state.documents.selectedDocument.parts.push(part);
    return part;
  }
};

export default sequenceFactory;
