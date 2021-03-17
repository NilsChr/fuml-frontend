<template>
  <v-container fluid class="pa-0 ma-0" fill-height>
    <v-layout class="pa-0 ma-0">
      <v-flex xs2 class="mr-1">
        <sequence-document />
      </v-flex>
      <v-flex xs2 class="mr-1">
        <sequence-document-parts />
      </v-flex>
      <!--
      SEQUENCE
      {{ selectedDocument }}
      -->
      <!--
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
      -->

      <v-flex v-if="img" :xs10="selectedDocument == null">
        <uml-image />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SequenceDocument from "../../lists/sequenceDocument/sequenceDocument.vue";
import SequenceDocumentParts from '../../lists/sequenceDocument/sequenceDocumentParts.vue';
import UmlImage from "../../uml/UmlImage.vue";

export default {
  components: {
    UmlImage,
    SequenceDocument,
    SequenceDocumentParts,
  },
  computed: {
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