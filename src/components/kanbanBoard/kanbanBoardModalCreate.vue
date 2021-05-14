<template>
  <v-dialog v-model="dialog" max-width="300">
    <v-card>
      <v-card-title>Create new board</v-card-title>
      <v-main class="pl-5 pr-5 pt-0">
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              label="Board title"
              v-model="boardTitle"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-btn
              dark
              :color="c"
              v-for="(c, i) in colors"
              :key="i"
              class="ma-1"
              small
              @click="color = c"
            >
              <v-icon color="grey lighten-2" v-if="color == c" size="17">check</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-main>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog(false)" text>Cancel</v-btn>
        <v-btn @click="closeDialog(true)" text color="primary">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import storeActions from "../../store/storeActions";
import VSwatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.css";

export default {
  data() {
    return {
      boardTitle: "",
      color: "#fff",
      colors: [
        "rgba(0,0,0,0)",
        "#fff",
        "#61bd4f",
        "#f2d600",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
        "#00c2e0",
        "#51e898",
        "#ff78cb",
        "#344563",
      ],
    };
  },
  components: {
    VSwatches,
  },
  methods: {
    async closeDialog(save) {
      if (!save) {
        this.dialog = false;
        return;
      }

      if (this.boardTitle == "") return;
      const payload = {
        title: this.boardTitle,
        backgroundColor: this.color
      };
      const newBoard = await this.$store.dispatch(
        storeActions.kanban.CREATE_BOARD,
        payload
      );
      this.dialog = false;
      console.log("dialog", this.dialog);
      this.$emit("created", newBoard);
    },
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.kanban.modalCreateBoard;
      },
      set(val) {
        this.$store.commit(storeActions.kanban.SET_MODAL_CREATE_BOARD, val);
      },
    },
  },
};
</script>

<style>
.vue-swatches__container {
  z-index: 10 !important;
  position: absolute;
}
</style>