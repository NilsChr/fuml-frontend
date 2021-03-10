<template>
  <v-card id="card-entity-list" class="pa-1">
    <v-layout wrap class="pa-1">
      <v-flex xs12>
        <v-text-field
          label="Entity name"
          v-model="entityTitle"
          dense
          outlined
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-btn block text color="primary" @click="createEntity">Create</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn block text color="warning" @click="editMode = !editMode"
          >Edit</v-btn
        >
      </v-flex>
      <v-divider></v-divider>
      <v-flex xs12>
        <v-list style="max-height: 72%; overflow-y: auto">
          <v-list-item
            v-for="entity in project.entities"
            :key="entity.id"
            style="min-height: 56px"
            v-bind:class="{ selected: selectedEntity == entity }"
          >
            <v-list-item-content @click="setSelectedEntity(entity)">
              <v-layout>
                <v-flex xs12>{{ entity.name }}</v-flex>
              </v-layout>
            </v-list-item-content>
            <v-list-item-action>
              <v-slide-x-transition>
                <v-btn
                  fab
                  color="error"
                  x-small
                  v-if="editMode"
                  @click="deleteEntity(entity)"
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
import uniqid from "uniqid";

export default {
  props: ["project"],
  data() {
    return {
      entityTitle: "",
      editMode: false,
      /*selectedEntity: null,*/
    };
  },
  methods: {
    createEntity() {
      if (this.entityTitle == "") return;
      let entity = {
        id: uniqid(),
        name: this.entityTitle,
        properties: [],
        relations: [],
        body: "",
      };
      this.$store.dispatch("CREATE_ENTITY", entity);
      this.entityTitle = "";
      this.update();
    },
    deleteEntity(entity) {
      let index = this.project.entities.indexOf(entity);
      this.project.entities.splice(index, 1);
      this.$store.commit("SET_SELECTED_ENTITY", null);
      this.update();
    },
    setSelectedEntity(entity) {
      this.$store.commit("SET_SELECTED_ENTITY", entity);
    },
    update() {
      this.$store.dispatch("PARSE_UML");
    },
  },
  computed: {
    selectedEntity() {
      return this.$store.state.entities.selectedEntity;
    },
  },
};
</script>

<style scoped>
.selected {
  border-left: 10px solid rgb(102, 199, 102);
}

#card-entity-list {
  max-height: 77%;
  min-height: 77%;
  overflow-y: hidden;
}
</style>