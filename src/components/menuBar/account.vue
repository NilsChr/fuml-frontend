<template>
  <v-flex xs1 v-if="currentUser">
    <v-menu v-model="menu" offset-y offset-x>
      <template v-slot:activator="{ on }">
        <v-layout align-end justify-end>
          <v-flex xs3>
            <v-avatar size="33">
            <v-img :src="currentUser.avatarUrl" v-on="on"/>
            </v-avatar>
          </v-flex>
        </v-layout>
      </template>

      <v-list>
        <v-list-item
          v-for="option in options"
          :key="option.title"
          @click="option.action"
        >
          <v-list-item-title v-text="option.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-flex>
</template>

<script>
import auth from "../../auth";

export default {
  data() {
    return {
      menu: false,
      options: [{ title: "logout", action: this.logout }, { title: 'Become Premium', action: this.goToSubscription}],
    };
  },
  methods: {
    logout() {
      auth.logout();
    },
    goToSubscription() {
      console.log('sub');
      this.$router.push("/subscribe");
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser
    }
  }
};
</script>

<style scoped>
.v-menu__content {
  min-width: 150px !important;
  max-width: 150px !important;
}
</style>