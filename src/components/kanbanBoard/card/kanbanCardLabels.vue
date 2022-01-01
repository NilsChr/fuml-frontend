<template>
  <v-layout wrap>
    <v-flex xs12>
      <label><strong>LABELS</strong></label>
    </v-flex>
    <v-flex xs12>
      <v-btn
        class="ma-1"
        v-for="(label, i) in selectedCard.labels"
        :key="i"
        small
        depressed
        :color="getLabelColor(label)"
        dark
        >{{ getLabelTitle(label) }}</v-btn
      >
      <v-btn
        depressed
        color="grey lighten-3"
        small
        class="mr-2"
        @click="createLabel"
      >
        <v-icon size="20">add</v-icon>
      </v-btn>
    </v-flex>
    <kanban-create-label
      :dialog="createLabelDialog"
      v-on:close="_handleCloseCreateLabel"
    />
  </v-layout>
</template>

<script>
import kanbanCreateLabel from "../label/kanbanCreateLabel.vue";
export default {
  components: { kanbanCreateLabel },
  data() {
    return {
      createLabelDialog: false,
    };
  },
  methods: {
    createLabel() {
      this.createLabelDialog = true;
    },
    getLabel(id) {
      return this.selectedBoard.labels.find((l) => l._id === id);
    },
    getLabelColor(id) {
      return this.getLabel(id)?.color || "transparent";
    },
    getLabelTitle(id) {
      return this.getLabel(id)?.title || "";
    },
    _handleCloseCreateLabel() {
      this.createLabelDialog = false;
    },
  },
  computed: {
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
};
</script>

<style>
</style>