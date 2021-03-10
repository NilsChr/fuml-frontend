import * as plantumlEncoder from "plantuml-encoder";
import db from "../../services/database/dbDelegate";
import entityUtil from "../../util/entity.util";

const uml = {
  state: {
    url: null,
  },
  mutations: {
    SET_URL(state, url) {
      state.url = url;
    },
  },
  actions: {
    PARSE_UML({ state, commit, rootState }, payload) {
      db.saveData();
      const project = rootState.projects.projects.filter(
        (p) => p.id == rootState.projects.selectedProject
      )[0];

      // Add entities
      let code = "";
      code += "skinparam useBetaStyle true\n";
      code += "skinparam roundCorner 5\n";
      code += "skinparam linetype polyline\n";
      code += "skinparam linetype ortho\n";

      code += `
            <style>
            class {
              FontSize 10
              BackGroundColor #fff
              LineColor #000
            }

            arrow {
                LineColor #000000
            }

            </style>
            hide circle
      `;

      for (let i = 0; i < project.entities.length; i++) {
        let entity = project.entities[i];
        let header = 'entity "' + entity.name + '" {\n';
        code += header;
        for (let j = 0; j < entity.properties.length; j++) {
          let prop = entity.properties[j];
          let t = "*" + prop.title + ":" + prop.type + "\n";
          code += t;
        }
        let footer = "}\n";
        code += footer;
      }

      // Add relations
      let relPairs = [];
      relPairs = entityUtil.createEntityPairs(project);
      relPairs.forEach((p) => {
        let s = entityUtil.createRelationString(p);
        code += s;
      });

      const encoded = plantumlEncoder.encode(code);
      if (encoded == "0m00") {
        commit("SET_URL", null);
        return;
      }
      const plantImg = "http://www.plantuml.com/plantuml/svg/" + encoded;

      commit("SET_URL", plantImg);
    },
  },
};

export default uml;
