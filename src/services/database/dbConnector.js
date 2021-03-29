import auth from "../../auth";
import axios from "axios";
import { documentTypes } from "../../store/modules/documents.store";

const DBConnector = {
  url: "http://localhost:3000/api",
  setToken() {
    return new Promise(async (resolve) => {
      const token = await auth.user().getIdToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      resolve();
    });
  },
  post: function(path, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.setToken();
        const response = await axios.post(this.url + path, payload);
        resolve(response);
      } catch (e) {
        return reject(e);
      }
    });
  },
  get: function(path) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.setToken();
        const response = await axios.get(this.url + path);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  },
  put: function(path, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.setToken();
        const response = await axios.put(this.url + path, payload);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  },
  delete: function(path) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.setToken();
        const response = await axios.delete(this.url + path);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  },

  getAccount: function() {
    return new Promise(async (resolve, reject) => {
      try {
        const profile = await this.get("/account");
        resolve(profile.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  createProject: function(title) {
    return new Promise(async (resolve, reject) => {
      try {
        if (title === "") title = "untitled";
        const projects = await this.post("/projects", {
          title: title,
        });
        resolve(projects.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  getProjects: function() {
    return new Promise(async (resolve, reject) => {
      try {
        const projects = await this.get("/projects");
        resolve(projects.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateProject: function(project) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.put("/projects/" + project._id, project);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  createDocument: function(type, title, projectId) {
    return new Promise(async (resolve, reject) => {
      try {
        let endpoint = "";
        if (type === documentTypes.ENTITY) {
          endpoint = "entitydocuments";
        }
        if (type === documentTypes.SEQUENCE) {
          endpoint = "sequencedocuments";
        }

        if (endpoint === "") {
          return reject("Invalid document type");
        }

        const payload = {
          projectId: projectId,
          title: title,
        };
        const repsonse = await this.post("/" + endpoint, payload);
        resolve(repsonse.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateDocument: function(document) {
    return new Promise(async (resolve, reject) => {
      try {
        let endpoint = "";
        if (document.type === documentTypes.ENTITY) {
          endpoint = "entitydocuments";
        }
        if (document.type === documentTypes.SEQUENCE) {
          endpoint = "sequencedocuments";
        }

        if (endpoint === "") {
          return reject("Invalid document type");
        }
        await this.put("/" + endpoint + "/" + document._id, document);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  deleteDocument: function(document) {
    return new Promise(async (resolve, reject) => {
      try {
        let endpoint = "";
        if (document.type === documentTypes.ENTITY) {
          endpoint = "entitydocuments";
        }
        if (document.type === documentTypes.SEQUENCE) {
          endpoint = "sequencedocuments";
        }

        if (endpoint === "") {
          return reject("Invalid document type");
        }
        await this.delete("/" + endpoint + "/" + document._id, document);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  loadProjectDocuments: function(document) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.get(
          "/projects/" + document._id + "/documents"
        );
        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  addCollaborator: function(project, collaborator) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.post(
          "/projects/" + project._id + "/collaborators",
          collaborator
        );
        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  },

  removeCollaborator: function(project, collaborator) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(project, collaborator)
        const url =
          "/projects/" + project._id + "/collaborators/" + collaborator._id;
          console.log(url);
        const response = await this.delete(url);
        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  },

  // Services
  searchUser: function(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.post("/services/usersearch", {
          search: username,
        });
        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default DBConnector;
