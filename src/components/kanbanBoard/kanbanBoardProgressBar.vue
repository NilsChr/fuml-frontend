<template>
  <div id="progress-bar">
    <div
      id="progress-done"
      v-bind:style="{
        width: Math.ceil((allDoneCards / totalCards) * 100) + '%',
      }"
    ></div>
    <div
      id="progress-todo"
      v-bind:style="{
        left: Math.ceil((allDoneCards / totalCards) * 100) + '%',
        width: Math.ceil((allTodoCards / totalCards) * 100) + '%',
      }"
    ></div>
    <div
      id="progress-pending"
      v-bind:style="{
        left:
          Math.ceil(((allDoneCards + allTodoCards) / totalCards) * 100) +
          '%',
        width: Math.ceil((allPendingCards / totalCards) * 100) + '%',
      }"
    ></div>
    <div
      id="progress-progress"
      v-bind:style="{
        left:
          Math.ceil(
            ((allDoneCards + allTodoCards + allPendingCards) /
              totalCards) *
              100
          ) + '%',
        width: Math.ceil((allInProgressCards / totalCards) * 100) + '%',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["board"],
  data() {
    return {
    };
  },
  methods: {},
  computed: {
    allBoardCards() {
      return this.$store.state.kanbanCards.cards.filter(
        (c) => !c.archived &&  c.boardId === this.board._id
      );
    },
    totalCards() {
      return this.$store.state.kanbanCards.cards.filter(
        (c) => !c.archived &&  c.boardId === this.board._id
      ).length;
    },
    allTodoCards() {
      return this.allBoardCards.filter((c) => c.status === 0).length;
    },
    allPendingCards() {
      return this.allBoardCards.filter((c) => c.status === 1).length;
    },
    allInProgressCards() {
      return this.allBoardCards.filter((c) => c.status === 2).length;
    },
    allDoneCards() {
      return this.allBoardCards.filter((c) => c.status === 3).length;
    },
    progress: {
      get() {
        return (this.allDoneCards / this.allBoardCards.length) * 100 || 100;
      },
      set() {},
    }
  },
};
</script>

<style>
#progress-bar {
  position: relative;
  overflow: hidden;
  height: 6px;
  border-radius: 1em;
}

#progress-done {
  position: absolute;
  background-color: rgb(102, 199, 102);
  left: 0px;
  height: 100%;
}

#progress-todo {
  position: absolute;
  background-color: rgb(218, 218, 218);
  height: 100%;
}
#progress-pending {
  position: absolute;
  background-color: rgb(182, 182, 182);
  height: 100%;
}
#progress-progress {
  position: absolute;
  background-color: rgb(113, 162, 247);
  height: 100%;
}
</style>