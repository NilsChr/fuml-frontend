<template>
  <v-container fluid id="main-layout" fill-height>
    <v-layout>
      <!-- PROJECT COL -->
      <v-flex xs2 id="col-projects">
        <v-card class="full-height-col">
          <v-card-title>Projects</v-card-title>
        </v-card>
      </v-flex>
      <!-- CLASS COL -->
      <v-flex xs2 class="ml-1" id="col-entities">
        <v-card class="full-height-col pa-1" style="overflow:hidden;">
          <v-card-title>Entities</v-card-title>
          <v-container fill-height>
              <v-layout  column>
                  <v-flex xs12 style="background-color:red;">

                  </v-flex>
                  <!--
                  <v-flex xs5 style="overflow:hidden;">
             <v-list v-for="i in 52" :key="i">
                  <v-list-item>
                      <v-list-item-title>{{i}}</v-list-item-title>
                  </v-list-item>
              </v-list>
                  </v-flex>
                  -->
              </v-layout>
 
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs2 class="ml-1" id="col-entities-edit">
        <v-card class="full-height-col">
          <v-card-title>Edit</v-card-title>
        </v-card>
      </v-flex>

      <!-- VIEW -->
      <v-flex class="ml-1" id="col-uml">
        <v-card class="full-height-col">
          <v-card-title>Uml</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {},
  computed: {
    selectedProject() {
      return this.$store.state.projects.projects.filter(
        (p) => p.id == this.$store.state.projects.selectedProject
      )[0];
    },
    selectedEntity() {
      return this.$store.state.entities.selectedEntity;
    },
    img() {
      return this.$store.state.uml.url;
    },
  },
};
</script>

<style>
#main-layout {
  overflow-y: hidden !important;
}

#col-projects {
  background-color: green;
}
#col-entities {
  background-color: green;
}
#col-entities-edit {
  background-color: green;
}
#col-uml {
  background-color: green;
}
.full-height-col {
  height: 100%;
  max-height: 100%;
  min-height: 100%;
  overflow: hidden;
}
</style>