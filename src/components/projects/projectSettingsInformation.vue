<template>
  <v-layout justify-center>
    <v-flex xs4>
      <strong> Project Information </strong>
    </v-flex>
    <v-flex xs4>
      <v-layout wrap>
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
    </v-flex>
  </v-layout>
</template>

<script>
import ProjectSettingsCollaborator from './projectSettingsCollaborator.vue';
import projectSettingsTitle from "./projectSettingsTitle.vue";
export default {
  components: { projectSettingsTitle, ProjectSettingsCollaborator },
  data() {
    return {};
  },
};
</script>

<style>
</style>