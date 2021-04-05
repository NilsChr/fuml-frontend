<template>
  <v-card id="sequence-list" class="pa-2" style="max-height: 100%">
    <v-layout fill-height column>
      <v-flex xs2>
        <v-list dense>
          <v-layout>
            <v-flex xs9>
              <v-subheader>Participants</v-subheader>
            </v-flex>
            <v-flex xs3>
              <v-btn fab x-small text class="mt-1" @click="addParticipant"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </v-flex>
          </v-layout>
          <draggable
            v-model="selectedDocument.participants"
            :disabled="editTitle"
            @change="update"
          >
            <template v-for="(participant, i) in selectedDocument.participants">
              <v-list-item
                dense
                :key="participant.id"
                class="drag-item pa-0 pl-2"
              >
                <v-list-item-content class="pa-0">
                  <v-list-item-title
                    v-on:dblclick="toggleEditTitle(i)"
                    v-if="!editTitle || editIndex != i"
                    v-html="participant.title"
                  ></v-list-item-title>
                  <v-text-field
                    v-if="editTitle && editIndex == i"
                    v-model="participant.title"
                    dense
                    hide-details
                    @change="toggleEditTitle(i)"
                    :id="`participant-${i}`"
                    @blur="toggleEditTitle(i)"
                  ></v-text-field>
                </v-list-item-content>
                <v-list-item-action @click="deleteParticipant(i)">
                  <v-icon size="12">mdi-close</v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>
          </draggable>
        </v-list>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="snackbarTimeout"
      top
    >
      {{ snackbarText }}
      <v-btn depressed text small dark @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import draggable from "vuedraggable";
import storeActions from "../../../store/storeActions";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      options: null,
      editTitle: false,
      editIndex: -1,
      titleBeforeEdit: "",
      snackbar: false,
      snackbarTimeout: 3000,
      snackbarColor: "error",
      snackbarText: "",
    };
  },
  methods: {
    addParticipant() {
      this.$store.dispatch(
        storeActions.documentSequence.ADD_PARTICIPANT_TO_SEQUENCE
      );
      this.update();
    },
    deleteParticipant(i) {
      this.selectedDocument.participants.splice(i, 1);
      this.update();
    },
    toggleEditTitle(index) {
      if (this.editTitle) {
        let errorMessage = "";

        const blankTitle =
          this.selectedDocument.participants[index].title == "";
        if (blankTitle) {
          errorMessage = "Title needs to be set.";
        }

        const hasSpaces =
          this.selectedDocument.participants[index].title.indexOf(" ") >= 0;
        if (hasSpaces) {
          errorMessage = "Title can not contain spaces.";
        }

        const newTitle = this.selectedDocument.participants[index].title;
        const exists = this.selectedDocument.participants.filter(
          (f, i) => i != index && f.title == newTitle
        );
        if (exists.length > 0) {
          errorMessage = "A participant with this name already exists.";
        }

        if (errorMessage != "") {
          this.selectedDocument.participants[
            index
          ].title = this.titleBeforeEdit;
          this.snackbar = true;
          this.snackbarText = errorMessage;
        }

        // Update code
        this.refactorAllCodeOnRename(
          this.titleBeforeEdit,
          this.selectedDocument.participants[index].title
        );

        this.editTitle = false;
        this.editIndex = -1;
        this.update();
        return;
      }
      this.titleBeforeEdit = this.selectedDocument.participants[index].title;
      this.editTitle = true;
      this.editIndex = index;
      let id = "participant-" + index;
      setTimeout(() => {
        let el = document.getElementById(id);
        el.focus();
      }, 1);
    },
    refactorAllCodeOnRename(prevParticipant, newParticipant) {
      this.selectedDocument.parts.forEach((part) => {
        let lines = part.code.split("\n");
        let newCode = "";
        lines.forEach((line) => {
          const match = line.match(/(\w+)->(\w+)(:?)(.*)/);

          if (match) {
            const e1 = match[1].replace(prevParticipant, newParticipant);
            const e2 = match[2].replace(prevParticipant, newParticipant);
            const comment = match[4] || "";

            if (comment) {
              newCode += e1 + "->" + e2 + ":" + comment;
            } else newCode += e1 + "->" + e2;
            newCode += "\n";
          }
        });
        part.code = newCode;
      });

      this.update();
    },
    update() {
      this.$store.dispatch("PARSE_UML");
      // this.selectedDocument = this.selectedDocument;
      this.$store.commit(
        storeActions.SET_SELECTED_DOCUMENT,
        this.selectedDocument
      );
    },
  },
  computed: {
    selectedDocument: {
      get() {
        return this.$store.state.documents.selectedDocument;
      },
      set(val) {
        this.$store.commit(storeActions.SET_SELECTED_DOCUMENT, val);
      },
    },
    img() {
      return this.$store.state.uml.url;
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
</style>