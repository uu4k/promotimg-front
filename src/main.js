// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store.js'
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

Vue.config.productionTip = false

import VueOnsen from 'vue-onsenui';
Vue.use(VueOnsen)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
