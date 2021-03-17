<template>
  <v-container fill-height fluid>
    <v-layout style="">
      <v-flex xs2 class="mr-1">
        <v-layout fill-height style="" column>
          <v-flex xs12>
            <!--
            <projects-list />
            
            <ProjectsTreeList />

            -->
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs2 class="mr-1">
        <v-layout fill-height style="" column>
          <v-flex xs12>
            <entity-list v-if="selectedProject" :project="selectedProject" />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs2 class="mr-1" v-if="selectedEntity">
        <v-layout fill-height style="" column>
          <v-flex xs12>
            <entity-editor :entity="selectedEntity" />
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex
        v-if="img"
        :xs6="selectedEntity != null"
        :xs8="selectedEntity == null"
      >
        <uml-image />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EntityEditor from "../EntityEditor.vue";
import EntityList from "../EntityList.vue";
//import ProjectsList from "../ProjectsList.vue";

import UmlImage from "../UmlImage.vue";

export default {
  components: {
   // ProjectsList,
    EntityList,
    EntityEditor,
    UmlImage,
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
</style>