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

import DocumentsList from "../lists/documents/documentsList";
import EntityLayout from "./DocumentLayouts/EntityLayout";
import SequenceLayout from "./DocumentLayouts/SequenceLayout";
import TextLayout from "./DocumentLayouts/TextLayout";
import UmlImage from "../uml/UmlImage.vue";
import { documentTypes } from '../../store/modules/documents.store';

export default {
  name: "layout",
  components: {
    UmlImage,
    DocumentsList,
    EntityLayout,
    SequenceLayout,
    TextLayout
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
    selectedDocument() {
      return this.$store.state.documents.selectedDocument;
    },
    selectedEntity() {
      return this.$store.state.documentEntities.selectedEntity;
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
            case documentTypes.TEXT:
          return TextLayout;
      }
    },
  },
};
</script>

<style>
</style>