/**
 * layout.vue公共组件里列表内容、分页功能 ，仅作参考，根据实际业务再做更改
 *
 */
const globalTable = {
  data () {
    return {
      dialogInit: false,
      dialogType: 'add',
      formForEdit: undefined,
      pageData: {
        pageNum: 1,
        pageSize: 10
      },
      searchform: null,
      tableData: {
        tableList: [],
        total: 0
      },
      multipleSelection: [] // table中list多选组成的数组
    }
  },
  watch: {
    'pageData.pageNum': {
      handler () {
        this.searchTask(this.searchform)
      },
      deep: true
    },
    'pageData.pageSize': {
      handler () {
        this.resetCurrentPage()
      },
      deep: true
    }
  },
  methods: {
    goSearch (val) {
      this.updateData()
    },
    reSet () {
      this.searchform = {}
      if (this.pageData.pageNum !== 1) {
        this.pageData.pageNum = 1
      } else {
        this.searchTask()
      }
    },
    showEdit (ctype, row) {
      if (ctype === 'add') {
        this.dialogType = 'add'
        // 每次点开新增即清空formForEdit
        this.formForEdit = undefined
      } else if (ctype === 'edit') {
        this.dialogType = 'edit'
        this.formForEdit = JSON.parse(JSON.stringify(row))
      } else {
        this.formForEdit = row
      }
      this.dialogInit = true
    },
    updateData (val) {
      let params = Object.assign({}, this.searchform, val)
      console.log('minxin的update')
      // this.goSearch(params)
      this.searchTask(params) // 新增编辑删除后停留在当前页
    },
    showChange (val) {
      this.dialogInit = val
    },
    getparams (val) {
      let params = {}
      if (JSON.stringify(val) !== '{}' && val !== undefined) {
        // console.log('val非空',val)
        params = Object.assign({}, this.pageData, val)
      } else {
        params = this.pageData
      }
      return params
    },
    resetCurrentPage () {
      if (this.pageData.pageNum === 1) this.searchTask(this.searchform)
      else this.pageData.pageNum = 1
    },
    handleSizeChange (size) {
      this.pageData.pageSize = size
    },
    handleCurrentChange (page) {
      this.pageData.pageNum = page
    },
    noDataJumpFirst (data) {
      if (data && data.list && !data.list.length && this.pageData.pageNum !== 1) {
        this.pageData.pageNum = 1
        // this.searchTask()
        return true
      }
      return false
    }
  }
}


// 定时器
const getRealTimeData = {
  data () {
    return {
      intervalTime: 5000,
      timer: null
    }
  },
  methods: {
    getRealData (funcArr) {
      if (this.timer) {
        clearInterval(this.timer)
      }
      funcArr.forEach(func => {
        func()
      })
      this.timer = setInterval(() => {
        for (let func of funcArr) {
          func()
        }
      }, this.intervalTime)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}



export {
  globalTable, getRealTimeData
}
