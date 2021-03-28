import uniqid from "uniqid";

const entityFactory = {
  createEntity: function(title) {
    let entity = {
      //id: uniqid(),
      title: title,
      properties: [],
      relations: [],
      //created: new Date().getTime(),
    };
    return entity;
  },
};

export default entityFactory;
