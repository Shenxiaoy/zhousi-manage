import API from 'API'
import {getTreeData} from '@/common/utils/baseFunc'
const searchForm = {
  name: {
    label: '商品名称',
    widget: 'a-input',
    placeholder: '请输入商品名称',
    options: {
      // rules: [{required: true}]
    }
  },
  skuCode: {
    label: '商品代码',
    widget: 'a-input',
    placeholder: '请输入SKUID'
  }
}
const searchConfig = {
  title: '查询',
  searchForm
}

const tableColumns = {
  shopDetail: {
    label: '商品信息',
    scopedSlots: {customRender: 'shopDetail'}
  },
  price: {
    label: '单价'
  },
  count: {
    label: '库存'
  },
  categoryName: {
    label: '品类'
  },
  operation: {
    label: '操作',
    scopedSlots: {customRender: 'operation'},
  }
}
const tableConfig = {
  tableColumns
}
const modelConfig = {
  api: {
    get: API.getList,
    save: '',
    update: '',
    del: ''
  }
}
export default {
  searchConfig,
  tableConfig,
  modelConfig
}