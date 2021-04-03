import { HTTP } from "./dbConnector";

export default {
  get: function() {
    return new Promise(async (resolve, reject) => {
      try {
        const projects = await HTTP.get("/projects");
        resolve(projects.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  getCollaborators: function(project) {
    return new Promise(async (resolve, reject) => {
      if(!project) return resolve(null);

      try {
        const projects = await HTTP.get("/projects/" + project._id + "/collaborators");
        resolve(projects.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  loadProjectDocuments: function(project) {
    return new Promise(async (resolve, reject) => {
      try {
        if(!project) return resolve(null);
        const response = await HTTP.get(
          "/projects/" + project._id + "/documents"
        );
        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  loadProjectBoards: function(project) {
    return new Promise(async (resolve, reject) => {
      try {
        if(!project) return resolve(null);

        const response = await HTTP.get(
          "/projects/" + project._id + "/boards"
        );
        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  create: function(title) {
    return new Promise(async (resolve, reject) => {
      try {
        if (title === "") title = "untitled";
        const projects = await HTTP.post("/projects", {
          title: title,
        });
        resolve(projects.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  update: function(project) {
    return new Promise(async (resolve, reject) => {
      try {
        await HTTP.put("/projects/" + project._id, project);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  delete: function(project) {
    return new Promise(async (resolve, reject) => {
      try {
        await HTTP.delete("/projects/" + project._id);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
};
