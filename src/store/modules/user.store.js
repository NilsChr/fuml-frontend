export const userActions = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SET_CUSTOMER: 'SET_CUSTOMER',

}

const user = {
  state: {
    currentUser: false,
    customer: null
  },
  mutations: {
    SET_CURRENT_USER(state, currentUser) {
      state.currentUser = currentUser;
    },
    SET_CUSTOMER(state, customer) {
      state.customer = customer;
    },
  },
  actions: {},
};

export default user;
