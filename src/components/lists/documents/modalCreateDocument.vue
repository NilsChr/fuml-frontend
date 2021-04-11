<template>
  <v-dialog v-model="dialog" max-width="300">
    <v-card>
      <v-card-title>Create new document</v-card-title>
      <v-main class="pl-5 pr-5 pt-0">
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              label="Document title"
              v-model="documentTitle"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-select
              label="Document type"
              v-model="documentType"
              :items="documentTypes"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-main>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog(false)" text>Cancel</v-btn>
        <v-btn @click="closeDialog(true)" text color="primary">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { documentTypes } from '../../../store/modules/documents.store';
import storeActions from "../../../store/storeActions";

export default {
  data() {
    return {
      documentTitle: "",
      documentType: "",
    };
  },
  methods: {
    async closeDialog(save) {
      if (!save) {
        this.dialog = false;
        return;
      }
      if (this.documentTitle == "") return;
      const payload = {
        title: this.documentTitle,
        type: documentTypes[this.documentType],
      };
      const newDocument = await this.$store.dispatch(
        storeActions.CREATE_DOCUMENT,
        payload
      ); // CREATE
      this.dialog = false;
      this.$emit("created", newDocument);
      this.documentType = "";
      this.documentTitle = "";
    },
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.documents.modalCreateDocument;
      },
      set(val) {
        this.$store.commit(storeActions.SET_MODAL_CREATE_DOCUMENT, val);
      },
    },
    documentTypes() {
      return Object.keys(documentTypes);
    },
  },
};
</script>

<style>
</style>