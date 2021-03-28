<template>
  <v-card id="card-entity-list" class="pa-2" style="max-height: 100%">
    <v-layout fill-height column>
      <v-flex xs1>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              label="Search"
              v-model="entitySearch"
              dense
              outlined
              :hide-details="true"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="New entity name"
              v-model="entityTitle"
              dense
              outlined
              :hide-details="true"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-btn block text color="primary" @click="createEntity"
              >Create</v-btn
            >
          </v-flex>
          <v-flex xs6>
            <v-btn block text color="warning" @click="editMode = !editMode"
              >Edit</v-btn
            >
          </v-flex>
          <v-flex xs12>
            <v-subheader>Entities</v-subheader>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs11 style="overflow: hidden" class="bordered">
        <v-list class="card-list" dense>
          <v-list-item
            dense
            v-for="entity in filteredDocuments"
            :key="entity.id"
            v-bind:class="{ selected: selectedEntity == entity }"
            @click.stop
            class="list-item"
          >
            <v-list-item-content @click="setSelectedEntity(entity)">
              <v-layout>
                <v-flex xs12>{{ entity.title }}</v-flex>
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
import entityFactory from "../../../services/factories/entity.factory";
import storeActions from "../../../store/storeActions";

export default {
  //props: ["document"],
  data() {
    return {
      entitySearch: "",
      entityTitle: "",
      editMode: false,
    };
  },
  methods: {
    createEntity() {
      if (this.entityTitle == "") return;
      const entity = entityFactory.createEntity(this.entityTitle);
      this.$store.dispatch(storeActions.CREATE_ENTITY, entity);
      this.entityTitle = "";
      this.update();
    },
    deleteEntity(entity) {
      let index = this.document.entities.indexOf(entity);
      this.document.entities.splice(index, 1);
      this.$store.commit(storeActions.SET_SELECTED_ENTITY, null);
      this.update();
    },
    setSelectedEntity(entity) {
      this.$store.commit(storeActions.SET_SELECTED_ENTITY, entity);
    },
    update() {
      this.$store.dispatch(storeActions.PARSE_UML);
    },
  },
  computed: {
    document() {
      return this.$store.state.documents.selectedDocument;
    },
    selectedEntity() {
      return this.$store.state.entities.selectedEntity;
    },
    filteredDocuments() {
      if (this.entitySearch == "") return this.document.entities;
      else
        return this.document.entities.filter((e) =>
          e.title.toLowerCase().includes(this.entitySearch.toLowerCase())
        );
    },
  },
};
</script>

<style scoped>
.selected {
  border-left: 10px solid rgb(102, 199, 102);
}

#card-entity-list {
  height: 100%;
}
.card-list {
  overflow-y: scroll;
}
.bordered {
  border: 1px solid rgb(208, 208, 208);
  border-radius: 5px;
}
</style>