<template>
  <v-app>
    <v-app-bar app v-if="showAppBar" dark >
      <v-progress-linear
        v-if="networkCall"
        indeterminate
        style="position: absolute; top: 0; left: 0"
        height="2"
      ></v-progress-linear>

      <div class="d-flex align-center">
        <label
          style="font-family: 'Montserrat'; font-size: 26px; color: #639bff"
          ><strong>FU</strong>ml</label
        >
        <project-menu />

        <tabs v-if="showAppBarTabs" />
      </div>

      <v-spacer></v-spacer>
      <account />
    </v-app-bar>

    <v-main id="app-main" v-bind:style="{ maxHeight: appHeight + 'px', ...theme }">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Account from "./components/menuBar/account.vue";
import ProjectMenu from "./components/menuBar/projectMenu.vue";
import Tabs from "./components/menuBar/tabs.vue";
import globals from "./globals";
import themes from "./util/appThemes";

export default {
  name: "App",

  components: {
    ProjectMenu,
    Tabs,
    Account,
  },
  data: () => ({
    appHeight: 0,
  }),
  computed: {
    showAppBar() {
      return this.$store.state.site.showAppBar;
    },
    showAppBarTabs() {
      return this.$store.state.site.showAppBarTabs;
    },
    networkCall() {
      return this.$store.state.site.networkCallInProgress;
    },
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    theme() {
      let theme = this.currentUser?.selectedTheme || 2;
      return themes[theme-1].style;
    }
  },
  created() {
    let height = window.innerHeight;
    this.appHeight = height;
  },
};
</script>
<style>
body {
  overflow: hidden;
  max-height: 100vh;
  width: 100%;
}
#app-main {
  /*overflow: hidden; */
  /*background-color: #2b2b2b; */
}

#app-main * {
  max-height: 100%;
}
::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(180, 180, 180);
  border-radius: 5px;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}
.fill-height {
  height: 100%;
}
.selected {
  border-left: 5px solid rgb(102, 199, 102);
}
.bordered {
  border: 1px solid rgb(208, 208, 208);
  border-radius: 5px;
}
</style>
