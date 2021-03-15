<template>
  <v-container fluid class="pa-0 ma-0" fill-height>
    <v-layout class="pa-0 ma-0">
      <v-flex xs2 class="mr-1">
        <v-layout fill-height style="" column>
          <v-flex xs12>
            <entity-list :document="selectedDocument" />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs2 class="mr-1" v-if="selectedEntity">
        <v-layout fill-height style="" column>
          <v-flex xs12>
            <entity-editor :entity="selectedEntity" />
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex
        v-if="img"
        :xs8="selectedEntity != null"
        :xs10="selectedEntity == null"
      >
        <uml-image />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EntityEditor from "../../EntityEditor.vue";
import EntityList from "../../EntityList.vue";
import ProjectsList from "../../ProjectsList.vue";

import UmlImage from "../../UmlImage.vue";

export default {
  components: {
    ProjectsList,
    EntityList,
    EntityEditor,
    UmlImage,
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.projects.filter(
        (p) => p.id == this.$store.state.projects.selectedProject
      )[0];
    },
    selectedEntity() {
      return this.$store.state.entities.selectedEntity;
    },
    selectedDocument() {
      return this.$store.state.documents.selectedDocument;
    },
    img() {
      return this.$store.state.uml.url;
    },
  },
};
</script>

<style>
</style>