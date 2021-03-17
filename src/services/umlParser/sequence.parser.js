import entityUtil from "../../util/entity.util";

function sequenceUMLParser(document) {
  let code = "";

  for (let i = 0; i < document.participants.length; i++) {
    let participant = document.participants[i];
    code += "participant " + participant.title + "\n";
  }

  for (let i = 0; i < document.parts.length; i++) {
    let part = document.parts[i];
    if(!part.visible) continue;
    if(part.block)
    code +=  'Group \"' + part.title + "\"\n";
    code +=  part.code + "\n";

    if(part.block)
    code += 'end\n';
  }



  return code;
}

export default sequenceUMLParser;
