import auth from "../../auth";
import axios from "axios";
import projectsDb from "./projects.db";
import documentsDb from "./documents.db";
import kanbanBoardDb from "./kanbanBoard.db";
import kanbanBoardCardDb from "./kanbanBoardCard.db";
import kanbanBoardCardCommentDb from "./kanbanBoardCardComment.db";

import globals from "../../globals";
import storeActions from "../../store/storeActions";
import stripeDb from "./stripe.db";

export const HTTP = {
  url: globals.backendUrl, //"http://localhost:3000/api",
  context: null,
  init(context) {
    this.context = context;
  },
  setToken() {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await auth.user().getIdToken();
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        resolve();
      } catch(e) {
        return reject(e);
      }

    });
  },
  post: function(path, payload) {
    return new Promise(async (resolve, reject) => {
      this.context.$store.commit(storeActions.site.SET_NETWORK_CALL, true);
      try {
        await this.setToken();
        const response = await axios.post(this.url + path, payload);
        this.context.$store.commit(storeActions.site.SET_NETWORK_CALL, false);
        resolve(response);
      } catch (e) {
        this.context.$store.commit(storeActions.site.SET_NETWORK_CALL, false);
        return reject(e);
      }
    });
  },
  get: function(path) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.setToken();
        console.log("GET ", this.url + path)
        const response = await axios.get(this.url + path);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  },
  put: function(path, payload) {
    return new Promise(async (resolve, reject) => {
      this.context.$store.commit(storeActions.site.SET_NETWORK_CALL, true);
      try {
        await this.setToken();
        const response = await axios.put(this.url + path, payload);
        this.context.$store.commit(storeActions.site.SET_NETWORK_CALL, false);
        resolve(response);
      } catch (e) {
        this.context.$store.commit(storeActions.site.SET_NETWORK_CALL, false);
        reject(e);
      }
    });
  },
  delete: function(path) {
    return new Promise(async (resolve, reject) => {
      this.context.$store.commit(storeActions.site.SET_NETWORK_CALL, true);
      try {
        await this.setToken();
        const response = await axios.delete(this.url + path);
        this.context.$store.commit(storeActions.site.SET_NETWORK_CALL, false);
        resolve(response);
      } catch (e) {
        this.context.$store.commit(storeActions.site.SET_NETWORK_CALL, false);
        reject(e);
      }
    });
  },
};

const DBConnector = {
  getAccount: function() {
    return new Promise(async (resolve, reject) => {
      try {
        const profile = await HTTP.get("/account");
        resolve(profile.data);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
  projects: projectsDb,
  documents: documentsDb,
  kanbanBoards: kanbanBoardDb,
  kanbanBoardCards: kanbanBoardCardDb,
  kanbanBoardCardComments: kanbanBoardCardCommentDb,
  stripe: stripeDb,

  addCollaborator: function(project, collaborator) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await HTTP.post(
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
        console.log(project, collaborator);
        const url =
          "/projects/" + project._id + "/collaborators/" + collaborator._id;
        console.log(url);
        const response = await HTTP.delete(url);
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
        const response = await HTTP.post("/services/usersearch", {
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
