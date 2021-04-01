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
import storeActions from '../../store/storeActions';
export default {
  data() {
    return {
      boardTitle: "",
    };
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
    }
  },
};
</script>

<style>
</style>