<template>
  <v-container fluid fill-height>
      SUB SUCCESS
      <v-layout fill-height align-center justify-center>
        <div id="payment-success">

          <div id="col"></div>
        </div>
      </v-layout>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
#payment-success {
  border: 1px solid red;
  width: 32px;
  height: 32px;
  position: relative;
}

#col {
  position:absolute;
  height: 3px;
  width: 150px;
  border-radius: 5px;
  background-color: yellow;
  transform:rotate(90deg)  translate(50%, 50%) ;
}
</style>