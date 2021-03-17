<template>
  <v-flex xs1>
    <v-menu v-model="menu" offset-y offset-x>
      <template v-slot:activator="{ on }">
        <v-layout align-end justify-end>
          <v-flex xs3>
            <v-icon dark v-on="on">arrow_drop_down</v-icon>
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
      options: [{ title: "logout", action: this.logout }],
    };
  },
  methods: {
    logout() {
      auth.logout();
    },
  },
};
</script>

<style scoped>
.v-menu__content {
  min-width: 150px !important;
  max-width: 150px !important;
}
</style>