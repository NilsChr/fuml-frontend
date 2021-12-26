import { HTTP } from "./dbConnector";

export default {
  createSession: function(data) {
    return new Promise(async (resolve, reject) => {
      try {
        //console.log('CREATE SESS', data);
        const res = await HTTP.post("/stripe/checkout", data);
        //console.log(res.data);
        resolve(res.data);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  getProducts: function() {
    return new Promise(async (resolve, reject) => {
      try {
        //console.log('GET PRODUCTS')
        const res = await HTTP.get("/stripe/products");
        //console.log("PRODUCTS");
        //console.log(res.data);
        resolve(res.data);

      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
  applyCoupon: function(code) {
    return new Promise(async (resolve, reject) => {
      try {
        //console.log('GET COUPONS')
        const res = await HTTP.post("/stripe/coupons", {coupon: code});
        //console.log("COUPONS");
        //console.log(res.data);
        resolve(res.data);

      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
  cancelSubscription: function(subscription_id) {
    return new Promise(async (resolve, reject) => {
      try {
        //console.log('CANCEL SUB')
        const res = await HTTP.post("/stripe/cancelSubscription", {subscription_id: subscription_id});
        //console.log("STATUS");
        //console.log(res.data);
        resolve(res.data);

      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }
};
