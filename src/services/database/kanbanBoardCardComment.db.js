import { HTTP } from "./dbConnector";

export default {
  create: function(boardId, cardId, text) {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = {
          text: text,
        };
        const repsonse = await HTTP.post(
          "/kanbanboards/" + boardId + "/cards/" + cardId + "/comments",
          payload
        );
        resolve(repsonse.data);
      } catch (e) {
        //console.log(e);
        reject(e);
      }
    });
  },
  update: function(boardId, cardId, comment) {
    return new Promise(async (resolve, reject) => {
      try {
        const repsonse = await HTTP.put(
          "/kanbanboards/" + boardId + "/cards/" + cardId + "/comments",
          comment
        );
        resolve(repsonse.data);
      } catch (e) {
        reject(e);
      }
    });
  },
  delete: function(boardId, cardId, commentId) {
    return new Promise(async (resolve, reject) => {
      try {
        const repsonse = await HTTP.delete(
          "/kanbanboards/" +
            boardId +
            "/cards/" +
            cardId +
            "/comments/" +
            commentId
        );
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
};
