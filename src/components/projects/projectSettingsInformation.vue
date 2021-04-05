<template>
  <v-layout justify-center>
    <v-flex xs4>
      <strong> Project Information </strong>
    </v-flex>
    <v-flex xs4>
      <v-layout wrap v-if="selectedProject.ownerId == currentUser._id">
        <v-flex xs12><v-subheader><strong>Project Title</strong></v-subheader></v-flex>

        <!-- PROJECT TITLE -->
        <v-flex xs12>
          <project-settings-title />
          <project-settings-collaborator />

          <!--
          <v-text-field v-model="tempTitle" outlined dense></v-text-field>
          -->
        </v-flex>
      </v-layout>
      <v-layout v-if="selectedProject.ownerId != currentUser._id">
        <!--
          <v-btn   color="warning" small>
            Remove me from project
          </v-btn>
          -->
          <project-settings-remove-as-collaborator />
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import ProjectSettingsCollaborator from './projectSettingsCollaborator.vue';
import ProjectSettingsRemoveAsCollaborator from './projectSettingsRemoveAsCollaborator.vue';
import projectSettingsTitle from "./projectSettingsTitle.vue";

export default {
  components: { projectSettingsTitle, ProjectSettingsCollaborator, ProjectSettingsRemoveAsCollaborator },
  data() {
    return {};
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
    currentUser() {
      return this.$store.state.user.currentUser;
    }
  }
};
</script>

<style>
</style>