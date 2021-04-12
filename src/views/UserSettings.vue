<template>
  <v-container fluid fill-height>
    <v-layout fill-height>
      <v-flex xs2>
        <v-card class="fill-height pa-0 mr-1">
          <v-layout column>
            <v-flex xs4 class="text-center pt-5">
              <v-layout align-center justify-center class="pb-3">
                <user-avatar :userId="currentUser._id" size="105" />
              </v-layout>
              <label
                ><strong>{{ currentUser.nickName }}</strong></label
              >
              <br />
              <label style="font-size: 0.75em">{{ currentUser.email }}</label>
            </v-flex>
            <v-flex xs2> </v-flex>
            <v-divider></v-divider>
            <v-flex xs1>
              <v-list>
                <v-list-item
                  v-for="item in menu"
                  :key="item.id"
                  @click="selectedMenu = item.id"
                  v-bind:class="{ selected: selectedMenu == item.id }"
                >
                  <v-list-item-title >
                    <strong>{{item.title}}</strong>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs10>
        <v-card class="fill-height pa-2">
          <component v-bind:is="dynamicComponent"></component>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userAvatar from "../components/common/userAvatar.vue";
import PlanAndBilling from "../components/userSettings/planAndBilling/planAndBilling";

export default {
  components: { userAvatar },
  data() {
    return {
      selectedMenu: 1,
      menu: [
        { id: 1, title: "User Settings", action: null },
        { id: 2, title: "Document Settings", action: null },
        { id: 3, title: "Plan & Billing", action: null },
        { id: 4, title: "Support Tickets", action: null },
        { id: 5, title: "Close Account", action: null },
      ],
    };
  },
  methods: {},
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    dynamicComponent() {
      switch (this.selectedMenu) {
        case 1:
          return null;
        case 2:
          return null;
        case 3:
          return PlanAndBilling;
      }
    },
  },
};
</script>

<style>
</style>