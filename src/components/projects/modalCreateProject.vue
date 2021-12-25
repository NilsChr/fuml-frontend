<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>Create new project</v-card-title>
      <v-main class="pl-5 pr-5 pt-0">
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              label="Project title"
              v-model="projectTitle"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 v-if="errorMessage == 'No plan active for this user.'" >
            <v-card color="error lighten-1" flat>
              <v-card-text>
                <strong>Oops</strong>
                <br/>
                You have reached your free limit of 3 projects.
                <br/>
                Add a plan to your account for unlimited projects and documents.
                <br/>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="toSubscribe" block color="white" depressed>
                  Subscribe now
                </v-btn>

              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-main>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="closeDialog(false)" text>Cancel</v-btn>

        <v-btn @click="closeDialog(true)" text color="primary">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import actions from "../../store/storeActions";

export default {
  data() {
    return {
      dialogCreateProject: false,
      projectTitle: "",
      errorMessage: "",
    };
  },
  methods: {
    async closeDialog(save) {
      if (!save) {
        this.dialog = false;
        return;
      }

      if (this.projectTitle == "") return;
      if (this.projectTitle.length > 32) return;
      let project = await this.$store.dispatch("CREATE_PROJECT", {
        title: this.projectTitle,
      });

      if (project?.status === "failed") {
        this.errorMessage = project.message;
        return;
      }

      this.dialog = false;
      this.$emit("created", project);
      this.projectTitle = "";
    },
    toSubscribe() {
      this.dialog = false;
      this.projectTitle = "";
      this.$router.push("/subscribe");
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.projects.modalCreateProject;
      },
      set(val) {
        this.errorMessage = '';
        this.projectTitle = '';
        this.$store.commit(actions.SET_MODAL_CREATE_PROJECT, val);
      },
    },
  },

};
</script>

<style>
</style>