import r from '../common/utils/request'
const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:9101' : `https://api.shenxiaoyu.cn/zhousi`
const baseUrl = `${origin}`

export default {
  /**
   * 商品列表
  */
 getList: r.get('goods/list', baseUrl),
 goodsSave: r.post('goods/superMarket/save', baseUrl),
 goodsDel: r.post('goods/superMarket/del', baseUrl),
 goodsUpdate: r.post('goods/superMarket/update', baseUrl)
}