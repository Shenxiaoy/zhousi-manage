import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from './apis'
import gomeUI from 'gome-ui';
import './assets/iconfont/iconfont.css'
import 'gome-ui/dist/css/reset-theme.less'
// import './assets/css/bhs-store.less'
import './assets/css/basic.scss'

Vue.config.productionTip = false;
Vue.prototype.axios = axios

Vue.use(gomeUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");



