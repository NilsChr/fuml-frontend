<template>
  <v-avatar :size="size" v-if="userId">
    <v-img :src="getMemberImg(userId)"> </v-img>
  </v-avatar>
</template>

<script>
export default {
  props: ["userId", "size"],
  data() {
    return {
      fallback:
        "https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png",
    };
  },
  methods: {
    getMemberImg(id) {
      return (
        this.projectMembers.find((m) => m._id == id)?.avatarUrl || this.fallback
      );
    },
  },
  computed: {
    projectMembers() {
      return this.$store.state.projects.selectedProjectCollaborators;
    },
  },
};
</script>

<style>
</style>