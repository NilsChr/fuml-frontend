<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-subheader>Themes</v-subheader>
    </v-flex>
    <v-flex xs12>
      <v-layout row>
        <div
          v-for="theme in themes"
          :key="theme.id"
          v-bind:style="theme.style"
          class="color-demo"
          @click="setTheme(theme.id)"
          v-bind:class="{
            'color-demo-selected': currentUser.selectedTheme === theme.id,
          }"
        >
          <label class="color-demo-title">
            {{ theme.title }}
          </label>
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import DBConnector from "../../../services/database/dbConnector";
import themes from "../../../util/appThemes";
/**
 * https://cssgradient.io/gradient-backgrounds/
 */

export default {
  data() {
    return {
      themes: themes,
    };
  },
  methods: {
    async setTheme(id) {
      this.currentUser.selectedTheme = id;
      await DBConnector.user.update(this.currentUser);
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
  },
};
</script>

<style>
.color-demo {
  width: 50px;
  height: 50px;
  margin: 12px;
  border-radius: 0.4em;
  box-shadow: 0px 0px 5px grey;
  transition: 0.2s all ease-in;
  transform: scale(1, 1);
  position: relative;
}

.color-demo:hover {
  transform: scale(1.1, 1.1);
}

.color-demo-title {
  font-size: 0.6rem;
  font-weight: bold;
  color: gray;
  mix-blend-mode: difference;
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translate(-50%, 0%);
}

.color-demo-selected {
  border: 2px solid #1b1b1b;
}
</style>