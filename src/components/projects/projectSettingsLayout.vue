<template>
  <v-container fill-height fluid>
    <v-card style="width: 100%; height: 100%" v-if="selectedProject">
      <v-card-title>Settings</v-card-title>
      <v-container fill-height fluid>
        <v-layout column>
          <v-flex xs10>
            <project-settings-information />
          </v-flex>
          <v-divider></v-divider>
          <v-flex xs2 v-if="selectedProject.ownerId === currentUser._id">
            <project-settings-delete />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import ProjectSettingsDelete from "./projectSettingsDelete.vue";
import ProjectSettingsInformation from "./projectSettingsInformation.vue";
export default {
  components: {
    ProjectSettingsInformation,
    ProjectSettingsDelete,
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
    currentUser() {
      return this.$store.state.user.currentUser;
    }
  },
};
</script>

<style>
</style>
