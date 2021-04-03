<template>
  <!--
  <v-progress-linear v-model="progress" :color="getColor()" height="20">
    <strong>{{ Math.ceil(progress) }}%</strong>
  </v-progress-linear>
  -->

  <div id="progress-bar">
    <div
      id="progress-done"
      v-bind:style="{
        width: Math.ceil((board.cardsDone / totalCards) * 100) + '%',
      }"
    ></div>
    <div
      id="progress-todo"
      v-bind:style="{
        left: Math.ceil((board.cardsDone / totalCards) * 100) + '%',
        width: Math.ceil((board.cardsTodo / totalCards) * 100) + '%',
      }"
    ></div>
    <div
      id="progress-pending"
      v-bind:style="{
        left:
          Math.ceil(((board.cardsDone + board.cardsTodo) / totalCards) * 100) +
          '%',
        width: Math.ceil((board.cardsPending / totalCards) * 100) + '%',
      }"
    ></div>
    <div
      id="progress-progress"
      v-bind:style="{
        left:
          Math.ceil(
            ((board.cardsDone + board.cardsTodo + board.cardsPending) /
              totalCards) *
              100
          ) + '%',
        width: Math.ceil((board.cardsInProgress / totalCards) * 100) + '%',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["board"],
  data() {
    return {
      doneWidth: 0,
      todoLeft: 0,
      todoWidth: 0,
      pendingLeft: 0,
      pendingWidth: 0,
      inProgressLeft: 0,
      inProgressWidth: 0,
    };
  },
  methods: {

  },
  computed: {
    totalCards() {
      return (
        this.board.cardsTodo +
        this.board.cardsPending +
        this.board.cardsInProgress +
        this.board.cardsDone
      );
    },
    progress: {
      get() {
        return (this.board.cardsDone / this.totalCards) * 100 || 100;
      },
      set() {},
    },
    todoStyle() {
      const val = this.board.cardsTodo / this.totalCards;
      return {
        width: val,
        left: val,
      };
    },
    
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
  /*background-color: rgb(206, 206, 206);*/
  background-color: rgb(218, 218, 218);
  height: 100%;
}
#progress-pending {
  position: absolute;
  /*background-color: rgb(154, 154, 154); */
  background-color: rgb(182, 182, 182);
  height: 100%;
}
#progress-progress {
  position: absolute;
  /*background-color: rgb(131, 131, 131);*/
  /*background-color: rgb(205, 194, 95);*/
  background-color: rgb(113, 162, 247);

  height: 100%;
}
</style>