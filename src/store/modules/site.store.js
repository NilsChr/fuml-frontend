export const siteStates = {
  PROJECT_SETTINGS: 'PROJECT_SETTINGS',
  DOCUMENTS: "DOCUMENTS",
  BOARD: "BOARD",
  CHAT: "CHAT",
};

export const siteActions = {
  SET_SHOW_APP_BAR: 'SET_SHOW_APP_BAR',
  SET_SITE_STATE: 'SET_SITE_STATE',
  SET_NETWORK_CALL: 'SET_NETWORK_CALL'
}

const site = {
  state: {
    showAppBar: false,
    siteState: siteStates.DOCUMENTS,
    networkCallInProgress: false
  },
  mutations: {
    SET_SHOW_APP_BAR(state, showAppBar) {
      state.showAppBar = showAppBar;
    },
    SET_SITE_STATE(state, siteState) {
      state.siteState = siteState;
    },
    SET_NETWORK_CALL(state, networkCall) {
      state.networkCallInProgress = networkCall;
    }
  },
  actions: {},
};

export default site;
