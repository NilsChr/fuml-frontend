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
            @mouseup="selectCard($event, item)"
            v-bind:class="{ ghost: item == dragItem }"
            class="ma-1 pa-2"
          >
            <v-layout wrap>
              <v-flex xs8 v-if="displayLabelTitle">
                <v-btn
                  @mouseup.stop="toggleLabelTitles($event)"
                  v-for="(label, i) in item.labels"
                  :key="i"
                  depressed
                  x-small
                  :color="getLabelColor(label)"
                  dark
                  class="mr-1"
                  >{{ getLabelTitle(label) }}</v-btn
                >
              </v-flex>
              <v-flex xs8 v-if="!displayLabelTitle">
                <v-btn
                  @mouseup.stop="toggleLabelTitles($event)"
                  v-for="(label, i) in item.labels"
                  :key="i"
                  depressed
                  x-small
                  :color="getLabelColor(label)"
                  style="max-height: 10px"
                  class="mr-1"
                ></v-btn>
              </v-flex>
              <v-flex xs4>
                <v-layout justify-end>
                  <v-avatar
                    v-for="(member, i) in item.assignees"
                    :key="i"
                    size="22"
                    class="cardMember"
                  >
                    <v-img :src="getMember(member).avatarUrl"> </v-img>
                  </v-avatar>
                </v-layout>
              </v-flex>
              <v-flex xs12 class="pt-2">
                {{ item.title }}
              </v-flex>
            </v-layout>
          </v-card>
        </v-scroll-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import storeActions from "../../../store/storeActions";
import KanbanAddNewCard from "../kanbanAddNewCard.vue";

export default {
  components: {
    KanbanAddNewCard,
  },
  data() {
    return {
      zones: [
        { id: 0, title: "ToDo" },
        { id: 1, title: "Pending" },
        { id: 2, title: "In Progress" },
        { id: 3, title: "Done" },
      ],
      dragItem: null,
      targetId: null,
      items: [
        { id: 1, status: 1 },
        { id: 2, status: 1 },
        { id: 3, status: 1 },
        { id: 4, status: 1 },
      ],
      displayLabelTitle: true,
    };
  },
  methods: {
    selectCard(ev, card) {
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
        storeActions.kanbanCards.UPDATE_CARD,
        this.dragItem._id
      );

      this.dragItem = null;
    },
    boardCards(zone) {
      let filteredCards = this.$store.state.kanbanCards.cards.filter(
        (c) => c.status === zone.id && c.boardId == this.selectedBoard._id
      );

      if (this.filterSearch != "") {
        filteredCards = filteredCards.filter((c) =>
          c.title.toLowerCase().includes(this.filterSearch.toLowerCase())
        );
      }

      if (this.filterOnlyUser) {
        filteredCards = filteredCards.filter(
          (c) => c.ownerId == this.currentUser._id
        );
      }

      if (this.filterLabels.length > 0) {
        filteredCards = filteredCards.filter(
          (c) =>
            c.labels.filter((label) => this.filterLabels.includes(label))
              .length > 0
        );
      }

      return filteredCards;
    },
    getLabel(id) {
      return this.selectedBoard.labels.find((l) => l._id == id);
    },
    getLabelColor(id) {
      return this.getLabel(id)?.color || "transparent";
    },
    getLabelTitle(id) {
      return this.getLabel(id)?.title || "";
    },
    toggleLabelTitles(ev) {
      ev.stopPropagation();
      this.displayLabelTitle = !this.displayLabelTitle;
    },
    getMember(id) {
      return this.projectMembers.find((m) => m._id == id);
    },
  },
  computed: {
    selectedBoard() {
      return this.$store.state.kanban.selectedBoard;
    },
    filterLabels() {
      return this.$store.state.kanbanCards.filterLabels;
    },
    filterSearch() {
      return this.$store.state.kanbanCards.filterSearch;
    },
    filterOnlyUser() {
      return this.$store.state.kanbanCards.filterOnlyUser;
    },
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    projectMembers() {
      return this.$store.state.projects.selectedProjectCollaborators;
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

.cardMember {
  border: 1px solid #fafafa;
  margin-left: -12px;
}
</style>