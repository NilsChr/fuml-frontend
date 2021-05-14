<template>
  <v-layout class="pa-3">
    <v-flex xs2 class="mr-3" @click="dialog = true">
      <v-btn color="error" outlined>Delete Project</v-btn>
    </v-flex>
    <div id="shadow" v-if="dialog"></div>

    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card style="border: 2px solid #ff5252">
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>
          This will permanently delete the project and all documents in it
        </v-card-text>
        <v-layout justify-center>
          <v-flex xs6>
            <v-text-field
              v-model="confirmProjectTitle"
              label="Enter project name"
              outlined
              dense
              hide-details
              :color="confirmColor"
              :disabled="deleting"
            >
            </v-text-field>
            <v-progress-linear
              class="mt-1"
              :active="deleting"
              indeterminate
              color="error"
            ></v-progress-linear>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" text :disabled="deleting">Cancel</v-btn>
          <v-btn
            @click="deleteProject"
            text
            :disabled="confirmProjectTitle != selectedProject.title || deleting"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import storeActions from "../../store/storeActions";
export default {
  data() {
    return {
      dialog: false,
      confirmProjectTitle: "",
      deleting: false,
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.confirmProjectTitle = "";
      this.deleting = false;
    },
    async deleteProject() {
      this.deleting = true;

      await this.$store.dispatch(
        storeActions.project.DELETE_PROJECT,
        this.selectedProject
      );
      this.deleting = false;
      this.$store.commit(storeActions.SET_SELECTED_PROJECT, null);
      this.dialog = false;
      this.$router.push("/dashboard").catch((e) => {});
    },
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
    confirmColor() {
      if (this.confirmProjectTitle == this.selectedProject.title)
        return "success";
      return "error";
    },
  },
};
</script>

<style scoped>
#shadow {
  position: absolute;
  width: 1000% !important;
  height: 1000% !important;
  left: -500px;
  top: -500px;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0);
}
</style> 