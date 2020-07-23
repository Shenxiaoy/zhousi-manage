<template>
  <div>
    <slot name='search'>
      <SearchModel ref='searchModel' :data='modelConfig'></SearchModel>
    </slot>
    <div style='background: white; padding-top: 12px'>
      <slot name='top_button'></slot>
      <slot name='table' :model='modelConfig' :columns='modelConfig.tableColumns' :tableDataSource='modelConfig.tableDataSource' :loading='modelConfig.tableLoading'>
        <TableModel ref='tableModel' :data='modelConfig'></TableModel>
      </slot>
      <slot name='pagination'>
        <div class="crud-pagination" v-if='modelConfig.tableDataSource.length'>
            <a-pagination
              show-size-changer
              show-quick-jumper
              @showSizeChange="onShowSizeChange"
              @change="onShowSizeChange"
              :defaultCurrent="1"
              :total="total"
              :showTotal="total => `共 ${total} 条`"
              :current='modelConfig.paginationData.pageNum'
            />
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import SearchModel from './search/search'
import Model from './model/model'
import TableModel from './table'
export default {
  name: 'crud-model',
  data () {
    return {
      modelConfig: new Model(this.data)
    }
  },
  props: {
    data: {
      type: Object
    },
    searchMiddleware: {
      type: Function
    },
    searchChangeMiddleware: {
      type: Function
    },
    searchReset: {
      type: Function
    }
  },
  created () {
    this.modelConfig.searchMiddleware = this.searchMiddleware
    this.modelConfig.searchChangeMiddleware = this.searchChangeMiddleware
    this.modelConfig.searchReset = this.searchReset
    this.modelConfig.query()
  },
  computed: {
    total: function () {
      return this.modelConfig.paginationData.totalCount
    }
  },
  methods: {
    onShowSizeChange (current, pageSize) {
      this.modelConfig.paginationData.pageSize = pageSize
      this.modelConfig.paginationData.pageNum = current
      this.modelConfig.query()
    }
  },
  components: {
    SearchModel,
    TableModel
  },
  mounted () {
    this.modelConfig.refs.searchModel = this.$refs.searchModel
    this.modelConfig.refs.tableModel = this.$refs.tableModel
  }
}
</script>

<style lang='scss' scoped>
.crud-pagination {
  text-align: right;
  padding: 6px;
}
</style>