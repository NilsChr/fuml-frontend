<template>
  <v-card id="documents-list" class="pa-2 fill-height" style="max-height: 100%">
    <v-layout fill-height column>
      <v-flex xs1>
        <v-layout wrap>
          <v-flex xs10>
            <v-subheader>Documents</v-subheader>
          </v-flex>
          <v-flex xs2>
            <v-btn fab x-small text class="mt-1" @click="createDocument"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
            <modal-create-document />
          </v-flex>

          <v-flex xs12>
            <v-layout>
              <v-flex xs10>
                <v-text-field
                  v-model="documentsSearch"
                  dense
                  outlined
                  :hide-details="true"
                  label="Search"
                  clearable
                >
                </v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn
                  fab
                  x-small
                  text
                  class="mt-1"
                  @click="edit = !edit"
                  v-bind:class="{ edit: edit }"
                  ><v-icon>mdi-cog-outline</v-icon></v-btn
                >
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs11 style="overflow: hidden" class="bordered">
        <v-list class="card-list" dense style="overflow: auto">
          <v-list-item
            dense
            v-for="document in filteredDocuments"
            :key="document.id"
            v-bind:class="{ selected: selectedDocument == document }"
            @click.stop
            class="list-item"
            two-line
            @click="setSelectedDocument(document)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ document.title }}</v-list-item-title>
              <v-list-item-subtitle>{{
                document.type | toLowerCase
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-slide-x-transition>
               <v-list-item-action v-if="edit">
                <v-btn
                  fab
                  x-small
                  text
                  class="mt-1"
                  @click="setDocumentToEdit(document)"
                  ><v-icon>edit</v-icon></v-btn
                >
              </v-list-item-action>
            </v-slide-x-transition>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
    <document-edit :dialog="documentEditDialog" :document="documentToEdit" @close="documentEditDialog = false">
      </document-edit>
  </v-card>
</template>

<script>
import Vue from "vue";
import storeActions from "../../../store/storeActions";
import modalCreateDocument from "./modalCreateDocument.vue";
import ConfirmDialog from "../../common/confirmDialog.vue";
import DocumentEdit from './documentEdit.vue';

export default {
  components: { modalCreateDocument, ConfirmDialog, DocumentEdit },
  data() {
    return {
      documentsSearch: "",
      edit: false,
      documentEditDialog: false,
      documentToEdit: null
    };
  },
  methods: {
    createDocument() {
      this.$store.commit(storeActions.SET_MODAL_CREATE_DOCUMENT, true);
    },
    setSelectedDocument(document) {
      this.$store.commit(storeActions.SET_SELECTED_DOCUMENT, document);
      this.$router
        .replace({
          name: "dashboard",
          query: {
            projectId: this.selectedProject._id,
            documentId: this.selectedDocument._id,
          },
        })
        .catch((e) => {});

      Vue.nextTick(
        function () {
          this.$store.dispatch(storeActions.PARSE_UML);
        }.bind(this)
      );
    },
    setDocumentToEdit(document) {
      this.documentToEdit = document;
      this.documentEditDialog = true;
    }
  },
  computed: {
    projectDocuments() {
      const projectId = this.$store.state.projects.selectedProject._id;
      return this.$store.state.documents.documents.filter(
        (d) => d.projectId == projectId
      );
    },
    filteredDocuments() {
      const documents = this.projectDocuments;
      if (!this.documentsSearch) return documents;
      if (this.documentsSearch == "") return documents;
      return documents.filter(
        (f) =>
          f.title.toLowerCase().includes(this.documentsSearch.toLowerCase()) ||
          f.type.toLowerCase().includes(this.documentsSearch.toLowerCase())
      );
    },
    selectedDocument() {
      return this.$store.state.documents.selectedDocument;
    },
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
  },
};
</script>

<style scoped>
.selected {
  border-left: 5px solid rgb(102, 199, 102);
}
.bordered {
  border: 1px solid rgb(208, 208, 208);
  border-radius: 5px;
}
.list-item {
  max-height: 20px;
  border-bottom: 1px solid rgb(177, 177, 177);
  border-top: 1px solid rgb(218, 218, 218);
}

.edit {
  transform: rotate(90deg);
}
</style>