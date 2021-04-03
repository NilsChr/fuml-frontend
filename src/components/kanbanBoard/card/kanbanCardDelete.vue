<template>
  <v-btn class="ml-5" fab text small @click="deleteDialog = true">
    <v-icon color="grey darken-1">mdi-delete</v-icon>
    <confirm-dialog
      :dialog="deleteDialog"
      :width="190"
      title="Confirm Delete"
      @no="_handleDeleteDialogNo"
      @yes="_handleDeleteDialogYes"
    ></confirm-dialog>
  </v-btn>
</template>

<script>
import storeActions from "../../../store/storeActions";
import ConfirmDialog from "../../common/confirmDialog.vue";
export default {
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      deleteDialog: false,
    };
  },
  methods: {
    _handleDeleteDialogNo() {
      this.deleteDialog = false;
    },
    async _handleDeleteDialogYes() {
      await this.$store.dispatch(
        storeActions.kanbanCards.DELETE_CARD,
        this.selectedCard
      );
      this.deleteDialog = false;
    },
  },
  computed: {
    selectedCard() {
      return this.$store.state.kanbanCards.selectedCard;
    },
  },
};
</script>

<style>
</style>
