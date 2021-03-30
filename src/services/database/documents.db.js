import { documentTypes } from "../../store/modules/documents.store";
import { HTTP } from "./dbConnector";

export default {
  create: function(type, title, projectId) {
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
        const repsonse = await HTTP.post("/" + endpoint, payload);
        resolve(repsonse.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  update: function(document) {
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
        await HTTP.put("/" + endpoint + "/" + document._id, document);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  delete: function(document) {
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
        await HTTP.delete("/" + endpoint + "/" + document._id, document);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
};
