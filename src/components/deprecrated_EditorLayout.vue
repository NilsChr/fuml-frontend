<template>
  <v-container fluid id="main-layout" fill-height>
    <v-layout>
      <!-- PROJECT COL -->
      <v-flex xs2>
        <ProjectList />
      </v-flex>
      <!-- CLASS COL -->
      <v-flex xs2 class="ml-1">
        <v-slide-x-transition>
          <EntityList
            v-if="selectedProject != null"
            :project="selectedProject"
          />
        </v-slide-x-transition>
      </v-flex>
      <v-slide-x-transition>
        <v-flex xs2 class="ml-1" v-if="selectedEntity != null">
          <EntityEditor :entity="selectedEntity" />
        </v-flex>
      </v-slide-x-transition>

      <!-- VIEW -->
      
      <v-flex
        class="ml-1"
        :xs6="selectedEntity != null"
        :xs8="selectedEntity == null"
      >         
        <v-card
          style="overflow: auto; max-height: 77%; min-height: 77%; padding: 50px"
          v-if="img"
        > 
          <v-img :src="img" contain v-bind:style="{ width: 100 + '% !important' }" /> 
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProjectList from "./deprecrated_ProjectsList.vue";
import EntityList from "./EntityList";
import EntityEditor from "./EntityEditor";

export default {
  components: {
    ProjectList,
    EntityList,
    EntityEditor,
  },
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
</style>