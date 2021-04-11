import Vue from "vue";

Vue.filter("toLowerCase", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.toLowerCase();
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
