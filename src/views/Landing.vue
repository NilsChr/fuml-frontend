<template>
  <v-container fluid fill-height class="pl-0 pr-0 pa-0">
    <!--
    <v-app-bar dark flat color="transparent">
      <label style="font-family: 'Montserrat'; font-size: 26px; color: #639bff"
        ><strong>FU</strong>ml</label
      >
      <v-spacer></v-spacer>
      <router-link to="/auth">
        <v-subheader> SIGN IN </v-subheader>
      </router-link>
    </v-app-bar>
    -->
    <div id="skewer"></div>
    <div id="by-bog">© BogSynth.com</div>
    <v-layout fill-height class="pl-0 pr-0">
      <v-flex xs6>
        <v-layout align-center justify-center fill-height column>
          <v-flex xs3>
            <v-layout justify-start>
              <v-flex xs8>
                <!--
                <v-img
                  src="https://wac-cdn-2.atlassian.com/image/upload/f_auto,q_auto/dam/jcr:b86a32cb-0aa8-4783-aa81-9592d4fbf829/jsw-header-illustrations---v3.png?cdnVersion=1508"
                ></v-img>
                -->
                <fuml-logo style="position: relative; z-index: 9" />
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6 style="position: relative; z-index: 9">
        <div id="sign-in">
          <router-link to="/auth">
            <v-subheader> SIGN IN </v-subheader>
          </router-link>
        </div>
        <v-layout align-center justify-center fill-height column>
          <v-flex xs2>
            <v-layout justify-center>
              <v-flex xs8>
                <h1 style="color: #1b1b1b">
                  One place to plan and manage your apps
                </h1>
                <h4 style="font-weight: normal" class="pt-5">
                  FUml aims to simplify your workflow by keeping all necessary
                  documents in one place.
                </h4>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FumlLogo from "../components/common/fumlLogo.vue";

export default {
  components: {
    FumlLogo,
  },
};
</script>

<style>
#skewer {
  position: absolute;
  right: 0%;
  top: 0px;
  width: 45%;
  height: 200%;
  transform: rotate(3deg) scale(1.2, 2);
  background-color: rgb(249, 249, 249);
  border-left: 1px solid #1b1b1b;
  z-index: 0;
}

#sign-in {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 24px;
}

#by-bog {
  position: absolute;
  text-align: right;
  color: #b6b6b6;
  font-size: 0.7em;
  bottom: 5px;
  right: 5px;
}
</style>