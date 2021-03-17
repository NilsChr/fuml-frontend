export const userActions = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',

}

const user = {
  state: {
    currentUser: false,
  },
  mutations: {
    SET_CURRENT_USER(state, currentUser) {
      state.currentUser = currentUser;
    },
  },
  actions: {},
};

export default user;
