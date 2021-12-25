<template>
  <v-layout wrap column fill-height>
    <v-flex xs1 class="pa-5">
      <label id="profile-settings-title"><strong>Tickets</strong></label>
    </v-flex>
    <v-flex xs4 class="pa-5">
      <label><strong>Tickets</strong></label>
      <v-layout>
        <v-flex xs7> </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loading: false,
    };
  },
  methods: {},
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
};
</script>

<style>
</style>