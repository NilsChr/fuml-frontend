import store from "../../store";
import localDB from "./localDB";
import * as LZString from "lz-string";

const db = {
  instance: localDB,
  saveData() {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("SAVE");
        let data = store.state.projects.projects;
        let compressedData = LZString.compress(JSON.stringify(data));
        console.log(compressedData);
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
        console.log("LOAD");

        let compressedData = await this.instance.loadData();
        let uncompressed = JSON.parse(LZString.decompress(compressedData));
        console.log(uncompressed);

        resolve(uncompressed);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default db;
