import r from '../common/utils/request'
const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:9101' : `https://api.shenxiaoyu.cn/zhousi`
const baseUrl = `${origin}`

export default {
  downList: {
    url: `${baseUrl}/inventory/exportSupplierSellableQuantity`
  },
  upload: {
    url: `${baseUrl}/inventory/importMerchantSellableQuantity`
  },
  uploadFile: r.post('common/upload', baseUrl, {headers: {'content-type': 'multipart/form-data'}}),
  // 可买数管理
  list: r.post('inventory/findPageSupplierSellableQuantityManagement', baseUrl),
  // 库存数导入
  importFile: r.post('inventory/importMerchantSellableQuantity', baseUrl),
  // 导出
  exportFile: r.post('/inventory/exportSupplierSellableQuantity', baseUrl),
  // 修改
  update: r.post('/inventory/updateMerchantSellableQuantity', baseUrl),
  // 查询库存仓位
  locations: r.post('inventory/getSupplierLocations',baseUrl),
  // 下载模板
  downTemplate: {
    // url: `${baseUrl}/sku/files/download`,
    url: `${baseUrl}/sku/files/downLoadModel`,
  },
  downTemplateError: {
    url: `${baseUrl}/sku/files/download`,
  },
  // 二级菜单权限控制
  resources: r.get('user/auth/api/users/resources', origin),
  // 品类接口
  category: r.post('sku/common/getCategoryList', baseUrl),
  // 品牌接口
  brand: r.post('sku/common/getBrandList', baseUrl),

  /**
   * 商品列表
  */
 getList: r.get('goods/list', baseUrl),
 goodsSave: r.post('goods/superMarket/save', baseUrl),
 goodsDel: r.post('goods/superMarket/del', baseUrl),
 goodsUpdate: r.post('goods/superMarket/update', baseUrl)
}