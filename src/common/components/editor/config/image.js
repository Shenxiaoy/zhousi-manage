import ajax from './ajax'
import {message} from 'ant-design-vue'
const token = getCookie('o2o_token')
const uploadConfig = {
  action: 'http://10.115.88.136:8003/files/uploadImage',
  method: 'post',
  token: '',
  name: 'img',
  size: 5 * 1024 * 1024,
  accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
  headers: {
    // 'X-Token': token
  }
}
function imageConfig () {
  const self = this

  let fileInput = this.container.querySelector('input.ql-image[type=file]')
  if (fileInput === null) {
    fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
  }
  if (uploadConfig.name) {
    fileInput.setAttribute('name', uploadConfig.name)
  }
  fileInput.setAttribute('accept', uploadConfig.accept)
  fileInput.classList.add('ql-image')
  fileInput.addEventListener('change', function () {
    const formData = new FormData()
    const file = fileInput.files[0]
    console.log(file.size, uploadConfig.size, 'type')
    if (file.size > uploadConfig.size) {
      // message({
      //   type: 'warning',
      //   message: '图片大小不能超过5MB！'
      // })
      message.warning('图片大小不能超过5MB！')
      return
    }
    formData.append('file', fileInput.files[0])
    if (uploadConfig.token) {
      formData.append('token', uploadConfig.token)
    }

    ajax({
      data: formData,
      url: uploadConfig.action,
      method: uploadConfig.method,
      headers: uploadConfig.headers
    }).then((json) => {
      const url = json.data
      let length = self.quill.getSelection(true).index
      self.quill.insertEmbed(length, 'image', url)
      self.quill.setSelection(length + 1)
    })
  })

  fileInput.click()
}
function getCookie (code) {
  let name = code
  let allcookies = document.cookie
  name += '='
  let pos = allcookies.indexOf(name)
  if (pos !== -1) {
    let start = pos + name.length
    let end = allcookies.indexOf(';', start)
    if (end === -1) end = allcookies.length
    let value = allcookies.substring(start, end)
    return (value)
  } else return ''
}
export default imageConfig