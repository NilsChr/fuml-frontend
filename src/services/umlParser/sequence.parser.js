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

    /* TODO: ADD THIS TO ENABLE SPACE IN NAMES
    let tempCode = part.code;
    document.participants.forEach(participant => {
      console.log(participant);
      tempCode = tempCode.replace(participant.title, "\"" + participant.title + "\"");
    });
    code += tempCode + "\n";
    console.log(code);
    */
    code +=  part.code + "\n";

    if(part.block)
    code += 'end\n';
  }



  return code;
}

export default sequenceUMLParser;
