import { documentTypes } from "../factories/document.factory";
import entityUMLParser from "./entity.parser";

function UMLParser(document) {
  switch (document.type) {
    case documentTypes.ENTITY:
      return entityUMLParser(document);
  }
  throw "Document type not parsable";
}

export default UMLParser;
