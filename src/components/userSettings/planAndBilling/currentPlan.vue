<template>
  <v-layout class="pa-5">
    <v-card
      style="border-left: 5px solid rgb(102, 199, 102)"
      width="500"
      v-if="activePlan"
    >
      <v-layout>
        <v-flex xs3 style="border-right: 1px solid #dadada">
          <svg-credit-card style="width: 100%; height: 200%" />
        </v-flex>
        <v-flex xs7 class="pa-2">
          <v-layout wrap>
            <v-flex xs12 class="pa-3">
              <strong>{{ activePlan.stripeProductName }}</strong>
            </v-flex>
            <v-flex xs12>
              <v-subheader>
                Active until {{ activePlan.period_end | dateFormatStripeText }}
              </v-subheader>
              <v-subheader> {{ daysLeft }} days remaining </v-subheader>
            </v-flex>
            <v-flex xs12>
              <v-layout justify-center>
                <v-btn
                  depressed
                  color="warning"
                  x-small
                  @click="cancelSubscription"
                  v-if="!activePlan.cancelled"
                >
                  Cancel subscription
                </v-btn>
                <v-subheader v-if="activePlan.cancelled">
                  Cancelled
                </v-subheader>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card v-if="!activePlan">
      <v-card-subtitle> No Active Plan </v-card-subtitle>
    </v-card>
  </v-layout>
</template>

<script>
import DBConnector from "../../../services/database/dbConnector";
import SvgCreditCard from "../../common/svgCreditCard.vue";
import svgParchment from "../../common/svgParchment.vue";
export default {
  components: { svgParchment, SvgCreditCard },
  methods: {
    async cancelSubscription() {
      let id = this.activePlan.stripeSubscriptionId;
      await DBConnector.stripe.cancelSubscription(id);
      this.activePlan.cancelled = true;
    },
  },
  computed: {
    activePlan() {
      const now = new Date().getTime() / 1000;
      if (!this.$store.state.user.customer) return null;
      return this.$store.state.user.customer.invoices.filter(
        (i) => i.period_start <= now && i.period_end > now && !i.refunded
      )[0];
    },
    daysLeft() {
      const start = new Date().getTime();
      const end = new Date(this.activePlan.period_end * 1000).getTime();
      const diff_time = end - start;
      const diff_days = diff_time / (1000 * 3600 * 24);
      return diff_days.toFixed(0);
    },
  },
};
</script>

<style>
</style>