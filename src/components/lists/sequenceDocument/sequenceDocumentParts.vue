<template>
  <v-card id="sequence-list" class="pa-2" style="max-height: 100%">
    <v-layout fill-height column>
      <v-flex xs2>
        <v-layout>
          <v-flex xs9>
            <v-subheader>Parts</v-subheader>
          </v-flex>
          <v-flex xs3>
            <v-btn fab x-small text class="mt-1" @click="addPart"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </v-flex>
        </v-layout>

        <v-layout
          v-for="(part, i) in selectedDocument.parts"
          :key="`block-${i}`"
          wrap
          class="pl-1 pr-1"
        >
          <v-flex xs12>
            <sequence-document-parts-edit :part="part" :index="i" @deletePart="_handleDeletePart" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import storeActions from '../../../store/storeActions';
import SequenceDocumentPartsEdit from "./sequenceDocumentPartsEdit.vue";

export default {
  components: { SequenceDocumentPartsEdit },
  data() {
    return {
      options: null,
      editTitle: false,
      editIndex: -1,
    };
  },
  methods: {
    addPart() {
      this.$store.dispatch(storeActions.documentSequence.ADD_PART_TO_SEQUENCE);
    },
    toggleVisible(part, b) {
      part.visible = b;
      this.update();
    },
    toggleBlock(part, b) {
      part.block = b;
      this.update();
    },
    toggleEditorOpen(part, b) {
      part.editorOpen = b;
    },
    deleteParticipant(i) {
      this.selectedDocument.participants.splice(i, 1);
    },
    toggleEditTitle(index) {
      if (this.editTitle) {
        if (this.selectedDocument.parts[index].title === "") {
          this.selectedDocument.parts[index].title = "untitled";
        }
        this.editTitle = false;
        this.editIndex = -1;
        this.update();

        return;
      }
      this.editTitle = true;
      this.editIndex = index;

      let id = "part-" + index;

      setTimeout(() => {
        let el = document.getElementById(id);
        el.focus();
      }, 1);
      this.update();
    },
    update() {
      this.$store.dispatch("PARSE_UML");
    },
    _handleDeletePart(part) {
      console.log('DELETE', part)
      const index = this.selectedDocument.parts.indexOf(part);
      this.selectedDocument.parts.splice(index,1);
      this.update();
    }
  },
  computed: {
    selectedDocument() {
      return this.$store.state.documents.selectedDocument;
    },
    img() {
      return this.$store.state.uml.url;
    },
    participants() {
      return this.selectedDocument.participants.map((m) => {
        return m.title;
      });
    },
  },
};
</script>

<style scoped>
#sequence-list {
  height: 100%;
}

.drag-item {
  max-height: 25px !important;
  min-height: 25px !important;
}

.expansion-panel-content {
  padding: 0px !important;
}
</style>