<template>
  <v-layout wrap column fill-height>
    <v-flex xs1 class="pa-5">
      <label id="profile-settings-title"
        ><strong>Profile Settings</strong></label
      >
      <v-btn
        absolute
        top
        right
        depressed
        color="warning"
        v-if="canUpdate"
        :loading="loading"
        @click="updateUser"
      >
        Update
      </v-btn>
    </v-flex>
    <v-flex xs4 class="pa-5">
      <label><strong>User info</strong></label>
      <v-layout>
        <v-flex xs7 v-if="!loading">
          <v-layout>
            <v-flex xs3 class="mt-2">
              <label>Nickname </label>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                :rules="[rules.counter]"
                maxlength="32"
                minlength="2"
                v-model="nickName"
                outlined
                dense
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
              <profile-themes />
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import DBConnector from "../../../services/database/dbConnector";
import profileThemes from './profileThemes.vue';
export default {
  components: { profileThemes },
  data() {
    return {
      loading: false,
      nickName: "",
      rules: {
        counter: (value) => value.length >= 2 &&  value.length <= 32 || "Between 2 and 32 characters allowed.",
      },
    };
  },
  methods: {
    limitNickname() {},
    setData() {
      this.nickName = this.currentUser.nickName || '';
      this.loading = false;
    },
    async updateUser() {
      this.loading = true;
      this.currentUser.nickName = this.nickName;
      await DBConnector.user.update(this.currentUser);
      this.loading = false;
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    canUpdate() {
      let canUpdate = false;
      if (this.nickName != this.currentUser.nickName) canUpdate = true;
      if (this.nickName.length < 2 || this.nickName.length > 32) canUpdate = false;
      return canUpdate;
    },
  },
  mounted() {
    this.loading = true;

    this.setData();
  },
  watch: {
    currentUser(val) {
      if (!val) return;
      this.setData();
    },
  },
};
</script>

<style>
#profile-settings-title {
  font-size: 2em;
}
</style>