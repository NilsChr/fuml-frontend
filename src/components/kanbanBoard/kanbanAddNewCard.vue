<template>
  <v-text-field
    v-model="newCardTitle"
    label="Add new card"
    solo
    hide-details
    dense
    class="pl-1 pr-1"
    append-icon="add"
    @click:append="createCard"
    @keydown.enter="createCard"
  ></v-text-field>
</template>

<script>
import storeActions from "../../store/storeActions";
export default {
  props: ["column"],
  data() {
    return {
      newCardTitle: "",
    };
  },
  methods: {
    async createCard() {
      if (this.newCardTitle === "") return;
      const payload = {
        title: this.newCardTitle,
        status: this.column.id,
      };
      this.newCardTitle = "";
      await this.$store.dispatch(storeActions.kanbanCards.CREATE_CARD, payload);
    },
  },
};
</script>

<style>
</style>