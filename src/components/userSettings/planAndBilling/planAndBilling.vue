<template>
  <v-layout wrap column fill-height>
    <v-flex xs1 class="pa-5">
      <label id="plan-and-billing-title"><strong>Plan & Billing</strong></label>
    </v-flex>
    <v-flex xs4 class="pa-5">
      <label><strong>Current Plan</strong></label>
      <current-plan />
    </v-flex>
    <v-flex xs3 class="pa-5">
      <label class="mb-5"><strong>Billing History</strong></label>
      <billing-history/>
    </v-flex>
  </v-layout>
</template>

<script>
import billingHistory from "./billingHistory.vue";
import CurrentPlan from './currentPlan.vue';
export default {
  components: { billingHistory, CurrentPlan },
  computed: {
    customer() {
      return this.$store.state.user.customer;
    },
  },
};
</script>

<style>
#plan-and-billing-title {
  font-size: 2em;
}
</style>