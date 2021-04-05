<template>
  <v-flex>
    <v-btn color="warning" small @click="dialog = true">
      Remove me from project
    </v-btn>
    <confirm-dialog
      :width="230"
      :dialog="dialog"
      message="This will remove you as a collaborator from the project"
      title="Confirm Delete"
      @yes="_handleDialogYes"
      @no="_handleDialogNo"
    />
  </v-flex>
</template>

<script>
import DBConnector from '../../services/database/dbConnector';
import storeActions from '../../store/storeActions';
import ConfirmDialog from "../common/confirmDialog.vue";
export default {
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    async _handleDialogYes() {
      this.dialog = false;
      await this.$store.dispatch(storeActions.project.REMOVE_CURRENTUSER_AS_COLLAB);
    },
    _handleDialogNo() {
      this.dialog = false;
    },
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
    currentUser() {
            return this.$store.state.user.currentUser;

    }
    
  }
};
</script>

<style>
</style>
