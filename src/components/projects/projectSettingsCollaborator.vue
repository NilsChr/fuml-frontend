<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-subheader><strong>Collaborators</strong></v-subheader>
    </v-flex>
    <v-flex xs12>
      <v-btn outlined color="white" @click="drawer = !drawer"
        >Manage Collaborators</v-btn
      >
    </v-flex>
    <v-navigation-drawer v-model="drawer" absolute right width="400">
      <v-container fluid fill-height>
        <v-layout column>
          <v-flex xs1
            ><v-subheader><strong>Collaborators</strong></v-subheader></v-flex
          >
          <v-flex xs1>
            <v-btn block small @click="addDialog = true"
              >Add collaborator</v-btn
            >
            <v-dialog v-model="addDialog" max-width="400">
              <v-card>
                <v-card-title>Add collaborator</v-card-title>
                <v-container>
                  <v-autocomplete
                    v-model="addSearch"
                    :items="addSearchResults"
                    @keydown="searchDB"
                    :search-input.sync="search"
                    item-text="nickName"
                    item-value="_id"
                    prepend-icon="search"
                    return-object
                    :loading="addingColab"
                  >
                    <template v-slot:item="data">
                      <template>
                        <v-list-item-avatar>
                          <img :src="data.item.avatarUrl" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-html="data.item.nickName"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="addDialog = false">Cancel</v-btn>
                  <v-btn
                    text
                    :disabled="addSearch == null"
                    @click="addCollaborator"
                    >Add</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
          <v-flex xs1>
            <v-text-field
              v-model="filterSearch"
              label="Filter collaborators"
              dense
              hide-details
              append-icon="filter_list"
            ></v-text-field>
          </v-flex>
          <v-flex xs10>
            <v-list two-line dense>
              <v-subheader>Users</v-subheader>
              <v-list-item
                v-for="colab in filteredCollaborators"
                :key="colab._id"
                dense
              >
                <v-list-item-avatar>
                  <v-img :src="colab.avatarUrl"> </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ colab.nickName }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="ownerIsColab(colab)"
                    >Owner</v-list-item-subtitle
                  >
                  <v-list-item-subtitle v-else
                    >Collaborator</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-action
                  v-if="
                    projectOwnerIsCurrentUser() && !colabIsCurrentUser(colab)
                  "
                >
                  <v-btn
                    fab
                    x-small
                    text
                    class="mt-1"
                    @click="triggerDeleteCollaborator($event, colab)"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <confirm-dialog
              :dialog="deleteColabDialog"
              :width="190"
              title="Confirm delete"
              @no="_handleDeleteDialogNo"
              @yes="_handleDeleteDialogYes"
            ></confirm-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import DBConnector from "../../services/database/dbConnector";
import storeActions from "../../store/storeActions";
import confirmDialog from "../common/confirmDialog.vue";
export default {
  components: { confirmDialog },
  data() {
    return {
      search: "",
      addDialog: false,
      addSearch: "",
      addSearchResults: [],
      addingColab: false,
      searchTimeout: null,
      drawer: false,
      filterSearch: "",
      deleteColabDialog: false,
      colabToDelete: null,
    };
  },
  methods: {
    searchDB() {
      clearTimeout(this.searchTimeout);
      let that = this;

      this.searchTimeout = setTimeout(async function () {
        that.addSearchResults = await DBConnector.searchUser(that.search);
      }, 200);
    },
    async addCollaborator() {
      this.addingColab = true;

      await DBConnector.addCollaborator(this.selectedProject, this.addSearch);

      this.addSearch = null;
      this.search = "";
      clearTimeout(this.searchTimeout);
      this.addingColab = false;
      this.addDialog = false;
      this.$store.dispatch(
        storeActions.project.LOAD_SELECTED_PROJECT_COLLABORATORS
      );
    },
    ownerIsColab(colab) {
      if (!this.selectedProject) return false;
      if (!colab) return false;
      return this.selectedProject.ownerId == colab._id;
    },
    projectOwnerIsCurrentUser() {
      if (!this.selectedProject) return false;
      if (!this.currentUser) return false;
      return this.selectedProject.ownerId == this.currentUser._id;
    },
    colabIsCurrentUser(colab) {
      if (!this.currentUser) return false;
      if (!colab) return false;
      return colab._id == this.currentUser._id;
    },
    triggerDeleteCollaborator(e, colab) {
      e.stopPropagation();
      this.deleteColabDialog = true;
      this.colabToDelete = colab;
    },
    _handleDeleteDialogNo() {
      this.deleteColabDialog = false;
      this.colabToDelete = null;
    },
    async _handleDeleteDialogYes() {
      await DBConnector.removeCollaborator(
        this.selectedProject,
        this.colabToDelete
      );
      this.$store.dispatch(
        storeActions.project.LOAD_SELECTED_PROJECT_COLLABORATORS
      );
      this.deleteColabDialog = false;
      this.colabToDelete = null;
    },
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.selectedProject;
    },
    collaborators() {
      return this.$store.state.projects.selectedProjectCollaborators;
    },
    filteredCollaborators() {
      if (this.filterSearch == "") return this.collaborators;

      return this.collaborators.filter((c) =>
        c.nickName.toLowerCase().includes(this.filterSearch.toLowerCase())
      );
    },
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
};
</script>

<style>
</style>