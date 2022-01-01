import globals from "../../globals";
import DBConnector from "../../services/database/dbConnector";
import cardUtil from "../../util/card.util";
import pageSettings from "../../util/pageSettings.util";
import storeActions from "../storeActions";

export const kanbanActions = {
  SET_BOARDS: "SET_BOARDS",
  LOAD_BOARDS: "LOAD_BOARDS",
  SET_SELECTED_BOARD: "SET_SELECTED_BOARD",
  SET_MODAL_CREATE_BOARD: "SET_MODAL_CREATE_BOARD",
  CREATE_BOARD: "CREATE_BOARD",
  DELETE_BOARD: "DELETE_BOARD",
  CREATE_LABEL: "CREATE_LABEL",
  UPDATE_LABEL: "UPDATE_LABEL",
  DELETE_LABEL: "DELETE_LABEL",
};

const site = {
  state: {
    boards: [],
    selectedBoard: null,
    modalCreateBoard: false,
  },
  mutations: {
    SET_BOARDS(state, boards) {
      state.boards = boards;
    },
    SET_SELECTED_BOARD(state, selectedBoard) {
      if(selectedBoard) {
        pageSettings.setTitle(selectedBoard.title);
      } else pageSettings.setTitle('');
      state.selectedBoard = selectedBoard;
    },
    SET_MODAL_CREATE_BOARD(state, modalCreateBoard) {
      state.modalCreateBoard = modalCreateBoard;
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
      commit(storeActions.kanbanCards.SET_CARDS, cards);
    },
    CREATE_BOARD({ state, rootState, commit }, board) {
      return new Promise(async (resolve, reject) => {
        const projectId = rootState.projects.selectedProject._id;
        const title = board.title;
        const backgroundColor = board.backgroundColor;
        const newBoard = await DBConnector.kanbanBoards.create(
          title,
          backgroundColor,
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
        commit(kanbanActions.SET_SELECTED_BOARD, null);

        resolve(deletedBoard);
      });
    },
    CREATE_LABEL({ state, commit }, label) {
      return new Promise(async (resolve) => {
        const selectedBoard = state.selectedBoard;

        const newLabel = {
          title: label.title,
          color: label.color,
        };
        const exists = selectedBoard.labels.find(
          (l) => l.title === newLabel.title && l.color === newLabel.color
        );

        if (!exists) {
          selectedBoard.labels.push(newLabel);

          const updatedBoard = await DBConnector.kanbanBoards.update(
            selectedBoard
          );
          //commit(storeActions.kanban.SET_SELECTED_BOARD, updatedBoard);
          selectedBoard.labels = updatedBoard.labels;
        }
        resolve();
      });
    },
    UPDATE_LABEL({ state, commit }, data) {
      return new Promise(async (resolve) => {
        const selectedBoard = state.selectedBoard;

        const oldLabel = data.old;
        const newLebelTitle = data.newLabelTitle;

        const exists = selectedBoard.labels.find(
          (l) => l.title === oldLabel.title && l.color === oldLabel.color
        );

        if (exists) {
          exists.title = newLebelTitle;
          await DBConnector.kanbanBoards.update(selectedBoard);
        }
        resolve();
      });
    },
    DELETE_LABEL({ state, commit, rootState }, label) {
      return new Promise(async (resolve) => {
        console.log(label);

        const selectedBoard = state.selectedBoard;
        console.log(selectedBoard);

        const el = selectedBoard.labels.find((l) => l._id === label._id);
        if (el) {
          const index = selectedBoard.labels.indexOf(el);
          selectedBoard.labels.splice(index, 1);
          await DBConnector.kanbanBoards.update(selectedBoard);
        }

        for (let i = 0; i < rootState.kanbanCards.cards.length; i++) {
          const card = rootState.kanbanCards.cards[i];

          cardUtil.removeLabelFromCard(card, label._id);
          await DBConnector.kanbanBoardCards.update(selectedBoard, card);
        }
        resolve();
      });
    },
  },
};

export default site;
