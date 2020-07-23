import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import './assets/iconfont/iconfont.css'
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/css/basic.scss'

Vue.config.productionTip = false;
Vue.use(ant);


new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");



