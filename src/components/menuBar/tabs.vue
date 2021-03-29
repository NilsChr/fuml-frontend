<template>
  <v-flex class="ml-5 pl-5">
    <v-tabs v-model="active_tab" v-if="selectedProject">
      <v-tab v-for="tab in tabs" :key="tab.id" @click="setState(tab.value)">
        {{ tab.name }}
      </v-tab>
    </v-tabs>
  </v-flex>
</template>

<script>
import { siteStates } from "../../store/modules/site.store";
import storeActions from "../../store/storeActions";
export default {
  data() {
    return {
      active_tab: 1,
      tabs: [
        { id: 1, name: "Settings", value: siteStates.PROJECT_SETTINGS },
        { id: 2, name: "Documents", value: siteStates.DOCUMENTS },
        { id: 3, name: "Board", value: siteStates.BOARD },
        { id: 4, name: "Chat", value: siteStates.CHAT },
      ],
    };
  },
  methods: {
    setState(value) {
      this.$store.commit(storeActions.site.SET_SITE_STATE, value);
    }
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    }
  }
};
</script>

<style>
</style>