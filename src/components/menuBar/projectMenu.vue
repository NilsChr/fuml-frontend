<template>
  <v-menu :nudge-width="50" v-model="menu" offset-y>
    <template v-slot:activator="{ on }">
      <v-layout class="ml-5">
        <v-flex xs12 class="ml-5">
          <v-toolbar-title v-on="on">
            <span style="font-size: 18px">{{ selectedProjectTitle }}</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </v-flex>
      </v-layout>
    </template>

    <v-list>
      <v-list-item @click.stop @click="openCreateProjectDialog">
        <v-list-item-title v-text="'Create New Project'"></v-list-item-title>
        <v-list-item-action>
          <modal-create-project v-on:created="handle_createdProject" />
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="project in projects"
        :key="project.id"
        @click="setSelectedProject(project)"
      >
        <v-list-item-title v-text="project.title"></v-list-item-title>
        <v-list-item-subtitle v-if="project.ownerId == currentUser._id">Owner</v-list-item-subtitle>
                <v-list-item-subtitle v-else>Collaorator</v-list-item-subtitle>

      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import ModalCreateProject from "../projects/modalCreateProject.vue";
import actions from "../../store/storeActions";

export default {
  components: {
    ModalCreateProject,
  },
  data() {
    return {
      menu: false,
      items: ["All", "Family", "Friends", "Coworkers"],
    };
  },
  methods: {
    setSelectedProject(project) {
      this.$store.dispatch(actions.LOAD_SELECTED_PROJECT, project);
      this.$router.replace({
        name: "dashboard",
        query: { projectId: project._id },
      }).catch((e) => {});
    },
    openCreateProjectDialog() {
      this.menu = false;
      this.$store.commit(actions.SET_MODAL_CREATE_PROJECT, true);
    },
    handle_createdProject(project) {
      this.$store.commit(actions.SET_SELECTED_PROJECT, project);
      this.menu = false;
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
    selectedProjectTitle() {
      if (!this.selectedProject) return "Select project";
      return this.selectedProject.title;
    },
    projects() {
      return this.$store.state.projects.projects;
    },
  },
};
</script>
<style>
</style>