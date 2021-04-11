import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import auth from '@/auth'

// Plugins
import vuetify from './plugins/vuetify';
import './plugins/quill';
import './plugins/filters';
import { HTTP } from './services/database/dbConnector';

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  beforeCreate () {
    auth.init(this);
    HTTP.init(this);
  },
  render: h => h(App)
}).$mount('#app')
