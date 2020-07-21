import Vue from "vue";
import Vuex from "vuex";
import global from './global' //菜单及权限路由相关。
import dataDesenTask from './dataDesenTask'  //示例业务模块对应的store

Vue.use(Vuex);

// vuex模块，增加可维护性及易读性
const modules = {
  dataDesenTask
}

const storeData = Object.assign(global, { modules })

export default new Vuex.Store(storeData)