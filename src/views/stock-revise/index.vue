<template>
  <div>
    <div>
      <Breadcrumb breadcrumbPath='库存维护'></Breadcrumb>
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
          <g-dropdown :trigger="['click']">
            <g-button type='primary'>批量操作<g-icon type="down" /></g-button>
            <g-menu slot="overlay" @click='batchOperation'>
              <g-menu-item :key="2">批量导入库存</g-menu-item>
              <g-menu-item :key="1">导出查询结果</g-menu-item>
              <g-menu-item :key="3">下载模板</g-menu-item>
            </g-menu>
          </g-dropdown>
          <!-- <g-button type='primary' @click='handleDownList'>导出库存</g-button>
          <g-button type='primary' @click="butUpload">批量导入库存</g-button>
          <g-button type='link' style='float: right' @click='downloadTemplate'>下载模板</g-button> -->
        </div>
      </template>
      <template v-slot:table='scope'>
        <div>
          <g-table :columns='scope.columns' :data-source='scope.tableDataSource' :loading='scope.loading' :pagination='false'>
            <div slot='shopDetail' class="table--col-descri" slot-scope='text, record'>
              <div style='display: flex'>
                <img class="img" :src="record.skuImageUrl" alt="未加载">
                <div>
                    <div class="des">
                      <div class="des-desc">{{record.skuName}}</div>
                      <div class="color-disabled">
                        <div><div class="item-width">国美SKU：{{record.gomeSkuId}}</div></div>
                        <div><div class="item-width">品类：{{record.categoryName}}</div></div>
                      </div>
                      <div class="color-disabled">
                        <div><div class="item-width">商家SKU：{{record.merchantSkuId}}</div></div>
                        <div><div class="item-width">品牌：{{record.brandName}}</div></div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div slot='inventoryQuantity' slot-scope='text, record'>
              <div class='table-col-items' v-if='record.items.length <= 6'>
                <div v-for='(item, k) in record.items' :key='k'>{{item.locationName }}： {{item.inventoryQuantity}}</div>
              </div>
              <div v-else>
                <div v-for='(item, k) in record.items.slice(0, 6)' :key='k'>{{item.locationName }}： {{item.inventoryQuantity}}</div>
                <g-popover placement="bottom" trigger="hover">
                  <a>更多库存信息</a>
                  <template slot='content'>
                    <div class='table-popver-style'>
                      <a-table
                        :columns='popoverColumns'
                        :data-source='record.items'
                        :scroll="{y: 350}"
                        :pagination='false'
                      ></a-table>
                    </div>
                  </template>
                </g-popover>
              </div>
            </div>
            <div slot='occupiedQuantity' slot-scope='text, record'>
              <div class='table-col-items' v-if='record.items.length <= 6'>
                <div v-for='(item, k) in record.items' :key='k'>{{item.occupiedQuantity}}</div>
              </div>
              <div v-else>
                <div v-for='(item, k) in record.items.slice(0, 6)' :key='k'>{{item.occupiedQuantity}}</div>
                <div>...</div>
              </div>
            </div>
            <div slot='saleQuantity' slot-scope='text, record'>
              <div class='table-col-items' v-if='record.items.length <= 6'>
                <div v-for='(item, k) in record.items' :key='k'>{{item.saleQuantity}}</div>
              </div>
              <div v-else>
                <div v-for='(item, k) in record.items.slice(0, 6)' :key='k'>{{item.saleQuantity}}</div>
                <div>...</div>
              </div>
            </div>
            <div slot='operation' slot-scope="text, record">
              <g-button v-if='record.items.length' type='link' @click='handleEdit(record)'>编辑</g-button>
              <a v-else target="_blank" :href='warehouseUrl'><g-button type='link'>设置仓库</g-button></a>
              
            </div>
          </g-table>
        </div>
      </template>
      </CrudModel>
    </div>
    <div>
      <g-modal
        title="导入商品"
        :visible='visible'
        @cancel='onCancel'
        @ok='uploadFile'
        :maskClosable='false'
        cancelText='取消'
        okText='确定'
      >
        <div class="model-main">
          <div >
            <div style='width: 100%'>
              <g-upload
                :action='uploadConfig.url'
                :accept='uploadConfig.accept'
                :headers="uploadConfig.headers"
                :file-list='fileList'
                name='file'
                :beforeUpload='beforeUpload'
                @change='handleUpload'
                :remove='remove'
              >
              <div>
                <div style='display: inline-block'>上传文件：</div>
                <g-button type='primary'>选择文件</g-button>
                <div style='display: inline-block;'>（格式支持xls.xlsx,数据最多500条）</div>
              </div>
              </g-upload>
            </div>

            <div style="margin-top: 24px" v-if='uploadResponse.downloadPath'>
              <div style='width: 100%; border-bottom: 1px solid #ccc; margin-bottom: 12px;'></div>
              <p><span class="label-width">导入的数据：</span>{{uploadResponse.totalCount}}条</p>
              <p><span class="label-width">校验成功：</span>{{uploadResponse.successCount}}条</p>
              <div v-if='uploadResponse.downloadPath'>
                <p>
                  <span class="label-width">校验失败：</span>{{uploadResponse.errorCount}}条
                  <a @click="downloadErrorFile(uploadResponse.downloadPath)">
                    <g-button type="link"
                              size="small"
                              style="margin-left: 30px"><span class="tx-line">导出校验结果表单</span></g-button>
                  </a>
                </p>
              </div>
              <div style='color: red'>报表中数据需全部符合要求才能导入成功</div>
            </div>
          </div>

        </div>
      </g-modal>
      <g-modal
        title="编辑"
        :visible='editVisible'
        @cancel='eidtCancel'
        @ok='editOk'
        :maskClosable='false'
        cancelText='取消'
        okText='确定'
        class="edit-modal-style"
      >
        <div class="modal-form-set">
          <g-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <g-form-item v-for='(item, k) in lactionList' :key='k' :label='item.locationName' required>
              <g-input allow-clear v-model='item.inventoryQuantity'></g-input>
            </g-form-item>
          </g-form>
        </div>
      </g-modal>
    </div>
  </div>
</template>

<script>
import CrudModel from '@/common/crud'
import crudConfig from './model'
import API from 'API'
import gomeUI from 'gome-ui'
import gBU from 'ant-design-vue/lib/checkbox'
import gTable from 'ant-design-vue/lib/table'
import Breadcrumb from '@/components/Breadcrumb'

import {clickDownUrl} from '@/common/utils/baseFunc.js'
const message = gomeUI.GMessage

export default {
  data () {
    return {
      crudConfig,
      visible: false,
      editVisible: false,
      uploadConfig: {
        url: API.upload.url,
        accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        headers: {
          authorization: 'authorization-text'
        }
      },
      fileList: [
      ],
      uploadResponse: {},
      detailData: {},
      message,
      popoverColumns: [
        {
          dataIndex: 'locationName',
          key: 'locationName',
          title: '仓库名',
          width: 80
        },
        {
          dataIndex: 'inventoryQuantity',
          key: 'inventoryQuantity',
          title: '库存数'
        },
        {
          dataIndex: 'occupiedQuantity',
          key: 'occupiedQuantity',
          title: '占用数'
        },
        {
          dataIndex: 'saleQuantity',
          key: 'saleQuantity',
          title: '可卖数'
        }
      ]
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
    // 级联查询
    async searchChangeMiddleware (key, value, searchForm, searchModel) {
      if (key === 'secondCategoryCode') {
        searchModel.form.setFieldsValue({thirdCategoryCode: undefined, categoryCode: undefined})
        if (!value) {
          searchForm.categoryCode.optionsList = []
          searchForm.thirdCategoryCode.optionsList = []
          return
        }
        const json = await API.category({parentCode: value})
        const data = json.data.list
        searchForm.thirdCategoryCode.optionsList = data.map(item => {
          return {
            label: item.categoryName,
            value: item.categoryCode
          }
        })
        searchForm.categoryCode.optionsList = []
      } else if (key === 'thirdCategoryCode') {
        searchModel.form.setFieldsValue({categoryCode: undefined})
        if (!value) {
          searchForm.categoryCode.optionsList = []
          return
        }
        const json = await API.category({parentCode: value})
        const data = json.data.list
        searchForm.categoryCode.optionsList = data.map(item => {
          return {
            label: item.categoryName,
            value: item.categoryCode
          }
        })
      }
    },
    batchOperation (val) {
      const type = val.key
      if (type === 1) {
        this.handleDownList()
      } else if (type === 2) {
        this.butUpload()
      } else if (type === 3) {
        this.downloadTemplate()
      }
    },
    butUpload () {
      this.visible = true
      this.fileList = []
    },
    onCancel () {
      this.fileList = []
      this.uploadResponse = {}
      this.visible = false
      console.log(this.fileList)
      this.refreshTable()
    },
    onOk () {
      this.onCancel()
    },
    // 上传前校验
    beforeUpload (file) {
      this.fileList = [file]
      return false
    },
    handleUpload (content) {
      // let fileList = [content.file]
      // fileList = fileList.map(file => {
      //   if (file.response) {
      //     if (file.response.data.downloadPath) {
      //       this.uploadResponse = file.response.data || {}
      //     } else {
      //       message.success('导入成功！')
      //       this.onCancel()
      //     }
      //   }
      //   return file
      // })
      // this.fileList = fileList
    },
    // 上传文件请求
    uploadFile () {
      const formdata = new FormData()
      if (!this.fileList.length) {
        message.warning('请先上传文件！')
        return
      }
      formdata.append('file', this.fileList[0])
      API.uploadFile(formdata).then(json => {
        const data = json.data
        if (json.success === false) {
          message.error(json.msg)
        } else if (data && data.downloadPath) {
          this.uploadResponse = data
        } else if (json.success === true) {
           message.success('导入成功！')
           this.onCancel()
        }
      })
    },
    remove (file) {
      this.fileList = []
    },
    downloadErrorFile (href) {
      let params = {
        fileName: '国美商家导入结果异常信息',
        urlStr: href
      }
      let url = API.downTemplateError.url
      let ary = []
      Object.keys(params).forEach(k => {
        if (params[k]) {
          ary.push(`${k}=${params[k]}`)
        }
      })
      const str = ary.join('&')
      url = `${url}?${str}`
      clickDownUrl(url)
    },
    // 编辑弹层
    handleEdit (record) {
      this.detailData = JSON.parse(JSON.stringify(record))
      this.editVisible = true
    },
    eidtCancel () {
      this.editVisible = false
      this.detailData = {}
    },
    async editOk () {
      const params = this.detailData.items
      params.forEach(item => {
        item.skuId = this.detailData.gomeSkuId
      })

      const findInventoryQuantity = params.find(j => j.inventoryQuantity === '')
      if (findInventoryQuantity) {
        message.warning('仓库数不能为空！')
        return
      }

      const result = await API.update(params)
      if (result.ok) {
        this.message.success('修改成功！')
      } else {
        this.message.error(result.msg)
        return
      }
      this.eidtCancel()
      this.refreshTable()
    },
    handleDownList () {
      const params = {...this.$refs.crudmodel.modelConfig.queryData}
      params.pageNum = undefined
      params.pageSize = undefined
      let url = API.downList.url
      let ary = []
      Object.keys(params).forEach(k => {
        if (params[k]) {
          ary.push(`${k}=${params[k]}`)
        }
      })
      const str = ary.join('&')
      url = `${url}?${str}`
       console.log(ary, str, 'bbb')
      clickDownUrl(url)
    },
    downloadTemplate () {
      let params = {
        fileName: '国美商家库存导入模版',
        // urlStr: `http://gfs19.atguat.net.cn/T18MdgB7ZT1RCvBVdK.xlsx `,
        fileType: 5
      }
      let url = API.downTemplate.url
      let ary = []
      Object.keys(params).forEach(k => {
        if (params[k]) {
          ary.push(`${k}=${params[k]}`)
        }
      })
      const str = ary.join('&')
      url = `${url}?${str}`
       console.log(ary, str, 'bbb')
      clickDownUrl(url)
    }
  },
  components: {
    CrudModel,
    gBU,
    Breadcrumb,
    [gTable.name]: gTable
  },
  computed: {
    lactionList: function () {
      if (this.detailData.items) {
        const ary = this.detailData.items
        return ary
      } else {
        return []
      }
    },
    warehouseUrl: function () {
      const url = `${location.origin}/account/#/warehouse/index`
      return url
    }
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
    font-weight: bold;
    }
    width: 300px;
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
.edit-modal-style .ant-modal-body {
  padding: 0;
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