<template>
  <v-container fluid fill-height class="pl-5 pr-5">
    <v-app-bar dark flat color="transparent">
      <label style="font-family: 'Montserrat'; font-size: 26px; color: #639bff"
        ><strong>FU</strong>ml</label
      >
      <v-spacer></v-spacer>
      <router-link to="/auth">
        <v-subheader> SIGN IN </v-subheader>
      </router-link>
    </v-app-bar>
    <v-layout fill-height class="pl-5 pr-5">
      <v-flex xs6>
        <v-layout align-center justify-center fill-height column>
          <v-flex xs5>
            <v-layout justify-center>
              <v-flex xs6>
                <h1 style="color: white">
                  The #2 software development tool used by agile teams
                </h1>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout align-center justify-center fill-height column>
          <v-flex xs7>
            <v-layout justify-center>
              <v-flex xs8>
                <v-img
                  src="https://wac-cdn-2.atlassian.com/image/upload/f_auto,q_auto/dam/jcr:b86a32cb-0aa8-4783-aa81-9592d4fbf829/jsw-header-illustrations---v3.png?cdnVersion=1508"
                ></v-img>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>