<template>
  <v-card id="documents-list" class="pa-2 fill-height" style="max-height: 100%">
    <v-layout fill-height column>
      <v-flex xs1>
        <v-layout wrap>
          <v-flex xs10>
            <v-subheader>Boards</v-subheader>
          </v-flex>
          <v-flex xs2>
            <v-btn fab x-small text class="mt-1" @click="createBoard"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
            <!--
            <modal-create-b />
            -->
            <kanban-board-modal-create />
          </v-flex>

          <v-flex xs12>
            <v-layout>
              <v-flex xs10>
                <v-text-field
                  v-model="boardSearch"
                  dense
                  outlined
                  :hide-details="true"
                  label="Search"
                  clearable
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn
                  fab
                  x-small
                  text
                  class="mt-1"
                  @click="edit = !edit"
                  v-bind:class="{ edit: edit }"
                  ><v-icon>mdi-cog-outline</v-icon></v-btn
                >
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs11 style="overflow: hidden" class="bordered">
        <v-list class="card-list" dense>
          <v-list-item
            dense
            v-for="board in filteredBoards"
            :key="board.id"
            v-bind:class="{ selected: selectedBoard == board }"
            @click.stop
            class="list-item"
            two-line
            @click="setSelectedBoard(board)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ board.title }}</v-list-item-title>
              <v-list-item-subtitle>statusbar</v-list-item-subtitle>
            </v-list-item-content>
            <v-slide-x-transition>
              <v-list-item-action v-if="edit">
                <v-btn
                  fab
                  x-small
                  text
                  class="mt-1"
                  @click="deleteBoard($event, board)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </v-list-item-action>
            </v-slide-x-transition>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
    <confirm-dialog
      :dialog="deleteDialog"
      :width="190"
      title="Confirm Delete"
      @no="_handleDeleteDialogNo"
      @yes="_handleDeleteDialogYes"
    ></confirm-dialog>
  </v-card>
</template>

<script>
import Vue from "vue";
import storeActions from '../../store/storeActions';
import KanbanBoardModalCreate from './kanbanBoardModalCreate.vue';
//import storeActions from "../../../store/storeActions";
//import modalCreateDocument from "./modalCreateDocument.vue";
import ConfirmDialog from "../common/confirmDialog.vue";


export default {
  components: { KanbanBoardModalCreate,ConfirmDialog },
  data() {
    return {
      boardSearch: "",
      edit: false,
      deleteDialog: false,
      boardToDelete: null,
    };
  },
  methods: {
    createBoard() {
      this.$store.commit(storeActions.kanban.SET_MODAL_CREATE_BOARD, true);
    },
    setSelectedBoard(board) {
      this.$store.commit(storeActions.kanban.SET_SELECTED_BOARD, board);
      this.$router
        .replace({
          name: "dashboard",
          query: {
            projectId: this.selectedProject._id,
            boardId: this.selectedBoard._id,
          },
        })
        .catch((e) => {});

    },
    deleteBoard(e, board) {
      e.stopPropagation();
      this.deleteDialog = true;
      this.boardToDelete = board;
    },
    _handleDeleteDialogNo() {
      this.deleteDialog = false;
      this.boardToDelete = null;
    },
    _handleDeleteDialogYes() {
      // DELETE HERE
      this.$router
        .replace({
          name: "dashboard",
          query: {
            projectId: this.selectedProject._id,
          },
        })
        .catch((e) => {});
      this.$store.dispatch(storeActions.kanban.DELETE_BOARD, this.boardToDelete);
      this.deleteDialog = false;
      this.boardToDelete = null;
    },
  },
  computed: {
    projectBoards() {
      const projectId = this.$store.state.projects.selectedProject._id;
      return this.$store.state.kanban.boards.filter(
        (d) => d.projectId == projectId
      );
    },
    filteredBoards() {
      const boards = this.projectBoards;
      if (!this.boardSearch) return boards;
      if (this.boardSearch == "") return boards;
      return boards.filter((f) =>
        f.title.toLowerCase().includes(this.boardSearch.toLowerCase())
      );
    },
    selectedBoard() {
      return this.$store.state.kanban.selectedBoard;
    },
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
  },
};
</script>

<style scoped>
.selected {
  border-left: 10px solid rgb(102, 199, 102);
}
.bordered {
  border: 1px solid rgb(208, 208, 208);
  border-radius: 5px;
}
.list-item {
  max-height: 20px;
  border-bottom: 1px solid rgb(177, 177, 177);
  border-top: 1px solid rgb(218, 218, 218);
}

.edit {
  transform: rotate(90deg);
}
</style>