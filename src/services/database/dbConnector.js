import auth from "../../auth";
import axios from "axios";

const DBConnector = {
    url: "http://localhost:3000/api",

    getAccount: function() {
      return new Promise(async (resolve, reject) => {
        try {
          const token = await auth.user().getIdToken();
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          let profile = await axios.get(this.url + "/account");
          resolve(profile.data);
        } catch (e) {
          reject(e);
        }
      });
    }
}

export default DBConnector;
