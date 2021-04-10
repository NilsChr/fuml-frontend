function sequenceUMLParser(document) {
  let code = "";
  code += "skinparam useBetaStyle true\n";
  code += "skinparam roundCorner 5\n";
  code += "skinparam linetype polyline\n";
  code += "skinparam linetype ortho\n";

  code += `
  skinparam sequence {
    ArrowColor black
    ActorBorderColor black
    LifeLineBorderColor black
    LifeLineBackgroundColor white
    
    ParticipantBorderColor Black
    ParticipantBackgroundColor White
    ParticipantFontSize 17
    ParticipantFontColor black
    
    ActorBackgroundColor white
    ActorFontColor black
    ActorFontSize 17
    }
      `;

  for (let i = 0; i < document.participants.length; i++) {
    let participant = document.participants[i];
    code += "participant " + participant.title + "\n";
  }

  for (let i = 0; i < document.parts.length; i++) {
    let part = document.parts[i];
    if (!part.visible) continue;
    if (part.block) code += 'Group "' + part.title + '"\n';

    /* TODO: ADD THIS TO ENABLE SPACE IN NAMES
    let tempCode = part.code;
    document.participants.forEach(participant => {
      console.log(participant);
      tempCode = tempCode.replace(participant.title, "\"" + participant.title + "\"");
    });
    code += tempCode + "\n";
    console.log(code);
    */
    code += part.code + "\n";

    if (part.block) code += "end\n";
  }

  return code;
}

export default sequenceUMLParser;
