import { HTTP } from "./dbConnector";


export default {

  update: function(user) {
    return new Promise(async (resolve, reject) => {
      try {
        await HTTP.put("/users/" + user._id, {user});
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
};
