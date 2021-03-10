<template>
  <v-card id="card-project-list" class="pa-2" style="max-height: 100%">
    <v-layout fill-height column>
      <v-flex xs1>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              label="Search"
              v-model="projectSearch"
              dense
              outlined
              :hide-details="true"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="New project name"
              v-model="projectTitle"
              dense
              outlined
              :hide-details="true"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-btn text color="primary" @click="createProject">Create</v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn text color="warning" @click="editMode = !editMode"
              >Edit</v-btn
            >
          </v-flex>
          <v-flex xs12>
            <v-subheader>Projects</v-subheader>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs11 style="overflow: hidden" class="bordered">
        <v-list style="overflow-y: scroll">
          <v-list-item
            v-for="project in filteredProjects"
            :key="project.id"
            v-bind:class="{ selected: selectedProject == project.id }"
            style="min-height: 56px"
            @click.stop
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
      projectSearch: "",
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
    filteredProjects() {
      if (this.projectSearch == "") return this.projects;
      else
        return this.projects.filter((e) =>
          e.name.toLowerCase().includes(this.projectSearch.toLowerCase())
        );
    },
  },
};
</script>

<style scoped>
#card-project-list {
  height: 100%;
}
.selected {
  border-left: 10px solid rgb(102, 199, 102);
}
.bordered {
  border: 1px solid rgb(208, 208, 208);
  border-radius: 5px;
}
</style>