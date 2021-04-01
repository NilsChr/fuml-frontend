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
      <v-flex xs10>BOARD </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import kanbanBoardList from "./kanbanBoardList.vue";

export default {
  components: { kanbanBoardList },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
  },
};
</script>

<style>
</style>