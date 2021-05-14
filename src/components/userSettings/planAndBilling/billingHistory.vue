<template>
  <v-layout row class="mt-5">
    <v-flex xs6 v-if="customer">
      <v-list dense>
        <template v-for="invoice in customer.invoices">
          <v-list-item :key="`item-${invoice._id}`" class="item-invoice">
            <v-list-item-content :key="`content-${invoice._id}`" class="pa-0">
              <v-list-item-title>
                {{ invoice.stripeProductName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ invoice.subtotal | stripePrice }}
                {{ invoice.currency | toUpperCase }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text :key="`date-${invoice._id}`">
              Start / End: {{ invoice.period_start | dateFormatStripeShort }} /
              {{ invoice.period_end | dateFormatStripeShort }}
            </v-list-item-action-text>
          </v-list-item>
          <v-divider :key="`divider-${invoice._id}`"></v-divider>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    customer() {
      return this.$store.state.user.customer;
    },
  },
};
</script>

<style>
.item-invoice {
  transition: all 0.2 ease;
}
.item-invoice:hover {
  border-left: 5px solid rgb(62, 109, 213);
  background-color: rgb(247, 247, 247);
}
</style>