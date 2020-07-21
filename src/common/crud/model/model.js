import api from '@/apis/antv'

export default class CRUD {
  constructor (opt) {
    this.searchForm = opt.searchForm
    this.searchConfig = opt.searchConfig
    this.searchMiddleware = null
    this.searchChangeMiddleware = null
    this.queryData = {}
    this.searchReset = null

    this.tableConfig = opt.tableConfig
    this.tableColumns = getTableColumns(opt.tableConfig.tableColumns)
    this.tableDataSource = []
    this.tableLoading = false

    this.modelConfig= opt.modelConfig

    this.paginationData = {
      pageNum: 1,
      pageSize: 10,
      totalCount: 0
    }

    this.refs = {}
  }
  // 查询处理
  async query (data) {
    const pagination = {
      pageNum: this.paginationData.pageNum,
      pageSize: this.paginationData.pageSize
    }
    if (data) {
      this.queryData = data
    }
    this.queryData = Object.assign({}, this.queryData, pagination)
    this.searchMiddleware && this.searchMiddleware(this.queryData, this.tableDataSource, this)
    const requestApi = this.modelConfig.api
    this.tableLoading = true
    let settimeoutor = setTimeout(() => {
      this.tableLoading = false
      settimeoutor = null
    }, 5000);
    const result = await requestApi.get(this.queryData)
    this.tableLoading = false
    if (!result.data) {
      return
    }
    this.paginationData.totalCount = result.data.totalCount
    this.tableDataSource = result.data.list || result.data
  }

  // 查询change事件中间件处理
  handleSearchChange (value, key) {
    this.searchChangeMiddleware && this.searchChangeMiddleware(key, value, this.searchConfig.searchForm, this.refs.searchModel, this)
  }
  // 查询重置
  _searchReset () {
    this.searchReset && this.searchReset(this.searchConfig.searchForm)
  }

}

// 获取列表columns
function getTableColumns (obj) {
  const keys = Object.keys(obj)
  const tableColumns = keys.map(key => {
    return {
      key,
      dataIndex: key,
      title: obj[key].label,
      width: obj[key].width,
      scopedSlots: obj[key].scopedSlots,
      customRender: obj[key].customRender
    }
  })
  return tableColumns
}