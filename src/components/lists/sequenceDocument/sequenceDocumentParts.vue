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
            <v-layout justify-space-between>
              <v-flex xs4>
                <v-subheader
                  style="margin-top: -6px; font-weight: bold"
                  v-if="!editTitle || editIndex != i"
                  dense
                  v-html="part.title"
                  v-on:dblclick="toggleEditTitle(i)"
                  hide-details
                >
                </v-subheader>
                <v-text-field
                  v-if="editTitle && editIndex == i"
                  v-model="part.title"
                  dense
                  hide-details
                  @change="toggleEditTitle(i)"
                  :id="`part-${i}`"
                  @blur="toggleEditTitle(i)"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 dense>
                <v-icon
                  size="15"
                  v-if="part.visible"
                  @click="toggleVisible(part, false)"
                  >mdi-eye</v-icon
                >
                <v-icon
                  size="15"
                  v-if="!part.visible"
                  @click="toggleVisible(part, true)"
                  >mdi-eye-off</v-icon
                >
              </v-flex>
              <v-flex xs2 dense>
                <v-icon
                  size="15"
                  v-if="part.block"
                  @click="toggleBlock(part, false)"
                  >mdi-tab</v-icon
                >
                <v-icon
                  size="15"
                  v-if="!part.block"
                  @click="toggleBlock(part, true)"
                  >mdi-tab-unselected</v-icon
                >
              </v-flex>
              <v-flex xs2 dense>
                <v-icon
                  size="15"
                  v-if="part.editorOpen"
                  @click="toggleEditorOpen(part, false)"
                  >edit</v-icon
                >
                <v-icon
                  size="15"
                  v-if="!part.editorOpen"
                  @click="toggleEditorOpen(part, true)"
                  >edit_off</v-icon
                >
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 v-if="part.editorOpen">
            <v-textarea
              outlined
              no-resize
              auto-grow
              style="font-size: 12px; line-height: 1rem"
              v-model="part.code"
              @input="update"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import sequenceFactory from "../../../services/factories/sequence.factory";

export default {
  components: {},
  data() {
    return {
      options: null,
      editTitle: false,
      editIndex: -1,
    };
  },
  methods: {
    addPart() {
      sequenceFactory.addPartToSequence();

      console.log(this.selectedDocument);
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
        if (this.selectedDocument.parts[index].title == "") {
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

.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
.v-expansion-panels > div > div > div {
  padding: 0 !important;
}

.sequencePartContent {
}

.expansion-panel-content {
  padding: 0px !important;
}
</style>