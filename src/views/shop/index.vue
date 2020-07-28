<template>
  <div>
    <div>
      <Breadcrumb breadcrumbPath='商品列表'></Breadcrumb>
    </div>
    <div class="page-content-main">
      <CrudModel
        :data='crudConfig'
        :searchMiddleware='searchMiddleware'
        :searchChangeMiddleware='searchChangeMiddleware'
        :searchReset='searchReset'
        ref='crudmodel'
      >
      <template slot='top_button'>
        <div class="top_button">
          <a-button type='primary' @click="handleAdd">添加商品</a-button>
           <a-button type='primary'>excel导入</a-button>
        </div>
      </template>
      <template v-slot:table='scope'>
        <div>
          <a-table :columns='scope.columns' :data-source='scope.tableDataSource' :loading='scope.loading' :pagination='false'>
            <div slot='shopDetail' class="table--col-descri" slot-scope='text, record'>
              <div style='display: flex'>
                <img class="img" :src="record.img_url" alt="未加载">
                <div>
                    <div class="des">
                      <div class="des-desc" style='font-weight: bold'>{{record.name}}</div>
                      <div class="des-desc">{{record.descri}}</div>
                      <div class="color-disabled">
                        <div><div class="item-width">skuId：{{record.skuCode}}</div></div>
                        <div><div class="item-width">品牌：{{record.brandName}}</div></div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div slot='operation' slot-scope='text, record'>
              <a-button  type='link' @click='handleDel(record)'>删除</a-button>
              <a-button type='link' @click='handleUpdate(record)'>修改</a-button>
            </div>
          </a-table>
        </div>
      </template>
      </CrudModel>
    </div>
    <div>
    </div>
    <AddForm ref='addForm' :refreshTable='refreshTable' :status='status'></AddForm>
  </div>
</template>

<script>
import CrudModel from '@/common/crud'
import crudConfig from './model'
import API from 'API'
import Breadcrumb from '@/components/Breadcrumb'
import {clickDownUrl} from '@/common/utils/baseFunc.js'
import AddForm from './components/addForm'

export default {
  data () {
    return {
      crudConfig,
      detailData: {},
      message: this.$message,
      status: 'add'
    }
  },
  methods:{
    refreshTable () {
      this.$refs.crudmodel.modelConfig.query()
    },
    searchMiddleware (data, list, crud) {
      if (data.count) {
        data.minNum = data.count.first
        data.maxNum = data.count.last
        data.count = undefined
      }
    },
    searchReset (searchForm) {
      searchForm.categoryCode.optionsList = []
      searchForm.thirdCategoryCode.optionsList = []
    },
    handleAdd () {
      this.status = 'add'
      this.$refs.addForm.visible = true
    },
    handleDel (record) {
      const _this = this
      this.$confirm({
        title: '对话框',
        content: '确认删除吗？',
        onOk () {
          _this._handleDel(record)
        }
      })
    },
    async _handleDel (record) {
      const data = await API.goodsDel({skuCode: record.skuCode})
      this.$message.success('删除成功！')
      this.refreshTable()
    },
    handleUpdate (record) {
      this.status = 'edit'
      this.$refs.addForm.visible = true
      record.url = record.img_url
      record.count = record.total_count
      this.$refs.addForm.ruleForm = record

    },
    // 级联查询
    async searchChangeMiddleware (key, value, searchForm, searchModel) {
    }
  },
  components: {
    CrudModel,
    Breadcrumb,
    AddForm
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style lang='scss'>
.tx-line {
  text-decoration: underline;
}
.top_button {
  text-align: left;
  margin-left: 10px;
  margin-bottom: 12px;
  button {
    margin-right: 12px;
  }
}
.model-main {
  min-height: 80px;
  max-height: 310px;
  // padding: 12px;
  .ant-upload-list, .ant-upload-list-text {
    display: block !important;
  }
}
.table--col-descri {
  .img {
    display: inline-block;
    width: 100px;
    height: 80px;
    border: 1px solid #e9e9e9;
  }
  .des {
    .des-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    }
    height: 100%;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .color-disabled {
      // color: #ccc;
      display: flex;
      justify-content: space-between;
      .item-width {
        width: 150px;
      }
    }
  }
}
.modal-form-set {
  padding: 24px 0;
  max-height: 310px;
  overflow-y: auto;;
  .ant-form-item {
    margin-bottom: 12px;
  }
  .ant-row {
    justify-content: flex-start;
  }
}
.table-col-items {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
// .ant-modal-body {
//   padding: 0!important;
// }
.table-popver-style {
  .ant-table-tbody > tr > td {
    text-align: left;
    padding: 10px 16px;
  }
  text-align: left;
  .ant-table-thead > tr > th {
    text-align: left;
    padding-left: 16px;
  }
  .ant-table-fixed-header .ant-table-scroll .ant-table-header {
    overflow-y: auto!important;
  }
  width: 350px;
}
</style>