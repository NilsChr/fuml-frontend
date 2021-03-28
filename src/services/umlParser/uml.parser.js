import { documentTypes } from "../factories/document.factory";
import entityUMLParser from "./entity.parser";
import sequenceUMLParser from "./sequence.parser";

function UMLParser(document) {

  switch (document.type) {
    case documentTypes.ENTITY:
      return entityUMLParser(document);
    case documentTypes.SEQUENCE:
      return sequenceUMLParser(document);
  }
  throw "Document type not parsable";
}

export default UMLParser;
