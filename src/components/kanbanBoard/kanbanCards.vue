<template>
  <v-layout fill-height>
    <v-flex
      xs2
      v-for="zone in zones"
      :key="zone.id"
      :id="`drop-${zone.id}`"
      @drop="onDrop($event, zone)"
      class="mr-1"
      @dragover="allowDrop($event)"
      @dragenter="targetId = zone.id"
    >
      <v-card class="fill-height" color="grey lighten-5">
        <v-layout justify-space-between>
          <v-subheader>
            <strong>{{ zone.title }}</strong>
          </v-subheader>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn fab x-small text class="mt-1" v-on="on">
                <v-icon>more_horiz</v-icon>
              </v-btn>
            </template>

            <v-list dense class="pa-0">
              <v-list-item dense @click="archiveList(zone)">
                <v-list-item-title>Archive List</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-layout>
        <kanban-add-new-card :column="zone" />
        <v-divider class="mt-2 mb-2"></v-divider>
        <v-scroll-y-transition group>
          <v-card
            v-for="item in boardCards(zone)"
            :key="item._id"
            draggable=""
            @dragstart="dragStart($event, item)"
            @mouseup="selectCard($event,item)"
            v-bind:class="{ ghost: item == dragItem }"
            class="ma-1 pa-1"
          >
            {{ item.title }}
          </v-card>
        </v-scroll-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "../../store";
import storeActions from "../../store/storeActions";
import KanbanAddNewCard from "./kanbanAddNewCard.vue";

export default {
  components: {
    KanbanAddNewCard,
  },
  data() {
    return {
      zones: [
        { id: 1, title: "ToDo" },
        { id: 2, title: "Pending" },
        { id: 3, title: "In Progress" },
        { id: 4, title: "Done" },
      ],
      dragItem: null,
      targetId: null,
      items: [
        { id: 1, status: 1 },
        { id: 2, status: 1 },
        { id: 3, status: 1 },
        { id: 4, status: 1 },
      ],
    };
  },
  methods: {
    selectCard(ev,card) {
      this.$store.commit(storeActions.kanbanCards.SET_SELECTED_CARD, card);
    },
    archiveList(zone) {
      console.log("archiving zone", zone);
    },
    allowDrop(ev) {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move";
      this.dragItem.status = this.targetId;
    },
    dragStart(ev, item) {
      ev.dataTransfer.setData("text", ev.target.id);
      ev.dataTransfer.effectAllowed = "move";
      this.dragItem = item;
    },
    onDrop(ev, zone) {
      ev.dataTransfer.getData("text");

      const payload = {
        cardId: this.dragItem._id,
        newStatus: zone.id,
      };
      this.$store.dispatch(
        storeActions.kanbanCards.UPDATE_CARD_STATUS,
        payload
      );

      this.dragItem = null;
    },
    filteredItems(zone) {
      return this.items.filter((i) => i.status == zone.id);
    },
    boardCards(zone) {
      const filteredCards = this.$store.state.kanbanCards.cards.filter(
        (c) => c.status === zone.id && c.boardId == this.selectedBoard._id
      );
      return filteredCards;
    },
  },
  computed: {
    selectedBoard() {
      return this.$store.state.kanban.selectedBoard;
    },
  },
};
</script>

<style>
.dropZone {
  max-width: 100px;
  max-height: 100px;
  min-width: 100px;
  min-height: 100px;
  border: 1px solid black;
  background-color: rgb(53, 165, 70);
}

#dragger {
  min-width: 30px;
  min-height: 30px;
  max-width: 30px;
  max-height: 30px;
  border: 1px solid black;
  background-color: red;
}

.ghost {
  opacity: 1;
  background-color: rgb(240, 240, 240);
}
</style>