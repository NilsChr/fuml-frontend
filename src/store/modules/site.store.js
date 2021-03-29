export const siteStates = {
  PROJECT_SETTINGS: 'PROJECT_SETTINGS',
  DOCUMENTS: "DOCUMENTS",
  BOARD: "BOARD",
  CHAT: "CHAT",
};

export const siteActions = {
  SET_SHOW_APP_BAR: 'SET_SHOW_APP_BAR',
  SET_SITE_STATE: 'SET_SITE_STATE'
}

const site = {
  state: {
    showAppBar: false,
    siteState: siteStates.DOCUMENTS,
  },
  mutations: {
    SET_SHOW_APP_BAR(state, showAppBar) {
      state.showAppBar = showAppBar;
    },
    SET_SITE_STATE(state, siteState) {
      state.siteState = siteState;
    },
  },
  actions: {},
};

export default site;
