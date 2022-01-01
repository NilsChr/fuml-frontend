<template>
  <v-layout justify-space-between class="pa-2 pb-0">
    <v-flex xs10>
      <v-btn
        dark
        block
        depressed
        :color="label.color"
        small
        @click="selectLabel"
      >
        {{ label.title }}
        <v-icon right size="12" v-if="hasLabel">check</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs2>
      <v-menu v-model="menu" offset-x :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn text small v-on="on">
            <v-icon size="18">edit</v-icon>
          </v-btn>
        </template>
        <v-card class="pa-2">
          <v-subheader>Edit label</v-subheader>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="tempTitle" outlined hide-details dense>
              </v-text-field>
            </v-flex>

            <v-flex xs12 class="pt-2">
              <v-btn
                block
                depressed
                small
                color="success"
                :disabled="tempTitle === label.title"
                @click="updateLabel"
              >
                Update
              </v-btn>
            </v-flex>
            <v-flex xs12 class="pt-5">
              <v-btn block depressed small @click="deleteLabel"> Delete </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
import storeActions from "../../../store/storeActions";
export default {
  props: ["label"],
  data() {
    return {
      menu: false,
      tempTitle: ""
    };
  },
  methods: {
    async selectLabel() {
      await this.$store.dispatch(
        storeActions.kanbanCards.TOGGLE_LABEL,
        this.label._id
      );
    },
    async updateLabel() {
      const data = {
        old: this.label,
        newLabelTitle: this.tempTitle,
      };
      await this.$store.dispatch(storeActions.kanban.UPDATE_LABEL, data);
      this.menu = false;
    },
    async deleteLabel() {
      await this.$store.dispatch(storeActions.kanban.DELETE_LABEL, this.label);
      this.menu = false;
    },
  },
  computed: {
    hasLabel() {
      return this.$store.state.kanbanCards.selectedCard.labels.includes(
        this.label._id
      );
    },
  },
  watch: {
    menu() {
      if (this.menu) {
        this.tempTitle = this.label.title;
      }
    },
  },
};
</script>

<style>
</style>