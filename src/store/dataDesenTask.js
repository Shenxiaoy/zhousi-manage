// 数据脱敏任务VUEX命名空间 ，示例文件

const state = {
  taskEditCache: null, // 数据脱敏任务编辑数据缓存
}
const mutations = {
  setTaskEditCache (state, data) {
    state.taskEditCache = data
  },
 
}
const actions = {
}

const getters = {
}

export default {
  namespaced: true, // 使用命名空间
  state,
  mutations,
  actions,
  getters
}
