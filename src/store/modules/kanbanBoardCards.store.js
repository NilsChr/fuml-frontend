import DBConnector from "../../services/database/dbConnector";
import storeActions from "../storeActions";

export const kanbanCardActions = {
  SET_CARDS: "SET_CARDS",
  SET_SELECTED_CARD: "SET_SELECTED_CARD",

  CREATE_CARD: "CREATE_CARD",
  UPDATE_CARD_STATUS: "UPDATE_CARD_STATUS",
  UPDATE_CARD: "UPDATE_CARD",
  DELETE_CARD: 'DELETE_CARD',
  TOGGLE_LABEL: "TOGGLE_LABEL",

  SET_COMMENTS: "SET_COMMENTS",
  LOAD_COMMENTS: "LOAD_COMMENTS",
  CREATE_COMMENT: "CREATE_COMMENT",
  DELETE_COMMENT: 'DELETE_COMMENT'
};

const site = {
  state: {
    cards: [],
    selectedCard: null,
    selectedCardComments: [],
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
    },
    SET_SELECTED_CARD(state, selectedCard) {
      state.selectedCard = selectedCard;
    },
    SET_COMMENTS(state, comments) {
      state.selectedCardComments = comments;
    },
  },
  actions: {
    async UPDATE_CARD_STATUS({ state, rootState, commit }, payload) {
      let card = state.cards.find((c) => c._id == payload.cardId);
      const board = rootState.kanban.selectedBoard;

      card.status = payload.newStatus;

      card = await DBConnector.kanbanBoardCards.update(board, card);

      commit(storeActions.kanbanCards.SET_CARDS, state.cards);
    },
    async UPDATE_CARD({ state, rootState, commit }, cardId) {
      let card = state.cards.find((c) => c._id == cardId);
      const board = rootState.kanban.selectedBoard;

      card = await DBConnector.kanbanBoardCards.update(board, card);

      commit(storeActions.kanbanCards.SET_CARDS, state.cards);
    },
    CREATE_CARD({ state, rootState, commit }, payload) {
      return new Promise(async (resolve, reject) => {
        const projectId = rootState.projects.selectedProject._id;
        const title = payload.title;
        const boardId = rootState.kanban.selectedBoard._id;
        const status = payload.status;

        const newCard = await DBConnector.kanbanBoardCards.create(
          boardId,
          projectId,
          title,
          status
        );
        const cards = [...state.cards, newCard];
        commit(kanbanCardActions.SET_CARDS, cards);
        resolve(newCard);
      });
    },
    DELETE_CARD({ state, rootState, commit }, card) {
      return new Promise(async (resolve) => {
        const boardId = rootState.kanban.selectedBoard;
        const cardId = state.selectedCard;

        const deletedCard = await DBConnector.kanbanBoardCards.delete(boardId,cardId);
        resolve(deletedCard);
;
        const index = state.cards.indexOf(state.selectedCard);
        state.cards.splice(index,1);

        commit(kanbanCardActions.SET_CARDS, state.cards);
        commit(kanbanCardActions.SET_SELECTED_CARD, null);

      });
    },
    TOGGLE_LABEL({ state, rootState, commit }, labelId) {
      console.log("TOGGLE_LABEL", labelId);
      return new Promise(async (resolve) => {
        const card = state.selectedCard;
        const labelExists = card.labels.indexOf(labelId);

        console.log(card.labels);
        if (labelExists >= 0) {
          card.labels.splice(labelExists, 1);
        } else {
          card.labels.push(labelId);
        }
        console.log(card.labels);
        const board = rootState.kanban.selectedBoard;
        await DBConnector.kanbanBoardCards.update(board, card);

        resolve();
      });
    },

    // CARDS
    async LOAD_COMMENTS({ state, rootState, commit }) {
      const boardId = rootState.kanban.selectedBoard._id;
      const cardId = state.selectedCard._id;

      const comments = await DBConnector.kanbanBoardCards.getCardComments(
        boardId,
        cardId
      );

      // Attach users
      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        console.log(rootState.projects.selectedProjectCollaborators);
        const user = rootState.projects.selectedProjectCollaborators.find(
          (u) => u._id == comment.ownerId
        );
        comment.user = user;

        comment.created = new Date(comment.created).toISOString().slice(0, 10); //.replace(/-/g,"");;
      }

      commit(kanbanCardActions.SET_COMMENTS, comments);
    },
    async CREATE_COMMENT({ state, rootState, commit }, text) {
      const boardId = rootState.kanban.selectedBoard._id;
      const cardId = state.selectedCard._id;

      const comment = await DBConnector.kanbanBoardCardComments.create(
        boardId,
        cardId,
        text
      );

      const user = rootState.projects.selectedProjectCollaborators.find(
        (u) => u._id == comment.ownerId
      );
      comment.user = user;

      comment.created = new Date(comment.created).toISOString().slice(0, 10); 

      const comments = [...state.selectedCardComments, comment];
      commit(kanbanCardActions.SET_COMMENTS, comments);
    },
    async DELETE_COMMENT({ state, rootState, commit }, comment) {
        const boardId = rootState.kanban.selectedBoard._id;
        const cardId = state.selectedCard._id;
  
        const deleted = await DBConnector.kanbanBoardCardComments.delete(
          boardId,
          cardId,
          comment._id
        );

        const index = state.selectedCardComments.indexOf(comment);
        state.selectedCardComments.splice(index,1);
        

        const comments = [...state.selectedCardComments];
        commit(kanbanCardActions.SET_COMMENTS, comments);
      },
  },
};

export default site;
