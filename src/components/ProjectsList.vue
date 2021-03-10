<template>
  <v-card class="pa-1">
    <v-layout wrap class="pa-1">
      <v-flex xs12>
        <v-text-field
          label="Project name"
          v-model="projectTitle"
          dense
          outlined
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-btn text color="primary" @click="createProject">Create</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn text color="warning" @click="editMode = !editMode">Edit</v-btn>
      </v-flex>
      <v-divider></v-divider>
      <v-flex xs12>
        <v-list>
          <v-list-item
            v-for="project in projects"
            :key="project.id"
            v-bind:class="{ selected: selectedProject == project.id }"
            style="min-height: 56px"
          >
            <v-list-item-content @click="selectProject(project)" ripple>
              <v-list-item-title>{{ project.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-slide-x-transition>
                <v-btn
                  fab
                  color="error"
                  x-small
                  v-if="editMode"
                  @click="deleteProject(project)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-slide-x-transition>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      projectTitle: "",
      editMode: false,
    };
  },
  methods: {
    selectProject(project) {
      this.$store.commit("SET_SELECTED_PROJECT", project.id);
      this.update();
    },
    deleteProject(project) {
      this.$store.dispatch("DELETE_PROJECT", project);
    },
    createProject() {
      if (this.projectTitle == "") return;
      let project = {
        name: this.projectTitle,
        entities: [],
      };
      this.$store.dispatch("CREATE_PROJECT", project);
      this.projectTitle = "";
    },
        update() {
      this.$store.dispatch("PARSE_UML");
    },
  },
  computed: {
    projects() {
      return this.$store.state.projects.projects;
    },
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
  },
};
</script>

<style scoped>
.selected {
  border-left: 10px solid rgb(102, 199, 102);
}
</style>