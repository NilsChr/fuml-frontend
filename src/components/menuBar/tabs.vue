<template>
  <v-flex class="ml-5 pl-5">
    <v-tabs v-model="active_tab" v-if="selectedProject">
      <v-tab v-for="tab in tabs" :key="tab.id" @click="setState(tab)">
        {{ tab.name }}
      </v-tab>
    </v-tabs>
  </v-flex>
</template>

<script>
import { siteStates } from "../../store/modules/site.store";
import storeActions from "../../store/storeActions";
import pageSettings from "../../util/pageSettings.util";
export default {
  data() {
    return {
      active_tab: 0,
      tabs: [
        { id: 2, name: "Documents", value: siteStates.DOCUMENTS },
        { id: 3, name: "Board", value: siteStates.BOARD },
        { id: 1, name: "Settings", value: siteStates.PROJECT_SETTINGS },
      ],
    };
  },
  methods: {
    setState(tab) {
      pageSettings.setTitle(tab.name);
      this.$store.commit(storeActions.site.SET_SITE_STATE, tab.value);
    },
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
  },
};
</script>

<style>
</style>