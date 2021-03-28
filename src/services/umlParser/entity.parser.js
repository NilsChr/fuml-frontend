import entityUtil from "../../util/entity.util";

function entityUMLParser(document) {
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
  for (let i = 0; i < document.entities.length; i++) {
    let entity = document.entities[i];
    let header = 'entity "' + entity.title + '" {\n';
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
  relPairs = entityUtil.createEntityPairs(document);

  relPairs.forEach((p) => {
    let s = entityUtil.createRelationString(p);
    code += s;
  });

  return code;
}

export default entityUMLParser;
