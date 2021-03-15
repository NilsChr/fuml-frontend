import uniqid from "uniqid";

const projectFactory = {
  createProject: function(title) {
    let project = {
      id: uniqid(),
      title: title,
      documents: [],
      created: new Date().getTime(),
    };
    return project;
  },
};

export default projectFactory;
