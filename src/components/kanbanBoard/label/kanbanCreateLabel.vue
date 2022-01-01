<template>
  <v-dialog v-model="dialog" width="330" persistent>
    <v-card v-if="state === 'set'">
      <v-layout column>
        <v-flex xs1>
          <v-layout justify-space-between class="pa-2">
            <v-subheader class="text-xs-center">Labels</v-subheader>
            <v-icon @click="close">close</v-icon>
          </v-layout>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs1>
          <kanban-create-label-color-select
            v-for="(label, i) in selectedBoard.labels"
            :key="i"
            :label="label"
          />
          <v-layout class="pa-2">
            <v-flex xs12>
              <v-btn
                class="pa-2"
                block
                color="grey lighten-3"
                depressed
                @click="setState('create')"
                >Create a new label</v-btn
              >
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>

    <v-card v-if="state === 'create'">
      <v-layout column>
        <v-flex xs1>
          <v-layout justify-space-between class="pa-2">
            <v-icon @click="state = 'set'">chevron_left</v-icon>
            <v-subheader class="text-xs-center">Create a label</v-subheader>
            <v-icon @click="close">close</v-icon>
          </v-layout>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs1>
          <v-layout justify-space-between class="pa-2">
            <v-flex xs12>
              <v-text-field
                v-model="createTitle"
                hide-details
                outlined
                dense
                label="Name"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-start class="pa-2" wrap>
            <v-flex xs2 v-for="(color, i) in colors" :key="i" class="pa-2">
              <v-btn
                block
                depressed
                :color="color"
                small
                @click="createSelectedColor = color"
              >
                <v-icon
                  v-if="createSelectedColor === color"
                  color="white"
                  size="12"
                  >check</v-icon
                >
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout class="pa-2">
            <v-flex xs12>
              <v-btn
                class="pa-2"
                block
                color="grey lighten-3"
                depressed
                :disabled="createTitle === '' || !createSelectedColor"
                @click="postLabel"
                >Create a new label</v-btn
              >
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import storeActions from "../../../store/storeActions";
import KanbanCreateLabelColorSelect from "./kanbanCreateLabelColorSelect.vue";
export default {
  props: ["dialog"],
  components: {
    KanbanCreateLabelColorSelect,
  },
  data() {
    return {
      state: "set",
      colors: [
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
      createSelectedColor: null,
      createTitle: "",
    };
  },
  methods: {
    close() {
      this.createSelectedColor = null;
      this.createTitle = "";
      this.$emit("close");
    },
    setState(state) {
      this.state = state;
      this.createSelectedColor = null;
      this.createTitle = "";
    },
    async postLabel() {
      const label = {
        title: this.createTitle,
        color: this.createSelectedColor,
      };
      await this.$store.dispatch(storeActions.kanban.CREATE_LABEL, label);
      this.setState("set");
    },
  },
  computed: {
    selectedBoard() {
      return this.$store.state.kanban.selectedBoard;
    },
  }
};
</script>

<style>
</style>