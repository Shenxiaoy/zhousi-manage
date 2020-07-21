// function GetXmlHttpObject () {
//   let xhr = null
//   if (window.XMLHttpRequest) {
//     xhr = new XMLHttpRequest()
//   } else if (window.ActiveXObject) {
//     xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
//   }
//   if (xhr === null) {
//     alert('您的浏览器不支持ajax')
//     return false
//   }
//   return xhr
// }

// const handlerJump = (responseObj) => {
//   if (typeof responseObj === 'string') {
//     responseObj = JSON.parse(responseObj)
//   }
//   // responseObj.code === 25 ||
//   // 26: 未登录， 10405: lesence过期，10407：license不存在
//   // if (responseObj && (responseObj.code === 26 || responseObj.code === 10405)) {
//   if (responseObj) {
//     if (responseObj.code === 26) {
//       // 清除vuex用户信息是否存在
//       store.commit('setUserInfo', '')
//       const commonLoginUrl = '/#/login'
//       window.location.href = `${commonLoginUrl}`
//     } else if (responseObj.code === 10405 || responseObj.code === 10407) {
//       // 判断vuex用户信息是否存在
//       const userData = store.state.userInfo
//       if (userData) {
//         store.commit('setIsLicenseOverdue', true)
//       } else {
//         // license过期跳转至提示页
//         const redirectUrl = '/#/licenseOverdue'
//         window.location.href = `${redirectUrl}`
//       }
//     }
//   }
// }

function Login () {}

Login.prototype.checkLogin = function () {
  sessionStorage.url = window.location.href.split('?')[0]
  // let xhr = null
  // if (window.XMLHttpRequest) {
  //   xhr = XMLHttpRequest
  // } else if (window.ActiveXObject) {
  //   xhr = window.ActiveXObject
  // }
  // 原来的open方法
  const rawOpen = XMLHttpRequest.prototype.open
  // 重写open方法
  XMLHttpRequest.prototype.open = function (...args) {
    rawOpen.apply(this, args)

    // 自定义请求头（需要在open方法后调用）
    try {
      this.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      this.setRequestHeader('Cache-Control', 'no-cache')
    } catch (e) {
      console.log('e', e)
    }

    // // 允许跨域携带cookie
    this.withCredentials = true
    this.addEventListener('load', function () {
      // ie中aiax对象不存在responseURL属性，因此不再使用原生的方法进行校验
      if (this.responseURL) {
        // if (this.responseURL.indexOf('/logout') === -1 &&
        //   this.responseURL.indexOf('/doLogin') === -1 &&
        //   this.responseURL.indexOf('/captcha/init') === -1) {
        //   let responseObj = this.response
        //   handlerJump(responseObj)
        // }
      } else {
        console.log('----ajax对象responseURL属性为空------', this)
      }
    }, false)
  }
}

const LoginCommon = new Login()
export default LoginCommon
