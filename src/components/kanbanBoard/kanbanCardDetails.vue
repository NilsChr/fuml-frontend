<template>
  <v-dialog width="600" v-model="dialog" v-if="selectedCard">
    <v-card color="grey lighten-5">
      <v-layout column>
        <!-- TITLE -->
        <v-flex xs1 class="pa-5 pb-2">
          <v-layout justify-space-around>
            <v-icon>dashboard</v-icon>
            <v-text-field
              class="card-title pl-5"
              v-model="title"
              outlined
              hide-details
              dense
              v-bind:class="{ border: focusEdit == 'title' }"
              @click="setFocusEdit('title')"
              @blur="setFocusEdit(null)"
            ></v-text-field>
            <v-btn class="ml-5" fab text small @click="selectedCard = null">
              <v-icon>close</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>

        <!-- LABELS -->
        <v-flex xs1 class="pl-5 pb-4">
          <v-layout wrap>
            <v-flex xs12>
              <label><strong>LABELS</strong></label>
            </v-flex>
            <v-flex xs12>
              <v-btn depressed small class="mr-2" color="error"> BUG </v-btn>
              <v-btn
                depressed
                color="grey lighten-3"
                small
                class="mr-2"
                @click="createLabel"
              >
                <v-icon size="20">add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>

        <!-- TEXT -->
        <v-flex xs5 class="pa-5 pt-0">
          <v-layout wrap>
            <v-flex xs12>
              <v-icon>subject</v-icon>
              <strong class="ml-5 pl-2">Description</strong>
            </v-flex>
            <v-flex xs12 class="pt-2">
              <v-textarea
                filled
                no-resize
                hide-details
                outlined
                placeholder="Add a more detailed description..."
              >
              </v-textarea>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
    <kanban-create-label :dialog="createLabelDialog" v-on:close="_handleCloseCreateLabel" />
  </v-dialog>
</template>

<script>
import storeActions from "../../store/storeActions";
import kanbanCreateLabel from "./kanbanCreateLabel.vue";
export default {
  components: { kanbanCreateLabel },
  data() {
    return {
      focusEdit: null,
      title: null,
      description: null,
      createLabelDialog: false,
    };
  },
  methods: {
    setFocusEdit(v) {
      this.focusEdit = v;
    },
    setData() {
      this.title = this.selectedCard?.title || "";
      this.description = this.selectedCard?.description || "";
    },
    createLabel() {
      this.createLabelDialog = true;
     // this.$store.commit(storeActions.kanban.SET_DIALOG_CREATE_LABEL, true);
    },
    _handleCloseCreateLabel() {
      this.createLabelDialog = false;
    },
  },
  computed: {
    dialog: {
      get() {
        return this.selectedCard != null;
      },
      set() {
        //this.$store.commit(storeActions.kanbanCards.SET_DIALOG_CREATE_LABEL, false);

        this.$store.commit(storeActions.kanbanCards.SET_SELECTED_CARD, null);
      },
    },
    selectedCard: {
      get() {
        return this.$store.state.kanbanCards.selectedCard;
      },
      set(val) {
        this.$store.commit(storeActions.kanbanCards.SET_SELECTED_CARD, null);
      },
    },
  },
  watch: {
    selectedCard() {
      this.setData();
    },
  },
};
</script>

<style scoped>
.card-title {
  font-size: 25px;
  font-weight: bold;
}
.v-text-field--outlined >>> fieldset {
  border-color: transparent;
}
.border.v-text-field--outlined >>> fieldset {
  border-color: rgba(0, 0, 0, 0.475) !important;
  border-width: thin;
  background-color: white;
}
</style>