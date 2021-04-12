<template>
  <v-layout class="pa-5">
    <v-card style="border: 3px solid rgb(102, 199, 102)">
      <v-layout>
        <v-flex xs2 style="border-right: 1px solid grey">
            <!--
          <v-img :src="require('../../../assets/parchment.svg')" />
          -->
            <svg-parchment style="width:100%; height: 100%;"/>
        </v-flex>
        <v-flex xs10 class="pa-2">
          <v-layout wrap>
            <v-flex xs12 class="pa-3">
              <strong>{{ activePlan.stripeProductName }}</strong>
            </v-flex>
            <v-flex xs12>
              <v-subheader>
                Active until {{ activePlan.period_end | dateFormatStripeShort }}
              </v-subheader>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
import svgParchment from '../../common/svgParchment.vue';
export default {
  components: { svgParchment },
  computed: {
    activePlan() {
      const now = new Date().getTime() / 1000;
      return this.$store.state.user.customer.invoices.filter(
        (i) =>
          i.period_start <= now && i.period_end > now && i.active && !i.refunded
      )[0];
    },
  },
};
</script>

<style>
</style>