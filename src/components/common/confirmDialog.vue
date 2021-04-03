<template>
  <v-dialog v-model="dialog" :max-width="width" persistent>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-5" v-if="message">
        {{message}}
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="no">No</v-btn>
        <v-spacer></v-spacer>

        <v-btn color="warning" text @click="yes">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "width", "title", "message"],
  methods: {
    no() {
      this.$emit("no");
    },
    yes() {
      this.$emit("yes");
    },
  },
};
</script>

<style>
</style>