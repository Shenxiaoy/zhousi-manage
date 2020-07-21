import axios from './index'
import gomeUI from 'gome-ui'

const message = gomeUI.GMessage

const getUserInfo = async () => {
  const ret = await axios.get(`/getUser`)
  if (ret.ok) {
    return ret.data
  }
  message.error(ret.errMsg || '获取用户信息失败！请重新登录！')
  window.location.href = '#/login'
  return false
}
const logOut = params => axios.get(`/logOut`, { params })
const getMenuList = params => axios.get(`/menu/findByPage`, { params }).then((data) => {
  // 将list组装成树状结构。
  // console.log(55,data.data.list)
  if (data && data.code === 200 && data.data.list) {
    let rsData = data.data.list
    const getChilds = (menuPid) => {
      const childArr = []
      rsData.forEach((item) => {
        if (item.menuPid === menuPid) {
          childArr.push(item)
          item.children = getChilds(item.id)
        }
      })
      if (childArr.length === 0) return null
      return childArr
    }
    return getChilds(0)
  }
}
)
export {
  getUserInfo, logOut, getMenuList
}
