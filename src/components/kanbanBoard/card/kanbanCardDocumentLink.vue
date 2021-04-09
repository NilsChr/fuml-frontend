<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary lighten" depressed dark v-on="on" small class="ml-2">
        Add document link
      </v-btn>
    </template>

    <v-card max-width="300">
      <v-layout wrap class="pa-2">
        <v-flex xs12>
          <v-text-field
            label="Link text"
            hide-details
            outlined
            dense
            v-model="linkText"
          >
          </v-text-field>
        </v-flex>
        <v-flex xs12 class="pt-2"
          ><v-select
            v-model="selectedDocument"
            outlined
            dense
            hide-details
            :items="items"
            label="Document"
            item-text="title"
            item-value="_id"
          ></v-select
        ></v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="menu = false" depressed text>Cancel</v-btn>
        <v-btn color="primary" @click="createLink" depressed text>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import globals from "../../../globals";

export default {
  data() {
    return {
      menu: false,
      selectedDocument: null,
      linkText: "",
    };
  },
  methods: {
    createLink() {
      if (this.linkText == "") return;

      const base = globals.url;

      let path = "fuml/dashboard?projectId=<projectId>&documentId=<documentId>";
      path = path.replace("<projectId>", this.selectedProject._id);
      path = path.replace("<documentId>", this.selectedDocument);

      const link = "[" + this.linkText + "](" + base + path + ")";
      this.$emit("created", link);
      this.menu = false;
      this.linkText = "";
    },
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
    items() {
      const docs = this.$store.state.documents.documents;
      return docs;
    },
  },
};
</script>

<style>
</style>