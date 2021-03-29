import auth from "../../auth";
import axios from "axios";
import documents, { documentTypes } from "../../store/modules/documents.store";

const DBConnector = {
  url: "http://localhost:3000/api",

  getAccount: function() {
  
    return new Promise(async (resolve, reject) => {
      try {
        const token = await auth.user().getIdToken();
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const profile = await axios.get(this.url + "/account");
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

        const token = await auth.user().getIdToken();
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const projects = await axios.post(this.url + "/projects", {
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
        const token = await auth.user().getIdToken();
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const projects = await axios.get(this.url + "/projects");
        resolve(projects.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  createDocument: function(type, title, projectId) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await auth.user().getIdToken();
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

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
        const repsonse = await axios.post(this.url + "/" + endpoint, payload);
        resolve(repsonse.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateDocument: function(document) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await auth.user().getIdToken();
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

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

        await axios.put(this.url + "/"+ endpoint + "/" + document._id, document);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  loadProjectDocuments: function(document) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await auth.user().getIdToken();
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const response = await axios.get(this.url + "/projects/" + document._id + "/documents");
        resolve(response.data);
      } catch (e) {
        reject(e);
      }
    });
  }
};

export default DBConnector;
