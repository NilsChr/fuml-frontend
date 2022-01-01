<template>
  <v-flex xs12>
    <v-btn
      dark
      :color="c"
      v-for="(c, i) in colors"
      :key="i"
      class="ma-1"
      small
      @click="_handleSetColor(c)"
      :depressed="selectedColor != c"
    >
      <v-icon color="grey lighten-2" v-if="selectedColor === c" size="17"
        >check</v-icon
      >
    </v-btn>
  </v-flex>
</template>

<script>
export default {
  props: ["selectedColor"],
  data() {
    return {
      color: "#fff",
      colors: [
        "rgba(0,0,0,0)",
        "#fff",
        "#61bd4f",
        "#f2d600",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
        "#00c2e0",
        "#51e898",
        "#ff78cb",
        "#344563",
      ],
    };
  },
  methods: {
    _handleSetColor(color) {
      this.$emit("change", color);
    },
  }
};
</script>

<style>
</style>