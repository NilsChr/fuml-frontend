import uniqid from "uniqid";

const entityFactory = {
  createEntity: function(title) {
    let project = {
      id: uniqid(),
      name: title,
      properties: [],
      relations: [],
      created: new Date().getTime(),
    };
    return project;
  },
};

export default entityFactory;
