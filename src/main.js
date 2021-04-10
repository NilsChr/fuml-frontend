import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Plugins
import vuetify from './plugins/vuetify';

import './plugins/quill';


import 'material-design-icons-iconfont/dist/material-design-icons.css';
import auth from '@/auth'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  beforeCreate () {
    auth.init(this);
  },
  render: h => h(App)
}).$mount('#app')
