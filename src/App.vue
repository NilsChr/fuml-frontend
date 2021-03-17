<template>
  <v-app>
    <v-app-bar app color="grey darken-4" dark>
      <div class="d-flex align-center">
        <label
          style="font-family: 'Montserrat'; font-size: 26px; color: #639bff"
          ><strong>FU</strong>ml</label
        >
        <project-menu />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main id="app-main" v-bind:style="{ maxHeight: appHeight + 'px' }">
      <EditorLayout4 />
    </v-main>
  </v-app>
</template>

<script>
import HelloEditor from "./components/HelloEditor";
import EditorLayout4 from "./components/layouts/EditorLayout4";

import ProjectMenu from "./components/menuBar/projectMenu.vue";

export default {
  name: "App",

  components: {
    HelloEditor,
    EditorLayout4,
    ProjectMenu,
  },

  data: () => ({
    appHeight: 0,
  }),
  created() {
    this.$store.dispatch("LOAD_PROJECTS");
    let height = window.innerHeight;
    this.appHeight = height;
    console.log("app height", height);
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
  overflow: hidden;
  background-color: #2b2b2b;
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
</style>
