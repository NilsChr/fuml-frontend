<template>
  <v-layout fill-height class="pa-2" wrap>
    <v-flex xs12>
      <v-layout>
        <v-flex xs3>
          <v-text-field
            v-model="filterSearch"
            label="Search card"
            hide-details
            dense
            outlined
          >
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-layout>
        <v-flex xs3>
          <v-checkbox
            label="Only show my cards"
            dense
            class="mt-0"
            hide-details
            v-model="onlyUser"
          >
          </v-checkbox>
        </v-flex>
        <v-flex xs9>
            <v-btn text fab x-small @click="clearLabels">
                <v-icon size="15">clear</v-icon>
            </v-btn>
          <v-btn
            v-for="label in selectedBoard.labels"
            :key="label._id"
            depressed
            :color="getColor(label)"
            x-small
            dark
            @click="toggleLabel(label)"
            class="mr-1"
          >
            {{ label.title }}
            <v-icon
              class="pl-2"
              color="white"
              size="12"
              v-if="selectedLabels.includes(label._id)"
              >check</v-icon
            >
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import storeActions from "../../store/storeActions";
export default {
  data() {
    return {
    };
  },
  methods: {
      clearLabels() {
          
      this.$store.commit(
        storeActions.kanbanCards.SET_FILTER_LABELS,
        []
      );
      },
      getColor(label) {
          if(this.selectedLabels.length > 0 && !this.selectedLabels.includes(label._id)) return 'grey lightne-2'
          return label.color;
      },
    toggleLabel(label) {
      const index = this.selectedLabels.indexOf(label._id);

      if (index >= 0) {
        this.selectedLabels.splice(index, 1);
      } else {
        this.selectedLabels.push(label._id);
      }
      this.$store.commit(
        storeActions.kanbanCards.SET_FILTER_LABELS,
        this.selectedLabels
      );
    },
  },
  computed: {
    selectedBoard() {
      return this.$store.state.kanban.selectedBoard;
    },
    filterSearch: {
      get() {
        return this.$store.state.kanbanCards.filterSearch;
      },
      set(val) {
        this.$store.commit(storeActions.kanbanCards.SET_FILTER_SEARCH, val);
      },
    },
    onlyUser: {
      get() {
        return this.$store.state.kanbanCards.filterOnlyUser;
      },
      set(val) {
        this.$store.commit(storeActions.kanbanCards.SET_FILTER_ONLY_USER, val);
      },
    },
    selectedLabels() {
      return this.$store.state.kanbanCards.filterLabels;
    },
  },
};
</script>

<style>
</style>