<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center column fill-height>
      <v-flex xs2>
        <v-text-field
          label="Coupon"
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
      couponCode: '',
      products: [],
      publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      loading: false,
      sessionId: null,
      lineItems: [
        {
          price: "price_1If51cL9YgD3C6pQDUrokgkn", // The id of the recurring price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: "http://localhost:8080/fuml/subscribe-success",
      cancelURL: "http://localhost:8080/fuml/subscribe-cancel",
    };
  },
  methods: {
    async buy(data) {
      const session = await DBConnector.stripe.createSession({
        productId: data.product.id,
        coupon: this.couponCode
      });

      this.sessionId = session.id;
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
  transition: 0.1s linear all;
}
.product-card:hover {
  margin-bottom: 20px !important;
}
</style>