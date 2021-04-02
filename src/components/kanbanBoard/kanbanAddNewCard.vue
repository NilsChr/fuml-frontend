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
  ></v-text-field>
</template>

<script>
import storeActions from '../../store/storeActions';
export default {
  props: ["column"],
  data() {
    return {
      newCardTitle: "",
    };
  },
  methods: {
    async createCard() {
      if(this.newCardTitle == '') return;
      const payload = {
          title: this.newCardTitle,
          status: this.column.id
      }
      await this.$store.dispatch(storeActions.kanbanCards.CREATE_CARD, payload);
      this.newCardTitle = '';
    },
  },
};
</script>

<style>
</style>