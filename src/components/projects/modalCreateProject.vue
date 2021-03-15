<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>Create new project</v-card-title>
      <v-main class="pl-5 pr-5 pt-0">
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field label="Project title" v-model="projectTitle"></v-text-field>
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
            projectTitle: ''
        }
    },
    methods: {
        async closeDialog(save) {
            if(!save) {
                this.dialog = false;
                return;
            }

            if(this.projectTitle == '') return;
            let project = await this.$store.dispatch('CREATE_PROJECT',{title: this.projectTitle});
            this.dialog = false;
            this.$emit('created', project);
        }
    },
    computed: {
        dialog: {
            get() {
                return this.$store.state.projects.modalCreateProject;
            },
            set(val) {
                this.$store.commit(actions.SET_MODAL_CREATE_PROJECT, val);
            }
        }
    }
};
</script>

<style>
</style>