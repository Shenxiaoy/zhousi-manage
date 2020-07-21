
// 获取菜单角色权限数据与路由进行结合
const routerMergeRight = (routes, menusData) => new Promise(async (resolve) => {
  // const menusData = await store.dispatch('getRoleAuthMenuData')
  const menusRightList = menusData.list
  const buildRoutes = (list) => {
    let redirectUrl = ''
    list.forEach((item) => {
      menusRightList.some((menu) => {
        if (item.meta && item.meta.classify) {
          if (item.meta.classify.indexOf(menu.flag) !== -1) {
            item.meta.rightsState = menu.rightsState
            item.meta.seqNo = menu.menuSeqNo
            if (item.meta.classify.length === 1) {
              item.meta.level = 1
            }
            if (menu.rightsState !== 0 && !redirectUrl) {
              redirectUrl = item.path.replace('/', '')
            }
            return true
          }
        }
        return false
      })
      if (item.children && item.children.length) {
        const redirectTemp = buildRoutes(item.children)
        if (redirectTemp) {
          item.redirect = item.path.replace('/', '') + '/' + redirectTemp
        }
      }
    })
    return redirectUrl
  }
  buildRoutes(routes)
  // 当默认首页被禁用时更新路由首页的重定向地址
  let homeDisabled = false
  menusRightList.some((menu) => {
    if (menu.flag === 'home' && menu.rightsState === 0) {
      homeDisabled = true
      return true
    }
    return false
  })
  if (homeDisabled) {
    let homePagePath = '/home'
    let homeRoute = null
    let minMenuSeqNo = 100
    routes.forEach((item) => {
      if (item.path === '/') {
        homeRoute = item
      }
      if (item.meta && item.meta.level === 1 && item.meta.rightsState !== 0) {
        if (item.meta.seqNo < minMenuSeqNo) {
          homePagePath = '/' + item.path.replace('/', '')
          minMenuSeqNo = item.meta.seqNo
        }
      }
    })
    homeRoute.redirect = homePagePath
  }

  resolve(routes)
})

export {
  routerMergeRight
}
