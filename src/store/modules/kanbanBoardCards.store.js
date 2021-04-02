import DBConnector from "../../services/database/dbConnector";
import storeActions from "../storeActions";

export const kanbanCardActions = {
  SET_CARDS: "SET_CARDS",
  SET_SELECTED_CARD: "SET_SELECTED_CARD",

  CREATE_CARD: "CREATE_CARD",
  UPDATE_CARD_STATUS: "UPDATE_CARD_STATUS",
  UPDATE_CARD: 'UPDATE_CARD',
  TOGGLE_LABEL: 'TOGGLE_LABEL',
};

const site = {
  state: {
    cards: [],
    selectedCard: null,
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
    },
    SET_SELECTED_CARD(state, selectedCard) {
      state.selectedCard = selectedCard;
    },
  },
  actions: {
    /*
    async LOAD_BOARDS({ commit }, boards) {
      console.log("Loading Cards");
      let cards = [];
      for (let i = 0; i < boards.length; i++) {
        const fetchCards = await DBConnector.kanbanBoards.getCards(
          boards[i]._id
        );
        console.log(fetchCards);
        cards = [...cards, ...fetchCards];
      }

      commit(kanbanActions.SET_CARDS, cards);
    },*/
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
    DELETE_CARD({ state, commit }, board) {
      return new Promise(async (resolve) => {
        /*
        const deletedBoard = await DBConnector.kanbanBoards.delete(board);
        const index = state.boards.indexOf(board);
        let updatedBoard = [...state.boards];
        updatedBoard.splice(index, 1);
        commit(kanbanActions.SET_BOARDS, updatedBoard);
        resolve(deletedBoard);
        */
      });
    },
    TOGGLE_LABEL({ state, rootState, commit }, labelId) {
        console.log('TOGGLE_LABEL', labelId)
      return new Promise(async (resolve) => {
          const card = state.selectedCard;
          const labelExists = card.labels.indexOf(labelId);

          console.log(card.labels);
          if(labelExists >= 0) {
              card.labels.splice(labelExists,1);
          } else {
              card.labels.push(labelId);
          }
          console.log(card.labels);
          const board = rootState.kanban.selectedBoard;    
          await DBConnector.kanbanBoardCards.update(board, card);

          resolve();
      });
    },
  },
};

export default site;
