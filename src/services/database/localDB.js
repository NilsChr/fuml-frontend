const localDB = {
  key: "FUML",
  saveData(data) {
    return new Promise((resolve) => {
      localStorage.setItem(this.key, data);
      resolve();
    });
  },
  loadData() {
    return new Promise((resolve) => {
      let project = localStorage.getItem(this.key);
      resolve(project);
    });
  },
};

export default localDB;
