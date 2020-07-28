export const messageRule = function (obj, keys) {
  const formKeys = Object.keys(obj)
  const result = keys.find(k => {
    if (!formKeys.includes(k)) {
      return true
    }
  })
  if (result) {
    return false
  } else {
    return true
  }
}