import { HTTP } from "./dbConnector";

export default {
  create: function(title, projectId) {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = {
          projectId: projectId,
          title: title,
        };
        const repsonse = await HTTP.post("/kanbanboards", payload);
        resolve(repsonse.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  getCards: function(boardId) {
    return new Promise(async (resolve, reject) => {
      try {
        const repsonse = await HTTP.get("/kanbanboards/" + boardId + "/cards");
        resolve(repsonse.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  update: function(board) {
    return new Promise(async (resolve, reject) => {
      try {

        await HTTP.put("/kanbanboards/" + board._id, board);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  delete: function(board) {
    return new Promise(async (resolve, reject) => {
      try {
        await HTTP.delete("/kanbanboards/" + board._id, board);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
};
