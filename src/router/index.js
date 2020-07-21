import Vue from "vue";
import VueRouter from "vue-router";
import globalRouter from './rglobal'
// import store from '@/store' //需要store里权限逻辑时候，再调用

Vue.use(VueRouter);


const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  // routes
});

router.addRoutes(globalRouter) //需要权限控制的业务路由（在store里控制，然后这里调用再挂到路由对象上）

export default router;
