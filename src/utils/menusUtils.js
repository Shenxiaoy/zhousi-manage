// import lodash from 'lodash'
import store from '@/store'
import { isIE } from '@/utils/basefunc'

// 转树形结构
const getMenusTree = (list) => {
  // 先进行排序
  list = lodash.orderBy(list, ['menuSeqNo'], ['asc'])
  const getChilds = (pid) => {
    const childArr = []
    list.forEach((item) => {
      if (item.menuPid === pid) {
        childArr.push(item)
        item.children = getChilds(item.id)
      }
    })
    if (childArr.length === 0) return null
    return childArr
  }
  return getChilds(0)
}

/**
 * 多角色合并权限（优先级为启用>只读>禁用）
 * @param data
 * @param options
 */
const mergeRolesRight = (userRole, roleList) => {
  if (!Array.isArray(userRole)) {
    return null
  }

  // 获取有效期内的角色集合
  const enabledRoles = []
  const currentTime = new Date().getTime()
  userRole.forEach((item) => {
    let startTime = item.startTime
    let endTime = item.endTime
    if (typeof item.startTime === 'string') startTime = parseInt(item.startTime)
    if (typeof item.endTime === 'string') endTime = parseInt(item.endTime)
    // 有效期内的角色
    if (startTime <= currentTime && endTime >= currentTime) {
      enabledRoles.push(item.roleId)
    }
  })

  if (!enabledRoles.length) {
    return null
  }

  const rightsList = []
  roleList.forEach((item) => {
    if (enabledRoles.indexOf(item.roleId) !== -1) {
      rightsList.push(item.roleRights)
    }
  })

  const rightsMerge = {}
  rightsList.forEach((item) => {
    let rights = item
    if (typeof item === 'string') rights = JSON.parse(item)
    Object.keys(rights).forEach((key) => {
      if (typeof rightsMerge[key] === 'undefined') {
        rightsMerge[key] = rights[key]
      } else {
        let rightsMergeVal = rightsMerge[key]
        let val = rights[key]
        if (typeof rightsMergeVal === 'string') rightsMergeVal = parseInt(rightsMergeVal)
        if (typeof val === 'string') val = parseInt(val)
        if (rightsMergeVal !== val) {
          rightsMerge[key] = val > rightsMergeVal ? val : rightsMergeVal
        }
      }
    })
  })
  return rightsMerge
}

/**
 * 根据菜单树及角色权限构建权限菜单树
 * @param data
 * @param handleAtSelf:操作数组本身
 * @return tree菜单树,list平级权限菜单,rights权限
 */
const buildAuthMenuData = (data, rights, options = { handleAtSelf: false }) => {
  let currentRoleRights = {}
  if (!rights || !data || !Array.isArray(data)) {
    return null
  }
  if (typeof rights === 'string') {
    currentRoleRights = JSON.parse(rights)
  } else {
    currentRoleRights = lodash.cloneDeep(rights)
  }
  let tree = null
  if (options.handleAtSelf) {
    tree = data
  } else {
    tree = lodash.cloneDeep(data)
  }

  const menuList = []

  const formatTree = (tree) => {
    let maxRight = 0
    if (Array.isArray(tree)) {
      tree.forEach((tr) => {
        if (tr && tr.children) {
          tr.rightsState = formatTree(tr.children)
          maxRight = getMaxNum(maxRight, tr.rightsState)
        } else {
          if (currentRoleRights[tr.id] === undefined) {
            tr.rightsState = 0
          } else {
            tr.rightsState = currentRoleRights[tr.id]
            maxRight = getMaxNum(maxRight, currentRoleRights[tr.id])
          }
        }
        const listItem = lodash.cloneDeep(tr)
        delete listItem.children
        menuList.push(listItem)
      })
    }
    return maxRight
  }

  formatTree(tree)

  let returnData = null
  returnData = { tree, list: menuList, rights: currentRoleRights }
  return returnData
}

const getMaxNum = (maxRight, num) => {
  if (maxRight === num) {
    return num
  }
  if (maxRight === 1 && num === 2) {
    return maxRight
  } else if (maxRight === 2 && num === 1) {
    return num
  } else {
    return (num > maxRight ? num : maxRight)
  }
}

const roleAuthMenuData = async (auths) => {
  if (!auths) return null
  const menuData = await store.dispatch('getMenusData')
  const rightMenuData = buildAuthMenuData(menuData.tree, auths)
  return rightMenuData
}

// 设置菜单栏背景选中动画效果
const setMenuActiveBg = (isInit = false, menuBg = null, menuItemActive = null) => {
  if (!menuBg || !menuItemActive) {
    return
  }
  let width = window.getComputedStyle(menuItemActive).width
  if (isIE()) {
    width = menuItemActive.clientWidth + 'px'
  }
  const left = window.getComputedStyle(menuBg).left.replace('px', '')
  let offsetLeft = menuItemActive.offsetLeft
  menuBg.style.width = width
  if (isInit) {
    menuBg.style.left = `${offsetLeft}px`
  } else {
    offsetLeft = offsetLeft - left
    menuBg.style.transform = `translateX(${offsetLeft}px)`
  }
}

export {
  getMenusTree,
  mergeRolesRight,
  buildAuthMenuData,
  roleAuthMenuData,
  setMenuActiveBg
}
