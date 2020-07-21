import axios from 'axios'
import gomeUI from 'gome-ui'
// import store from '../store'
// import LoginCommon from './loginCommon'
const message = gomeUI.GMessage

axios.defaults.timeout = 30000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.desensmanager = 'http://10.203.169.49:8080/desensmanager'
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/commonApi'
  // axios.yuandong = 'http://100.120.10.18:8890'
} else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_CURRENTMODE === 'devbuild') {
  axios.defaults.baseURL = process.env.VUE_APP_BASE_URL ? process.env.VUE_APP_BASE_URL : 'http://isic-dims.sf-express.com/'
} else {
  // 接口根路径与域名一致，根据业务实际情况更改逻辑
  const host = window.location.host
  const protocol = window.location.protocol
  axios.defaults.baseURL = `${protocol}//${host}/`
}

// 登录验证
// LoginCommon.checkLogin()

// 全局Loading
let count = 0
let timeoutCount = 0
let notifyTimer = null
let iTime = null

axios.interceptors.request.use(
  (config) => {
    if (!config.notLoading) {
      count++
      // store.commit('setLoading', true)
    }
    // 解决ie浏览器get请求会取缓存数据的问题
    if (config.method === 'get') {
      if (config.url.indexOf('?') !== -1) {
        config.url = config.url + '&timestamp=' + new Date().getTime()
      } else {
        config.url = config.url + '?timestamp=' + new Date().getTime()
      }
    }
    return config
  }
  ,
  err => Promise.reject(err))

// 404 拦截处理、服务器异常等;
axios.interceptors.response.use(
  (response) => {

    const { code } = response.data

    count--
    if (response.data && response.data.code === 404) {
      window.location.href = '#/404'
    } else if (res.data.code === 500) {
      Message.error(res.data.errMsg || '服务器异常！');
    } else if (code === 900102002) {
      window.location.href = '#/login'
    }

    return response.data
  }, (error) => {
    console.log('ajax-error', error)
    count--
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      if (timeoutCount === 0) {
        timeoutCount++
        message.warning('请求超时')
        timeoutCount = 0
      }
    } else {
      if (iTime) {
        clearTimeout(iTime)
        iTime = null
      }
      iTime = setTimeout(() => {
        clearTimeout(iTime)
        iTime = null
        message.warning('服务器错误')
      }, 3000)
      return Promise.reject(error.toString())
    }
  })

export default axios
