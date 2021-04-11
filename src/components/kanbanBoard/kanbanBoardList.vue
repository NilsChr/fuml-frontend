<template>
  <v-card id="documents-list" class="pa-2 fill-height" style="max-height: 100%">
    <v-layout fill-height column>
      <v-flex xs1>
        <v-layout wrap>
          <v-flex xs10>
            <v-subheader>Boards</v-subheader>
          </v-flex>
          <v-flex xs2>
            <v-btn fab x-small text class="mt-1" @click="createBoard">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
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
              <v-list-item-subtitle class="pt-2">
                <kanban-board-progress-bar :board="board" class="mt-1" />
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-slide-x-transition>
              <v-list-item-action
                v-if="edit && currentUser._id == board.ownerId"
              >
                <v-btn
                  fab
                  x-small
                  text
                  class="mt-1"
                  @click="setEditBoard($event, board)"
                  ><v-icon color="grey darken-2">edit</v-icon></v-btn
                >
              </v-list-item-action>
            </v-slide-x-transition>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
    <kanban-board-list-edit
      :dialog="boardToEditDialog"
      :board="boardToEdit"
      @close="boardToEditDialog = false"
    />
  </v-card>
</template>

<script>
import storeActions from "../../store/storeActions";
import KanbanBoardModalCreate from "./kanbanBoardModalCreate.vue";
import KanbanBoardProgressBar from "./kanbanBoardProgressBar.vue";
import KanbanBoardListEdit from "./KanbanBoardListEdit.vue";

export default {
  components: {
    KanbanBoardModalCreate,
    KanbanBoardProgressBar,
    KanbanBoardListEdit,
  },
  data() {
    return {
      boardSearch: "",
      edit: false,

      boardToEdit: null,
      boardToEditDialog: false,
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
    setEditBoard(e, board) {
      e.stopPropagation();
      this.boardToEdit = board;
      this.boardToEditDialog = true;
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
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
};
</script>

<style scoped>
.selected {
  border-left: 5px solid rgb(102, 199, 102);
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