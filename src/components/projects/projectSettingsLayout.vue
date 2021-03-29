<template>
  <v-container fill-height fluid>
    <v-card style="width: 100%; height: 100%" dark>
      <v-card-title>Settings</v-card-title>
      <v-container fill-height fluid>
        <v-layout column>
          <v-flex xs6>
            <project-settings-information />
          </v-flex>
          <v-divider></v-divider>
          <v-flex xs6> </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import ProjectSettingsInformation from './projectSettingsInformation.vue';
export default {

  components: {
    ProjectSettingsInformation
  }

};
</script>

<style>
</style>
