import { HTTP } from "./dbConnector";

export default {
  create: function(boardId, projectId, title, status) {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = {
          projectId: projectId,
          title: title,
          status: status,
        };
        const repsonse = await HTTP.post("/kanbanboards/" + boardId + "/cards", payload);
        resolve(repsonse.data);
      } catch (e) {
          console.log(e);
        reject(e);
      }
    });
  },
  getCardComments: function(boardId, cardId) {
    return new Promise(async (resolve, reject) => {
      try {
        const repsonse = await HTTP.get("/kanbanboards/" + boardId + "/cards/" + cardId + "/comments");
        resolve(repsonse.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  update: function(board, card) {
    return new Promise(async (resolve, reject) => {
      try {

        const repsonse = await HTTP.put("/kanbanboards/" + board._id +"/cards/"+card._id, card);
        resolve(repsonse.data);
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
