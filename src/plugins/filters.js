import Vue from "vue";

Vue.filter("toLowerCase", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.toLowerCase();
});

Vue.filter("toUpperCase", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.toUpperCase();
});

Vue.filter("dateFormatShort", function(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
});

Vue.filter("dateFormatLong", function(value) {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
});

Vue.filter("dateFormatStripeShort", function(value) {
  if (!value) return "";
  return new Date(value * 1000).toISOString().slice(0, 10);
});

Vue.filter("dateFormatStripeText", function(value) {
  if (!value) return "";

  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }

  let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];
  let s = join(new Date(value * 1000), a, " ");
  return s;
});

Vue.filter("stripePrice", function(value) {
  if (!value) return "";
  const price = value.toString();
  return (
    price.substring(0, price.length - 2) +
    "," +
    price.substring(price.length - 2, price.length)
  );
});

const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
Vue.filter("fileSize", function(value) {
  let l = 0,
    n = parseInt(value, 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }
  //include a decimal point and a tenths-place digit if presenting
  //less than ten of KB or greater units
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
});
