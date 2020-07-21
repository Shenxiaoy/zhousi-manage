import axios from './index'

const doLogin = params => axios.post(`${process.env.VUE_APP_SYSTEM}/doLogin`, params)
// const doLogin = params => axios.post(`${axios.jieying}/doLogin`, params)
const doLogout = params => axios.get(`${process.env.VUE_APP_SYSTEM}/logout`, { params })
const captcha = params => axios
  .get(`${process.env.VUE_APP_SYSTEM}/captcha/init`, {
  // .get(`${axios.jieying}/captcha/init`, {
    responseType: 'arraybuffer'
  })
  .then(data => {
    return 'data:image/png;base64,' + btoa(
      new Uint8Array(data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
  }).then(data => {
    return data
  })
// const captcha = params => fetch('http://100.120.10.18:8083/captcha/init', {
//   method: 'get',
//   responseType: 'arraybuffer'
// }).then(res => {
//   return res.arrayBuffer()
// }).then(data => {
//   return 'data:image/png;base64,' + btoa(
//     new Uint8Array(data)
//       .reduce((data, byte) => data + String.fromCharCode(byte), '')
//   )
// }).then(data => {
//   return data
// })
export {
  doLogin,
  captcha,
  doLogout
}
