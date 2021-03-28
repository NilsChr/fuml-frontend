<template>
  <v-container fill-height fluid>
    <v-layout style="">
      <v-flex xs2 class="mr-1">
        <v-layout fill-height style="" column>
          <v-flex xs12>
            <documents-list v-if="selectedProject != null" />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs10>
        <!-- Dynamic layout based on document type -->
        <component v-bind:is="getDocumentLayout"></component>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { documentTypes } from "../../services/factories/document.factory";
//import EntityEditor from "../EntityEditor.vue";
//import EntityList from "../EntityList.vue";
import DocumentsList from "../lists/documents/documentsList";
//import ProjectsList from "../ProjectsList.vue";
import EntityLayout from "./DocumentLayouts/EntityLayout";
import SequenceLayout from "./DocumentLayouts/SequenceLayout";

import UmlImage from "../uml/UmlImage.vue";

export default {
  name: "layout",
  components: {
    //    ProjectsList,
    //EntityList,
    //EntityEditor,
    UmlImage,
    DocumentsList,
    EntityLayout,
    SequenceLayout,
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
    selectedDocument() {
      return this.$store.state.documents.selectedDocument;
    },
    selectedEntity() {
      return this.$store.state.entities.selectedEntity;
    },
    img() {
      return this.$store.state.uml.url;
    },
    getDocumentLayout() {
      if (!this.selectedDocument) return null;
      switch (this.selectedDocument.type) {
        case documentTypes.ENTITY:
          return EntityLayout;
        case documentTypes.SEQUENCE:
          return SequenceLayout;
      }
    },
  },
};
</script>

<style>
</style>