<template>
  <v-dialog width="600" v-model="dialog" v-if="selectedCard">
    <v-card color="grey lighten-5">
      <v-layout column>
        <!-- TITLE -->
        <v-flex xs1 class="pa-5 pb-2">
          <v-layout justify-space-around>
            <v-icon>dashboard</v-icon>
            <v-text-field
              class="card-title pl-5"
              v-model="selectedCard.title"
              outlined
              hide-details
              dense
              v-bind:class="{ border: focusEdit == 'title' }"
              @change="updateCard"
              @click="setFocusEdit('title')"
              @blur="setFocusEdit(null)"
            ></v-text-field>
            <kanban-card-delete />
            <v-btn class="ml-5" fab text small @click="selectedCard = null">
              <v-icon>close</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>
        <!-- LABELS -->
        <v-flex xs1 class="pl-5 pb-4">
          <v-layout wrap>
            <v-flex xs8>
              <kanban-card-labels />
            </v-flex>
            <v-flex xs4>
              <kanban-card-members />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-divider class="pt-5"></v-divider>

        <!-- TEXT -->
        <v-flex xs5 class="pa-5 pt-0">
          <v-layout wrap>
            <v-flex xs12>
              <v-icon>subject</v-icon>
              <strong class="ml-5 pl-2">Description</strong>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    size="15"
                    class="ml-4"
                    v-bind="attrs"
                    v-on="on"
                    @click="openHelp"
                    >help</v-icon
                  >
                </template>
                <span>This editor uses markdown, click to learn more.</span>
              </v-tooltip>
            </v-flex>
            <v-flex xs12 class="pt-2">
              <Editor
                ref="editor"
                :mode="editMode"
                :render-config="renderConfig"
                v-model="description"
                :emoji="false"
                :image="false"
                placeholder="Add a more detailed description"
              />
            </v-flex>
            <v-flex xs12 class="pt-2 pl-5">
              <v-btn
                @click="setEditMode('editor')"
                v-if="editMode != 'editor'"
                depressed
                x-small
                color="warning lighten-2"
                >Edit</v-btn
              >
              <v-btn
                @click="updateDescription"
                v-if="editMode == 'editor'"
                depressed
                small
                color="success"
                :disabled="this.selectedCard.description == description"
                >Update descritpion</v-btn
              >
              <v-btn
                @click="cancelDescritpionEdit"
                class="ml-2"
                v-if="editMode == 'editor'"
                depressed
                small
                color="grey"
                >Cancel</v-btn
              >
              <kanban-card-document-link
                v-if="editMode == 'editor'"
                @created="_handleLinkCreated"
              />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-divider class="pb-5"></v-divider>

        <!-- COMMENTS -->
        <kanban-card-comments />
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import storeActions from "../../../store/storeActions";
import { Editor } from "vuetify-markdown-editor";
import KanbanCardComments from "./kanbanCardComments.vue";
import KanbanCardDelete from "./kanbanCardDelete.vue";
import KanbanCardDocumentLink from "./kanbanCardDocumentLink.vue";
import KanbanCardLabels from "./kanbanCardLabels.vue";
import KanbanCardMembers from './kanbanCardMembers.vue';

export default {
  components: {
    Editor,
    KanbanCardComments,
    KanbanCardDelete,
    KanbanCardDocumentLink,
    KanbanCardLabels,
    KanbanCardMembers,
  },
  data() {
    return {
      focusEdit: null,
      title: null,
      description: null,
      descriptionBeforeEdit: "",
      editMode: "editor",
      text: "",
      renderConfig: {
        mermaid: {
          theme: "dark",
        },
      },
    };
  },
  methods: {
    setFocusEdit(v) {
      this.focusEdit = v;
    },
    setData() {
      this.title = this.selectedCard?.title || "";
      this.description = this.selectedCard?.description || "";
      if (this.description == "") {
        this.editMode = "editor";
      } else this.editMode = "viewer";
    },
    updateTitle() {
      this.selectedCard.title = this.title;
      this.$store.dispatch(
        storeActions.kanbanCards.UPDATE_CARD,
        this.selectedCard._id
      );
    },
    updateDescription() {
      this.setEditMode("viewer");
      console.log(this.description);
      this.selectedCard.description = this.description;
      this.updateCard();
    },
    setEditMode(mode) {
      if (mode == "editor") {
        this.descriptionBeforeEdit = this.description;
      }
      this.editMode = mode;
      this.testMode = mode;
      console.log(this.editMode);
    },
    updateCard() {
      this.$store.dispatch(
        storeActions.kanbanCards.UPDATE_CARD,
        this.selectedCard._id
      );
    },
    cancelDescritpionEdit() {
      this.description = this.descriptionBeforeEdit;
      this.descriptionBeforeEdit = "";
      this.setEditMode("viewer");
    },
    openHelp() {
      const url =
        "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet";
      window.open(url, "_blank").focus();
    },
    _handleLinkCreated(link) {
      this.description = this.description + link;
    },
  },
  computed: {
    dialog: {
      get() {
        return this.selectedCard != null;
      },
      set() {
        this.$store.commit(storeActions.kanbanCards.SET_SELECTED_CARD, null);
      },
    },
    selectedCard: {
      get() {
        return this.$store.state.kanbanCards.selectedCard;
      },
      set(val) {
        this.$store.commit(storeActions.kanbanCards.SET_SELECTED_CARD, null);
      },
    },
    selectedBoard() {
      return this.$store.state.kanban.selectedBoard;
    },
  },
  watch: {
    selectedCard() {
      this.setData();
    },
  },
};
</script>

<style scoped>
.card-title {
  font-size: 25px;
  font-weight: bold;
}
.v-text-field--outlined >>> fieldset {
  border-color: transparent;
}
.border.v-text-field--outlined >>> fieldset {
  border-color: rgba(0, 0, 0, 0.475) !important;
  border-width: thin;
  background-color: white;
}
</style>
