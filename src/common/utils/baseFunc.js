/*
* 添加a标签点击事件
* */
export const clickDownUrl = function (url, k) {
  const id = k || 'aiddownloadcomplete'
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('id', id)
  // if (document.getElementById(id)) {
  //   document.body.removeChild(document.getElementById(id))
  // }
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById(id))
}

/*
* 通过所有层级数据组合成树结构数据
* */
export const getTreeData = function (data, parentCode, categoryCode) {
  const run = function (data) {
    for(let i = 0; i < data.length; i++) {
      const cur = data[i]
      for(let j = 0; j < data.length; j++) {
        const after = data[j]
        
        if (cur[parentCode] === after[categoryCode]) {
          if (after.children) {
            after.children.push(cur)
          } else {
            after.children = [cur]
          }
          data.splice(i, 1)
          i--
        } else {
          if (after.children) {
            const result = runr(data, i, cur, after.children)
            if (result) {
              data.splice(i, 1)
              i--
            }
          }
        }
      }
    }
  }
  const runr = function (data, i, cur, list) {
    const result = list.find(item => {
      if (cur[parentCode] === item[categoryCode]) {
        if (item.children) {
          item.children.push(cur)
        } else {
          item.children = [cur]
        }
        return true
      } else if (item.children) {
        runr(data, i, cur, item.children)
      } else {
        return false
      }
    })
    return result
  }
  run(data)
}