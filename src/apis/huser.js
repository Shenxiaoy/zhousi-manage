import axios from './index'
import store from '../store'

const loginUser = params => axios.post(`${process.env.VUE_APP_SYSTEM}/login`, params)
const logoutUser = `/logout`
const userInfo = params => axios.get(`${process.env.VUE_APP_SYSTEM}/login/user/info`, params)
const delUser = id => axios.get(`${process.env.VUE_APP_SYSTEM}/user/delete/${id}`)
const addUser = params => axios.post(`${process.env.VUE_APP_SYSTEM}/user/add`, params)
const updateUser = params => axios.post(`${process.env.VUE_APP_SYSTEM}/profile/update`, params)
const userPageList = params => axios.get(`${process.env.VUE_APP_SYSTEM}/user/list/${params.pageNum}/${params.pageSize}`, { params }).then(async (data) => {
  if (data.code === 0) {
    const roleList = await store.dispatch('getRoleList')
    const statusDict = [
      {
        dictName: '启用',
        dictVal: 1
      },
      {
        dictName: '禁用',
        dictVal: 0
      }
    ]
    if (roleList && roleList.length) {
      data.data.list.forEach(item => {
        roleList.some((role) => {
          if (item.roleId === role.id) {
            item.roleNameFromDict = role.roleName
            return true
          }
          return false
        })
        statusDict.some((dict) => {
          if (dict.dictVal === item.status) {
            item.statusFromDict = dict.dictName
            return true
          }
          return false
        })
      })
    }
    return data
  } else {
    return data
  }
})
const userDetail = params => axios.get(`${process.env.VUE_APP_SYSTEM}/user/detail/${params.id}`)
const findPerson = params => axios.get(`${process.env.VUE_APP_SYSTEM}/profile/findProfile/?${params}`)
const findFuzzyByUserId = params => axios.get(`${process.env.VUE_APP_SYSTEM}/profile/findFuzzyByUserId`, { params }).then(res => {
  if (res.code === 200) {
    let cArr = res.data
    let rsArr = cArr.map((item, index) => {
      item.value = item.account
      return item
    })
    return rsArr
  }
})
const userMenu = params => axios.get(`/profile/permisson`, { params })
export {
  loginUser,
  logoutUser,
  userInfo,
  delUser,
  addUser,
  userPageList,
  userDetail,
  findFuzzyByUserId,
  findPerson,
  updateUser,
  userMenu
}
