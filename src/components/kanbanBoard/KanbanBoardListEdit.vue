<template>
  <v-dialog v-model="dialog" width="300" persistent>
    <v-card v-if="board">
      <v-card-title> Edit Board </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="title"
          label="Title"
          outlined
          hide-details
          dense
          :disabled="loading"
        >
        </v-text-field>
        <kanban-board-colors
          :selectedColor="selectedColor"
          @change="_handleColorChange"
        />
        <v-btn
          class="mt-4"
          color="error"
          block
          depressed
          small
          :disabled="loading"
          @click="deleteDialog = true"
        >
          Delete
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog(true)" depressed small :disabled="loading">
          Cancel
        </v-btn>
        <v-btn
          @click="_handleUpdate"
          :disabled="
            (title == board.title && selectedColor == originalColor) ||
            loading ||
            title == ''
          "
          color="warning"
          depressed
          small
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
    <confirm-dialog
      :dialog="deleteDialog"
      :width="190"
      title="Confirm Delete"
      @no="_handleDeleteDialogNo"
      @yes="_handleDeleteDialogYes"
    ></confirm-dialog>
  </v-dialog>
</template>

<script>
import DBConnector from "../../services/database/dbConnector";
import storeActions from "../../store/storeActions";
import ConfirmDialog from "../common/confirmDialog";
import KanbanBoardColors from "./kanbanBoardColors.vue";

export default {
  props: ["dialog", "board"],
  components: {
    ConfirmDialog,
    KanbanBoardColors,
  },
  data() {
    return {
      loading: false,
      title: "",
      selectedColor: "",
      originalColor: "",

      deleteDialog: false,
    };
  },
  methods: {
    closeDialog(revert) {
      this.title = "";
      if (revert) {
        this.board.backgroundColor = this.originalColor;
      }
      this.$emit("close");
    },
    async _handleUpdate() {
      this.loading = true;
      console.log("update");
      this.board.title = this.title;
      await DBConnector.kanbanBoards.update(this.board);
      this.loading = false;
      this.closeDialog(false);
    },
    _handleDeleteDialogNo() {
      this.deleteDialog = false;
    },
    _handleDeleteDialogYes() {
      this.$router
        .replace({
          name: "dashboard",
          query: {
            projectId: this.selectedProject._id,
          },
        })
        .catch((e) => {});
      this.$store.dispatch(storeActions.kanban.DELETE_BOARD, this.board);

      this.deleteDialog = false;
      this.closeDialog(false);
    },
    _handleColorChange(color) {
      this.selectedColor = color;
      this.board.backgroundColor = color;
    },
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.title = this.board.title;
        this.originalColor = this.board.backgroundColor;
        this.selectedColor = this.board.backgroundColor;
        console.log(this.selectedColor);
      }
    },
  },
};
</script>

<style>
</style>