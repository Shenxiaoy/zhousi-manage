// import { roleAll } from '@/http/hrole'
// import { menuAll } from '@/http/hmenu'
// import { userInfo } from '@/http/huser'
import { roleAuthMenuData, getMenusTree } from '@/utils/menusUtils'
import routes from '@/router/rglobal'
// import vueRouter from '@/router/index'
import { routerMergeRight } from '@/utils/routerUtils'

export default {
  state: {
    // 全局loading界面
    loading: false,
    userInfo: '',
    hasNewNotify: false, // 是否有新的通知
    currentRoleInfo: '',
    currentRoutes: '',
    secondNav: [],
    secnavCheck: '',
    senum: 0, // 二级导航索引
    builtInRuleId: [], // 新建任务内置规则组id
    customRuleId: [], // 新建任务自定义规则组id
    isLicenseOverdue: false, // License是否已经过期
    menusData: null,
    roleRightsTree: null,
    roleList: [],
    authRoutes: null, // 权限路由
    dataDist: [], // 数据字典
    publicKey: '',
    lineCharts: []
  },
  getters: {
    userInfo: state => state.userInfo,
    currentRoleInfo: state => state.currentRoleInfo,
    menusData: state => state.menusData,
    roleRightsTree: state => state.roleRightsTree,
    roleList: state => state.roleList,
    authRoutes: state => state.authRoutes
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setHasNewNotify (state, data) {
      state.hasNewNotify = data
    },
    setCurrentRoleInfo (state, data) {
      state.currentRoleInfo = data
    },
    setCurrentRoutes (state, data) {
      state.currentRoutes = data
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    setSecondNav (state, data) {
      state.secondNav = data
    },
    setSecnavCheck (state, data) {
      state.secnavCheck = data
    },
    changeSecNum (state, data) {
      state.senum = data
    },
    setBuiltInRuleId (state, data) {
      state.builtInRuleId = data
    },
    setCustomRuleId (state, data) {
      state.customRuleId = data
    },
    setMenusData (state, data) {
      state.menusData = data
    },
    setIsLicenseOverdue (state, data) {
      state.isLicenseOverdue = data
    },
    setRoleRightsTree (state, data) {
      state.setRoleRightsTree = data
    },
    setRoleList (state, data) {
      state.roleList = data
    },
    setAuthRoutes (state, data) {
      state.authRoutes = data
    },
    setDataDist (state, data) {
      state.dataDist = data
    },
    setPublicKey (state, data) {
      state.publicKey = data
    },
    setLineCharts (state, data) {
      state.lineCharts.push(data)
    }
  },
  actions: {
    getUserInfo ({ commit, state }, option) { // 获取用户信息
      // let data = state.userInfo
      // if (data && (!option || !option.update)) {
      //   return new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve(userInfo)
      //     }, 50)
      //   })
      // }
      // return userInfo().then((ret) => {
      //   if (ret && ret.code === 0) {
      //     if (ret.data) {
      //       commit('setUserInfo', ret.data)
      //       return ret.data
      //     }
      //   }
      //   return null
      // })
    },
    getRoleList ({ commit, rootGetters }, option) {
      // const list = rootGetters.roleList
      // if (list && list.length && (!option || !option.update)) {
      //   return new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve(list)
      //     }, 50)
      //   })
      // }
      // return roleAll().then((data) => { // 获取全部的角色
      //   if (data && data.code === 0) {
      //     commit('setRoleList', data.data)
      //     return data.data
      //   }
      //   return null
      // })
    },
    async getCurrentRoleInfo ({ state, dispatch, commit, rootGetters }, option) {
      // const data = rootGetters.currentRoleInfo
      // if (data && (!option || !option.update)) {
      //   return new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve(data)
      //     }, 50)
      //   })
      // }
      // let userData = state.userInfo
      // if (!userData) {
      //   userData = await dispatch('getUserInfo')
      // }
      // let currentRole = null
      // if (userData) {
      //   let roleId = 1
      //   if (userData.roleId) roleId = userData.roleId
      //   const roleAll = await dispatch('getRoleList', { update: option && !!option.update })

      //   roleAll.some((item) => {
      //     if (item.id === roleId) {
      //       currentRole = item
      //       return true
      //     }
      //     return false
      //   })
      //   if (currentRole) {
      //     commit('setCurrentRoleInfo', currentRole)
      //   }
      // }
      // return currentRole
    },
    // 如果有就直接获取state的，不然从后端获取； update代表是否强制从后端获取。
    getMenusData ({ commit, rootGetters }, option) {
      // const data = rootGetters.menusData
      // if (data && (!option || !option.update)) {
      //   return new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve(data)
      //     }, 50)
      //   })
      // }
      // return menuAll().then((data) => {
      //   if (data && data.code === 0) {
      //     const tree = getMenusTree(data.data)
      //     const result = { tree, list: data.data }
      //     commit('setMenusData', result)
      //     return result
      //   }
      //   return null
      // })
    },
    async getAuthRoutes ({ state, dispatch, commit, rootGetters }, option) {
      const rightMenuData = await dispatch('getRoleAuthMenuData')
      if (rightMenuData) {
        const routesAdd = await routerMergeRight(routes, rightMenuData)
        commit('setAuthRoutes', routesAdd)
        return routesAdd
      }
      return null
    },
    // 菜单权限树，如果有就直接获取state的，不然从后端获取； update代表是否强制从后端获取； rights代表权限，默认使用登录用户的权限。
    async getRoleAuthMenuData ({ state, dispatch, commit, rootGetters }, option) {
      const data = rootGetters.roleRightMenuData
      if (data && data.list && data.tree && (!option || !option.update)) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(data)
          }, 50)
        })
      }
      let auths = '{}'
      let userData = null
      if (option && option.rights) {
        auths = option.rights
      } else {
        // auths = '{"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1,"10":1,"11":1,"12":1,"13":1,"14":1,"15":1,"16":1,"17":1,"18":1,"19":1}'
        userData = state.userInfo
        if (!userData) {
          userData = await dispatch('getUserInfo', { update: option && !!option.update })
        }
        // 没有登录的状态，返回空值
        if (!userData) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve()
            }, 50)
          })
        }
        // const currentRole = await dispatch('getCurrentRoleInfo', { update: option && !!option.update })
        const currentRole = userData.role
        if (userData.role) {
          commit('setCurrentRoleInfo', userData.role)
        }
        if (currentRole) {
          auths = currentRole.menIds
        }
      }
      const rightMenuData = await roleAuthMenuData(auths)
      commit('setRoleRightsTree', rightMenuData)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(rightMenuData)
        }, 50)
      })
    }
  }
}
