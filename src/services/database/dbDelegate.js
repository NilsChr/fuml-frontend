import store from "../../store";
import localDB from "./localDB";
import * as LZString from "lz-string";

const db = {
  instance: localDB,
  saveData() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = store.state.projects.projects;
        let compressedData = LZString.compress(JSON.stringify(data));
        await this.instance.saveData(compressedData);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  loadData() {
    return new Promise(async (resolve, reject) => {
      try {
        let compressedData = await this.instance.loadData();
        let uncompressed = JSON.parse(LZString.decompress(compressedData));
        resolve(uncompressed);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default db;
