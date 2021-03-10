<template>
  <v-card id="card-entity-editor" class="pa-1">
    <v-layout wrap class="pa-1">
      <v-btn fab text absolute right x-small @click="close"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <!--
      <v-flex xs12>
        <v-textarea v-model="entity.body" @input="update"></v-textarea>
      </v-flex>
      -->
      <!-- SET ENTITY -->
      <v-flex xs12 class="pt-5">
        <v-layout wrap justify-space-around class="pt-5">
          <v-flex xs12>
            <v-text-field
              label="prop"
              dense
              v-model="newPropTitle"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="type"
              dense
              v-model="newPropType"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-btn block color="primary lighten-2" @click="addProperty" x-small
              >Add Property</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- SET RELATIONS -->
      <v-flex xs12 class="pt-5">
        <v-layout wrap justify-space-around class="pt-5">
          <v-select
            label="has"
            :items="relationTypes"
            v-model="selectedRelationShipType"
            item-text="text"
            item-value="value"
            dense
          ></v-select>
          <v-select
            label="entity"
            v-model="selectedRelationShipEntity"
            :items="entityNames"
            dense
          ></v-select>
          <v-flex xs12>
            <v-btn
              block
              color="primary lighten-2"
              @click="addRelationship"
              x-small
              >Add Relationship</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>

      <!-- ENTITY LIST -->
      <v-flex xs12>
        <v-list>
                          <v-subheader>Properties</v-subheader>

          <v-list-item
            v-for="(prop, index) in entity.properties"
            :key="`${index}-prop`"
          >
            <v-list-item-title>
              {{ prop.title }}: {{ prop.type }}
            </v-list-item-title>
            <v-list-item-action>
              <v-btn fab x-small text @click="deleteProperty(index)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>

      <!-- Relations LIST -->
      <v-flex xs12>
        <v-list>
                <v-subheader>Relations</v-subheader>

          <v-list-item
            v-for="(prop, index) in entity.relations"
            :key="`${index}-prop`"
          >
            <v-list-item-title>
              {{relationTypeValue(prop.type) }} {{ prop.entity }}
            </v-list-item-title>
            <v-list-item-action>
              <v-btn fab x-small text @click="deleteRelation(index)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ["entity"],
  data() {
    return {
      inputTimer: null,
      newPropTitle: "",
      newPropType: "",
      selectedRelationShipType: "",
      selectedRelationShipEntity: "",

      relationTypes: [
        { text: "Zero or One", value: "|o" },
        { text: "Exactly One", value: "||" },
        { text: "Zero or Many", value: "}o" },
        { text: "One or Many", value: "}|" },
      ],
    };
  },
  methods: {
    close() {
      this.$store.commit("SET_SELECTED_ENTITY", null);
    },
    addProperty() {
      if (this.newPropType == "" || this.newPropTitle == "") return;

      let prop = {
        title: this.newPropTitle,
        type: this.newPropType,
      };
      this.entity.properties.push(prop);

      this.newPropTitle = "";
      this.newPropType = "";
      this.update();
    },
    deleteProperty(index) {
      this.entity.properties.splice(index, 1);
      this.update();
    },
    addRelationship() {
      if (
        this.selectedRelationShipType == "" ||
        this.selectedRelationShipEntity == ""
      )
        return;

      let rel = {
        type: this.selectedRelationShipType,
        entity: this.selectedRelationShipEntity,
      };
      this.entity.relations.push(rel);

      this.selectedRelationShipType = "";
      this.selectedRelationShipEntity = "";
      this.update();
    },
    deleteRelation(index) {
      this.entity.relations.splice(index, 1);
      this.update();
    },
    update() {
      this.$store.dispatch("PARSE_UML");
    },
    relationTypeValue(rel) {
      return this.relationTypes.filter(f => f.value == rel)[0].text;
    }
  },
  computed: {
    entityNames() {
      let id = this.$store.state.projects.selectedProject;
      let project = this.$store.state.projects.projects.filter(
        (p) => p.id == id
      )[0];

      let list = project.entities
        .filter((n) => n.name != this.entity.name)
        .map((e) => {
          return e.name;
        });
      return list;
    },
  },
};
</script>

<style scoped>
#card-entity-editor {
  max-height: 77%;
    min-height: 77%;

  overflow-y: auto;
}
</style>