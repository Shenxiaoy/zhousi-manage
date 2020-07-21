import axios from './index'
// 业务日志查询接口
const businessLogList = (page, params) => axios.post(`${process.env.VUE_APP_SYSTEM}/log/businessLog/${page}`, params)
// 系统日志查询接口
const systemLogList = (page, params) => axios.post(`${process.env.VUE_APP_SYSTEM}/log/systemLog/${page}`, params)

// 系统配置信息查询接口
const systemConfigList = params => axios.get(`${process.env.VUE_APP_SYSTEM}/dict/list/companyName`, params)
// 系统配置信息新增/修改
const updateSystemConfig = params => axios.post(`${process.env.VUE_APP_SYSTEM}/dict/update/companyName`, params)

// 通知数据top5查询接口
const getNotifyList = params => axios.get(`${process.env.VUE_APP_SYSTEM}/log/businessLog/top5`, params)
// 查看全局邮件服务器的详情
const emailConfigView = params => axios.get(`${process.env.VUE_APP_SYSTEM}/emailConfig/getConfig`, params)
// 邮件服务器新增
const addEmailConfig = params => axios.post(`${process.env.VUE_APP_SYSTEM}/emailConfig/add`, params)
// 邮件服务器修改
const updateEmailConfig = params => axios.post(`${process.env.VUE_APP_SYSTEM}/emailConfig/update`, params)
// 邮件模板列表
const emailTemplateList = params => axios.get(`${process.env.VUE_APP_SYSTEM}/emailTemplate/list`, params)
// 获取邮件通知状态
const getEmailNotify = params => axios.get(`${process.env.VUE_APP_SYSTEM}/emailConfig/getNotify`, params)
// 更新邮件通知状态
const updateNotify = params => axios.get(`${process.env.VUE_APP_SYSTEM}/emailConfig/updateNotify`, { params })
// 邮件模板修改
const updateEmailTemplate = params => axios.post(`${process.env.VUE_APP_SYSTEM}/emailTemplate/update`, params)
// 更新通知信息已读未读
const updateMsgRead = params => axios.get(`${process.env.VUE_APP_SYSTEM}/log/updateMsgRead`, { params })
export {
  businessLogList,
  systemLogList,
  systemConfigList,
  updateSystemConfig,
  getNotifyList,
  emailConfigView,
  addEmailConfig,
  updateEmailConfig,
  emailTemplateList,
  getEmailNotify,
  updateNotify,
  updateEmailTemplate,
  updateMsgRead
}
