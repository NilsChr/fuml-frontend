<template>
  <v-layout wrap>
    <v-flex xs12>
      <label><strong>MEMBERS</strong></label>
    </v-flex>
    <v-flex xs12>
      <v-avatar
        v-for="(member, i) in selectedCard.assignees"
        :key="i"
        size="32"
        class="cardMember"
        @click="openMenuRemoveMemeber(member)"
      >
        <v-img :src="getMember(member).avatarUrl"> </v-img>
      </v-avatar>

      <v-dialog v-model="menuRemoveMember" width="300" v-if="memberToRemove">
        <v-card class="pa-2">
          <v-card-title>
            <v-avatar size="32" class="mr-3">
              <v-img :src="getMember(memberToRemove).avatarUrl"> </v-img>
            </v-avatar>
            {{ getMember(memberToRemove).nickName }}
          </v-card-title>
          <v-layout>
            <v-btn
              color="grey lighten-2"
              block
              depressed
              @click="removeMemberFromCard"
            >
              Remove from card
            </v-btn>
          </v-layout>
        </v-card>
      </v-dialog>

      <v-btn
        depressed
        color="grey lighten-3"
        x-small
        fab
        class="mr-2"
        @click="addMember"
      >
        <v-icon size="20">add</v-icon>
      </v-btn>

      <v-dialog v-model="menuAddMember" width="300">
        <v-card class="pa-2">
          <v-card-title> Add a new member </v-card-title>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="menuAddMemberSearch"
                hide-details
                dense
                outlined
                placeholder="Search members"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-list dense>
                <v-list-item
                  v-for="member in filteredMembers"
                  :key="member._id"
                  @click="toggleMember(member._id)"
                >
                  <v-list-item-avatar>
                    <img :src="member.avatarUrl" v-if="member._id != -1" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="member.nickName"
                    ></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action v-if="isMember(member._id)">
                    <v-icon>check</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-flex>
          </v-layout>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small depressed @click="menuAddMember = false"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import storeActions from "../../../store/storeActions";
export default {
  data() {
    return {
      menuRemoveMember: false,
      memberToRemove: null,
      menuAddMember: false,
      menuAddMemberSearch: "",
    };
  },
  methods: {
    isMember(id) {
      return this.selectedCard.assignees.includes(id);
    },
    addMember() {
      this.menuAddMember = true;
    },
    openMenuRemoveMemeber(member) {
      this.memberToRemove = member;
      this.menuRemoveMember = true;
    },
    removeMemberFromCard() {
      this.$store.dispatch(
        storeActions.kanbanCards.REMOVE_MEMBER,
        this.memberToRemove
      );
      this.memberToRemove = null;
      this.menuRemoveMember = false;
    },
    getMember(id) {
      return this.projectMembers.find((m) => m._id == id);
    },
    async toggleMember(id) {
      console.log(id);
      await this.$store.dispatch(storeActions.kanbanCards.TOGGLE_MEMBER, id);
    },
  },
  computed: {
    filteredMembers() {
      let filtered = this.projectMembers.filter((m) =>
        m.nickName.toLowerCase().includes(this.menuAddMemberSearch)
      );
      if (filtered.length > 0) return filtered;
      return [{ nickName: "No results", _id: -1 }];
    },
    projectMembers() {
      return this.$store.state.projects.selectedProjectCollaborators;
    },
    selectedCard: {
      get() {
        return this.$store.state.kanbanCards.selectedCard;
      },
      set(val) {
        this.$store.commit(storeActions.kanbanCards.SET_SELECTED_CARD, null);
      },
    },
    selectedBoard() {
      return this.$store.state.kanban.selectedBoard;
    },
  },
};
</script>

<style scoped>
.cardMember {
  border: 2px solid #fafafa;
  margin-left: -12px;
  transition: 0.05s ease all;
}

.cardMember:hover {
  border: 0px solid #fafafa;
  margin-left: -12px;
  z-index: 1;
  cursor: pointer;
}
</style>