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
  </v-card>
</template>

<script>
import draggable from "vuedraggable";
import sequenceFactory from "../../../services/factories/sequence.factory";
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
    };
  },
  methods: {
    addParticipant() {
      sequenceFactory.addParticipantToSequence();
      this.update();
    },
    deleteParticipant(i) {
      this.selectedDocument.participants.splice(i, 1);
      this.update();
    },
    toggleEditTitle(index) {
      if (this.editTitle) {
        if (this.selectedDocument.participants[index].title == "") {
          this.selectedDocument.participants[index].title = "untitled";
        }
       
       //if(this.selectedDocument.participants[index].title.indexOf(" ") > 0)
        //this.selectedDocument.participants[index].title = "\"" + this.selectedDocument.participants[index].title + "\"";

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
        part.code = part.code.replace(prevParticipant, newParticipant);
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