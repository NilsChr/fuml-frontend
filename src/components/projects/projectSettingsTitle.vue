<template>
  <v-layout>
    <v-flex xs8 class="mr-2">
      <v-text-field
        v-model="tempTitle"
        outlined
        dense
        :loading="loading"
      ></v-text-field>
    </v-flex>
    <v-flex
      xs2
      class="mr-3"
      v-if="tempTitle != selectedProject.title"
      @click="save"
    >
      <v-btn color="warning" outlined>Save</v-btn>
    </v-flex>
    <v-flex
      xs2
      class="mr-2"
      v-if="tempTitle != selectedProject.title"
      @click="cancel"
    >
      <v-btn>Cancel</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import storeActions from "../../store/storeActions";
export default {
  data() {
    return {
      tempTitle: "",
      loading: false,
    };
  },
  methods: {
    async save() {
      if (this.tempTitle == "") return;
      this.tempTitle = this.tempTitle.trim();

      this.loading = true;

      await this.$store.dispatch(
        storeActions.project.UPDATE_PROJECT_TITLE,
        this.tempTitle
      );

      this.loading = false;
    },
    cancel() {
      this.setTempTitle();
    },
    setTempTitle() {
      if (!this.selectedProject) {
        this.tempTitle = "";
        return;
      }
      this.tempTitle = this.selectedProject.title;
    },
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
  },
  watch: {
    selectedProject() {
      this.setTempTitle();
    },
  },
  mounted() {
    this.setTempTitle();
  },
};
</script>

<style>
</style>