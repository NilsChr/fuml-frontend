<template>
  <v-dialog v-model="dialog" width="300" persistent>
    <v-card v-if="document">
      <v-card-title> Edit Document </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="title"
          label="Title"
          outlined
          hide-details
          dense
          :disabled="loading"
        >
        </v-text-field>
        <v-btn
          class="mt-4"
          color="error"
          block
          depressed
          small
          :disabled="loading"
          @click="deleteDialog = true"
        >
          Delete
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog" depressed small :disabled="loading">
          Cancel
        </v-btn>
        <v-btn
          @click="_handleUpdate"
          :disabled="title == document.title || loading"
          color="warning"
          depressed
          small
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
    <confirm-dialog
      :dialog="deleteDialog"
      :width="190"
      title="Confirm Delete"
      @no="_handleDeleteDialogNo"
      @yes="_handleDeleteDialogYes"
    ></confirm-dialog>
  </v-dialog>
</template>

<script>
import DBConnector from "../../../services/database/dbConnector";
import storeActions from '../../../store/storeActions';
import ConfirmDialog from "../../common/confirmDialog.vue";
export default {
  props: ["dialog", "document"],
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      loading: false,
      title: "",

      deleteDialog: false,
    };
  },
  methods: {
    closeDialog() {
      this.title = "";
      this.$emit("close");
    },
    async _handleUpdate() {
      this.loading = true;
      console.log("update");
      this.document.title = this.title;
      await DBConnector.documents.update(this.document);
      this.loading = false;
    },
    _handleDeleteDialogNo() {
      this.deleteDialog = false;
    },
    _handleDeleteDialogYes() {
      this.$router
        .replace({
          name: "dashboard",
          query: {
            projectId: this.selectedProject._id,
          },
        })
        .catch((e) => {});
      this.$store.dispatch(storeActions.DELETE_DOCUMENT, this.document);
      this.deleteDialog = false;
            this.closeDialog();
    },
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.title = this.document.title;
      }
    },
  },
};
</script>

<style>
</style>