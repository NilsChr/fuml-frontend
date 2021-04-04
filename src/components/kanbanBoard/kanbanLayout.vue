<template>
  <v-container fill-height fluid>
    <v-layout style="">
      <v-flex xs2 class="mr-1">
        <v-layout fill-height style="" column>
          <v-flex xs12>
            <kanban-board-list />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs10>
        <v-layout fill-height v-if="selectedBoard">
          <v-flex xs12>
            <v-card class="fill-height pa-1" id="blue" :color="selectedBoard.backgroundColor">
              <v-layout column fill-height>
                <v-flex xs1 class="mb-1">
                  <v-card class="fill-height">
                    <!--
                    <v-layout fill-height>Status</v-layout>
                    -->
                    <kanban-board-status-bar />
                  </v-card>
                </v-flex>
                <v-flex xs11>
                  <kanban-cards />
                  <kanban-card-details />
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import kanbanBoardList from "./kanbanBoardList.vue";
import draggable from "vuedraggable";
import KanbanAddNewCard from "./kanbanAddNewCard.vue";
import KanbanCards from "./card/kanbanCards.vue";
import KanbanCardDetails from "./card/kanbanCardDetails.vue";
import KanbanBoardStatusBar from './kanbanBoardStatusBar.vue';

export default {
  components: {
    kanbanBoardList,
    draggable,
    KanbanAddNewCard,
    KanbanCards,
    KanbanCardDetails,
    KanbanBoardStatusBar,
  },
  data() {
    return {
      heldCard: null,
    };
  },
  methods: {
    boardCards(column) {
      const filteredCards = this.$store.state.kanbanCards.cards.filter(
        (c) => c.status === column.id
      );
      return filteredCards;
    },
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
    selectedBoard() {
      return this.$store.state.kanban.selectedBoard;
    },
    allCards() {
      return this.$store.state.kanbanCards.cards;
    },
  },
  data() {
    return {
      columns: [
        { id: 0, title: "To do" },
        { id: 1, title: "In Progress" },
        { id: 2, title: "Pending" },
        { id: 3, title: "Done" },
      ],
    };
  },
};
</script>

<style scoped>
#blue {
  background-color: #0079bf;
}

.bordered {
  border: 1px solid rgb(208, 208, 208);
  border-radius: 5px;
}

.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>
