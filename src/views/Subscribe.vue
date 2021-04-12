<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center column fill-height>
      <v-flex xs1 class="pt-5">
        <v-text-field
          label="Coupon Code"
          v-model="couponCode"
          dark
          hide-details
          dense
          outlined
          placeholder="ltest"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs10>
        <v-layout justify-center align-center>
          <v-card
            v-for="(data, i) in products"
            :key="i"
            class="pa-4 ma-2 product-card"
          >
            <v-card-title>
              {{ data.product.name }}
            </v-card-title>
            <v-layout column>
              <v-flex xs4>
                <v-img
                  :aspect-ratio="16 / 9"
                  :src="data.product.images[0]"
                  width="250"
                >
                </v-img>
              </v-flex>
              <v-flex
                xs4
                class="pl-5 pr-5 pt-5 text-center"
                style="font-size: 3em"
              >
                <strong>{{ data.price.unit_amount | stripePrice }}</strong>
                {{ data.price.currency | toUpperCase }}
              </v-flex>
              <v-flex xs1 class="pl-5 pr-5 text-center">
                per {{ data.price.recurring.interval }}
              </v-flex>
              <v-flex xs1 class="pa-4">
                {{ data.product.description }}
              </v-flex>
              <v-flex xs1>
                <v-btn depressed block color="success" @click="buy(data)">
                  BUY
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
    <stripe-checkout
      ref="checkoutRef"
      :pk="publishableKey"
      :session-id="sessionId"
    />

    <v-snackbar v-model="snackbar" top :timeout="2000" color="error">
      {{ snackbarMessage }}
      <v-btn text depressed @click="snackbar = false" small> Close </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import DBConnector from "../services/database/dbConnector";

export default {
  components: {
    StripeCheckout,
  },
  data() {
    return {
      couponCode: "",
      products: [],
      publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      loading: false,
      snackbar: false,
      snackbarMessage: "",

      sessionId: null,
    };
  },
  methods: {
    async buy(data) {
      const res = await DBConnector.stripe.createSession({
        productId: data.product.id,
        stripePrice: data.price.id,
        coupon: this.couponCode,
      });
      console.log("RES", res);
      if (!res.session) {
        this.snackbarMessage = res.message;
        this.snackbar = true;
        return;
      }

      this.sessionId = res.session.id;
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
  async mounted() {
    try {
      let res = await DBConnector.stripe.getProducts();
      this.products = res;
      console.log(this.products);
    } catch (e) {
      this.$router.push("/dashboard");
    }
  },
};
</script>

<style>
.product-card {

}
.product-card:hover {
  transition: all 0.2s ease-in-out;
  transform: scale(1.02);
}
</style>