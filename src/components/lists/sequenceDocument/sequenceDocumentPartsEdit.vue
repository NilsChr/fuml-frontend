<template>
  <v-layout justify-space-between wrap>
    <v-flex xs9>
      <v-subheader
        style="margin-top: -6px; font-weight: bold"
        v-if="!editTitle || editIndex != index"
        dense
        v-html="part.title"
        v-on:dblclick="toggleEditTitle(index)"
        hide-details
      >
      </v-subheader>
      <v-text-field
        v-if="editTitle && editIndex == index"
        v-model="part.title"
        dense
        hide-details
        @change="toggleEditTitle(index)"
        :id="`part-${index}`"
        @blur="toggleEditTitle(index)"
      ></v-text-field>
    </v-flex>
    <v-flex xs1 dense>
      <v-icon size="15" v-if="part.visible" @click="toggleVisible(part, false)"
        >mdi-eye</v-icon
      >
      <v-icon size="15" v-if="!part.visible" @click="toggleVisible(part, true)"
        >mdi-eye-off</v-icon
      >
    </v-flex>
    <v-flex xs1 dense>
      <v-icon size="15" v-if="part.block" @click="toggleBlock(part, false)"
        >mdi-tab</v-icon
      >
      <v-icon size="15" v-if="!part.block" @click="toggleBlock(part, true)"
        >mdi-tab-unselected</v-icon
      >
    </v-flex>
    <v-flex xs1 dense>
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
    <v-flex xs12 v-if="part.editorOpen">
      <v-textarea
        outlined
        no-resize
        auto-grow
        style="font-size: 12px; line-height: 1rem"
        v-model="part.code"
        @input="update"
        :error-messages="errorMessages"
      ></v-textarea>
    </v-flex>
  </v-layout>
</template>

<script>
import storeActions from "../../../store/storeActions";
export default {
  props: ["part", "index"],
  data() {
    return {
      editTitle: false,
      errorMessages: [],
    };
  },
  methods: {
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
    toggleEditTitle() {
      if (this.editTitle) {
        if (this.part.title == "") {
          this.part.title = "untitled";
        }
        this.editTitle = false;
        this.editIndex = -1;
        this.update();

        return;
      }
      this.editTitle = true;
      this.editIndex = this.index;

      let id = "part-" + this.index;
      setTimeout(() => {
        let el = document.getElementById(id);
        el.focus();
      }, 1);
      this.update();
    },
    update() {
      if(!this.verifyInput()) return;
      this.$store.dispatch("PARSE_UML");
    },
    verifyInput() {
      let lines = this.part.code.split("\n");
      let errors = [];
      for (let i = 0; i < lines.length; i++) {
        if (lines[i] == "") continue;
        let regPairs = /(\w+)->(\w+)/;
        let matchPairs = lines[i].match(regPairs);
        if (!matchPairs) {
          errors.push("No entity pair on line " + (i+1));
          continue;
        }
        let p1 = matchPairs[1];
        let p2 = matchPairs[2];
        let comment = null;

        if (!this.participants.includes(p1)) {
          errors.push(p1 + " is not a defined entity on line " + (i+1));
        }
        if (!this.participants.includes(p2)) {
          errors.push(p2 + " is not a defined entity on line " + (i+1));
        }

        let regComment = /\w+->\w+:(.*)/;
        let matchComment = lines[i].match(regComment);

        if (matchComment != null) {
          comment = matchComment[1];
        }
      }

      this.errorMessages = errors;
      return errors.length == 0;
    },
  },
  computed: {
    selectedDocument() {
      return this.$store.state.documents.selectedDocument;
    },
    editIndex: {
      get() {
        return this.$store.state.documentSequence.editIndex;
      },
      set() {
        this.$store.commit(storeActions.SET_EDIT_INDEX, this.index);
      },
    },
    participants() {
      return this.selectedDocument.participants.map((m) => {
        return m.title;
      });
    },
  },
};
</script>

<style>
</style>