<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-start column>
      <v-flex xs1></v-flex>
      <v-flex xs2>
        <!--
        <label
          style="font-family: 'Montserrat'; font-size: 26px; color: #639bff"
          ><strong>FU</strong>ml</label
        >
        -->
        <fuml-logo />
      </v-flex>
      <v-flex xs6>
        <v-card width="300" height="400">
          <v-main class="pa-5">
            <v-layout justify-center align-center wrap>
              <v-flex xs12>
                <p class="text-center" style="color: #888">
                  <strong>Login to continue</strong>
                </p>
              </v-flex>
              <v-flex xs12 class="cont">
                <div id="firebaseui-auth-container" class="centered"></div>
              </v-flex>
            </v-layout>
          </v-main>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import auth from "@/auth";
import fumlLogo from '../components/common/fumlLogo.vue';

export default {
  components: { fumlLogo },
  mounted() {
    auth.authForm("#firebaseui-auth-container");
  },
};
</script>

<style>
@import "../../node_modules/firebaseui/dist/firebaseui.css";

#firebaseui-auth-container > div > div.firebaseui-card-content > form > ul {
  padding-left: 0px !important;
}
</style>