import DBConnector from "../../services/database/dbConnector";

export const kanbanActions = {
  SET_BOARDS: "SET_BOARDS",
  LOAD_BOARDS: "LOAD_BOARDS",
  SET_SELECTED_BOARD: "SET_SELECTED_BOARD",
  SET_MODAL_CREATE_BOARD: "SET_MODAL_CREATE_BOARD",
  CREATE_BOARD: "CREATE_BOARD",
  DELETE_BOARD: "DELETE_BOARD",
  SET_CARDS: "SET_CARDS",
};

const site = {
  state: {
    boards: [],
    selectedBoard: null,
    modalCreateBoard: false,

    cards: [],
  },
  mutations: {
    SET_BOARDS(state, boards) {
      state.boards = boards;
    },
    SET_SELECTED_BOARD(state, selectedBoard) {
      state.selectedBoard = selectedBoard;
    },
    SET_MODAL_CREATE_BOARD(state, modalCreateBoard) {
      state.modalCreateBoard = modalCreateBoard;
    },
    SET_CARDS(state, cards) {
      state.cards = cards;
    },
  },
  actions: {
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
    },
    CREATE_BOARD({ state, rootState, commit }, board) {
      return new Promise(async (resolve, reject) => {
        const projectId = rootState.projects.selectedProject._id;
        const title = board.title;
        const newBoard = await DBConnector.kanbanBoards.create(
          title,
          projectId
        );
        const boards = [...state.boards, newBoard];
        commit(kanbanActions.SET_BOARDS, boards);
        resolve(newBoard);
      });
    },
    DELETE_BOARD({ state, commit }, board) {
      return new Promise(async (resolve) => {
        const deletedBoard = await DBConnector.kanbanBoards.delete(board);
        const index = state.boards.indexOf(board);
        let updatedBoard = [...state.boards];
        updatedBoard.splice(index, 1);
        commit(kanbanActions.SET_BOARDS, updatedBoard);
        resolve(deletedBoard);
      });
    },
  },
};

export default site;
