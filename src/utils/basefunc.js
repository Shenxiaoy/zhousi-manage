// import FileSaver from 'file-saver'

// 转树形结构
const getTree = (rsdata) => {
  const getChilds = (menuPid) => {
    const childArr = []
    rsdata.forEach((item) => {
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

// 数组和对象去掉无效值
const removeEmptyField = obj => {
  let newObj = {}
  if (Array.prototype.isPrototypeOf(obj)) {
    // 去掉数组中元素为数字0、false、null、undefined、NaN、''的情况，不排除元素'0',' '
    newObj = []
    obj.forEach(item => {
      if (item) {
        newObj.push(item)
      }
    })
  } else if (obj instanceof Object) {
    // 去掉对象中值为''、null、undefined的情况，不排除值为'0',' ', NaN, false
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr) && obj[attr] !== '' && obj[attr] !== null && obj[attr] !== undefined) {
        if (obj[attr] instanceof Object) {
          newObj[attr] = removeEmptyField(obj[attr])
        } else if (typeof obj[attr] === 'string' && ((obj[attr].indexOf('{') > -1 && obj[attr].indexOf('}') > -1) || (obj[attr].indexOf('[') > -1 && obj[attr].indexOf(']') > -1))) {
          try {
            var attrObj = JSON.parse(obj[attr])
            if (attrObj instanceof Object) {
              newObj[attr] = removeEmptyField(attrObj)
            }
          } catch (e) {
            newObj[attr] = obj[attr]
          }
        } else {
          newObj[attr] = obj[attr]
        }
      }
    }
  }
  return newObj
}
// 数组去重 [1, 1, 2, 2, 2, 3]  ===> [1,2,3]
const unique = (arr) => {
  var x = new Set(arr)
  return [...x]
}
/**
 * 文件下载,minxin方式
 */
const downloadFile = {
  methods: {
    downloadGet (url) {
      const self = this
      const el = document.getElementById('fileIframe')
      if (el) {
        document.body.removeChild(el)
      }
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = url
      iframe.setAttribute('id', 'down-file-iframe')
      iframe.onload = function () {
        const ele = iframe.contentWindow.document.body
        if (ele) {
          try {
            const data = JSON.parse(ele.innerText)
            if (data && data.code) {
              self.$message.error(data.message || '您要下载的文件不存在！')
            }
          } catch (error) {
            self.$message.error('您要下载的文件不存在！')
          }
        }
        document.body.removeChild(iframe)
      }
      document.body.appendChild(iframe)
    },
    // downloadPost (fileName, content) {
    //   // 处理下载错误
    //   if (content.type === 'application/json') {
    //     const fr = new FileReader()
    //     fr.readAsText(content)
    //     fr.addEventListener('loadend', () => {
    //       try {
    //         const errRes = JSON.parse(fr.result)
    //         if (errRes && errRes.message) {
    //           this.$messageBig({
    //             message: errRes.message || '下载文件失败!!!',
    //             type: 'error'
    //           })
    //         }
    //       } catch (error) {
    //         this.$messageBig({
    //           message: '下载文件失败!!!',
    //           type: 'error'
    //         })
    //       }
    //     })
    //     return
    //   }

    //   // 下载文件
    //   if ('msSaveBlob' in navigator) { // 对IE和Edge的兼容
    //     window.navigator.msSaveBlob(content, fileName)
    //   } else {
    //     // eslint-disable-next-line standard/object-curly-even-spacing
    //     const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    //     FileSaver.saveAs(blob, fileName)
    //   }
    // },
    downloadByLink (url, fileName) {
      const a = document.createElement('a')
      a.style = 'display: none'
      a.href = url
      if (fileName) {
        a.download = fileName
      }
      document.body.appendChild(a)
      a.click()
      setTimeout(() => {
        document.body.removeChild(a)
      }, 5)
    },
    downloadByForm (url = '', method = 'get', params = null) {
      const $body = document.getElementsByTagName('body')[0]
      const form = document.createElement('form')
      form.action = url
      form.method = method
      Object.keys(params).forEach((key) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = params[key]
        form.appendChild(input)
      })
      $body.appendChild(form)
      form.submit()
    }
  }
}

const isIE = () => {
  // const navigatorName = 'Microsoft Internet Explorer'
  let flag = false
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    flag = true
  }
  return flag
}

/**
 * 判断浏览器是否支持某一个CSS3属性
 * @param {String} 属性名称
 * @return {Boolean} true/false
 */

function supportCss3 (style) {
  var prefix = ['webkit', 'Moz', 'ms', 'o']
  var i
  var humpString = []
  var htmlStyle = document.documentElement.style
  var _toHumb = function (string) {
    return string.replace(/-(\w)/g, function ($0, $1) {
      return $1.toUpperCase()
    })
  }

  for (i in prefix) { humpString.push(_toHumb(prefix[i] + '-' + style)) }

  humpString.push(_toHumb(style))

  for (i in humpString) { if (humpString[i] in htmlStyle) return true }

  return false
}

// 判断是否小于ie10
const isLessThanIE10 = () => {
  let flag = false
  // const d = document.documentElement.style
  // if (('flexWrap' in d) || ('WebkitFlexWrap' in d) || ('msFlexWrap' in d)) {
  //   flag = false
  // }
  flag = supportCss3('flex')
  return !flag
}

export {
  getTree, removeEmptyField, unique, downloadFile, isIE, isLessThanIE10
}
