
// 将canvas转换成base64的文字图片
const transformToImgFromText = (text, width = 80, height = 80) => {
  let fontsize = 24
  const cvs = document.createElement('canvas')
  const ctx = cvs.getContext('2d')
  if (ctx.measureText(text) && ctx.measureText(text).width) {
    fontsize = 24 * 30 / ctx.measureText(text).width
  }
  const cvsW = width
  const cvsH = height
  cvs.width = cvsW
  cvs.height = cvsH
  ctx.restore()
  ctx.fillStyle = '#6E52EE'
  // ctx.fillRect(0, 0, 100, 100)
  ctx.arc(cvsW / 2, cvsH / 2, cvsW / 2, 0, 2 * Math.PI)
  ctx.fill()
  ctx.save()
  ctx.restore()
  ctx.font = `${fontsize}px Verdana`
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, cvsW / 2, cvsH / 2)
  const data = cvs.toDataURL('image/png', 1)
  return data
}

export {
  transformToImgFromText
}
