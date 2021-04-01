<template>
  <div style="width: 100%; height: 100%">
    <project-settings v-if="state == stateSettings()" />
    <layout v-if="state == stateDocuments()" />
    <kanban-layout v-if="state == stateBoard()" />
  </div>
</template>

<script>
import KanbanLayout from "../components/kanbanBoard/kanbanLayout.vue";
import Layout from "../components/layouts/Layout.vue";
import ProjectSettings from "../components/projects/projectSettingsLayout.vue";
import { siteStates } from "../store/modules/site.store";

export default {
  name: "dashboard",
  components: {
    Layout,
    ProjectSettings,
    KanbanLayout,
  },
  methods: {
    stateSettings() {
      return siteStates.PROJECT_SETTINGS;
    },
    stateDocuments() {
      return siteStates.DOCUMENTS;
    },
    stateBoard() {
      return siteStates.BOARD;
    },
  },
  computed: {
    state() {
      return this.$store.state.site.siteState;
    },
  },
  mounted() {},
  created() {},
};
</script>

<style>
</style>