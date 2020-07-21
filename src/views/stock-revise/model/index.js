import API from 'API'
import {getTreeData} from '@/common/utils/baseFunc'
const searchForm = {
  skuName: {
    label: '商品名称',
    widget: 'g-input',
    placeholder: '请输入商品名称',
    options: {
      // rules: [{required: true}]
    }
  },
  gomeSkuCode: {
    label: '国美SKU',
    widget: 'g-input',
    placeholder: '请输入国美SKU'
  },
  supplierSkuCode: {
    label: '商家SKU',
    widget: 'g-input',
    placeholder: '请输入商家SKU'
  },
  secondCategoryCode: {
    label: '二级分类',
    widget: 'gmSelect',
    optionsList: API.category,
    placeholder: '请选择二级分类',
    params: {
      level: 2
    },
    adapter: function (json) {
      const data = json.data.list
      return data.map(item => {
        return {
          label: item.categoryName,
          value: item.categoryCode
        }
      })
    }
  },
  thirdCategoryCode: {
    label: '三级分类',
    widget: 'gmSelect',
    placeholder: '请选择三级分类',
    optionsList: []
  },
  categoryCode: {
    label: '四级分类',
    widget: 'gmSelect',
    placeholder: '请选择四级分类',
    optionsList: []
  },
  brandCode: {
    label: '品牌',
    widget: 'gmSelect',
    placeholder: '请选择品牌',
    optionsList: API.brand,
    params: {},
    adapter: function (json) {
      const data = json.data.list
      return data.map(item => {
        return {
          label: item.brandName,
          value: item.brandCode
        }
      })
    }
  },
  barcode: {
    label: '商品条码',
    widget: 'g-input',
    placeholder: '请输入商品条码'
  },
  count: {
    label: '可卖数范围',
    widget: 'inputGroup',
    min: 0,
    max: 9999999,
    precision: 0
  },
  locations: {
    label: '仓库',
    widget: 'checkboxGroup',
    optionsList: API.locations,
    itemWidth: '300%'
  }
}
const searchConfig = {
  title: '查询',
  searchForm
}

const tableColumns = {
  skuName: {
    label: '商品信息',
    scopedSlots: {customRender: 'shopDetail'}
  },
  inventoryQuantity: {
    label: '库存数',
    scopedSlots: {customRender: 'inventoryQuantity'},
  },
  occupiedQuantity: {
    label: '占用数',
    scopedSlots: {customRender: 'occupiedQuantity'},
  },
  saleQuantity: {
    label: '可卖数',
    scopedSlots: {customRender: 'saleQuantity'},
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
    get: API.list,
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