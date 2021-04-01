import { documentSequenceActions } from "./modules/documentSequence.store";
import { kanbanActions } from "./modules/kanbanBoard.store";
import { projectActions } from "./modules/projects.store";
import { siteActions } from "./modules/site.store";
import { userActions } from "./modules/user.store";

export default {
  site: siteActions,
 // SET_SHOW_APP_BAR: 'SET_SHOW_APP_BAR',

  SET_PROJECTS: "SET_PROJECTS",
  SET_MODAL_CREATE_PROJECT: "SET_MODAL_CREATE_PROJECT",
  SET_SELECTED_PROJECT: "SET_SELECTED_PROJECT",
  LOAD_SELECTED_PROJECT: "LOAD_SELECTED_PROJECT",

  CREATE_DOCUMENT: "CREATE_DOCUMENT",
  SET_DOCUMENTS: "SET_DOCUMENTS",
  SET_MODAL_CREATE_DOCUMENT: "SET_MODAL_CREATE_DOCUMENT",
  SET_SELECTED_DOCUMENT: "SET_SELECTED_DOCUMENT",
  UPDATE_DOCUMENT: 'UPDATE_DOCUMENT',
  DELETE_DOCUMENT: 'DELETE_DOCUMENT',

  CREATE_ENTITY: "CREATE_ENTITY",
  SET_SELECTED_ENTITY: "SET_SELECTED_ENTITY",

  PARSE_UML: "PARSE_UML",

  SET_EDIT_INDEX: "SET_EDIT_INDEX",

  user: userActions,
  documentSequence: documentSequenceActions,
  project: projectActions,
  kanban: kanbanActions
};
