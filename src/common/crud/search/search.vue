<template>
  <div class="g-panel-search">
    <a-form class="ant-advanced-search-form" @submit='handleSearch' :form='form'>
      <!-- <a-panel-title text='查询' /> -->
      <a-row type='flex' justify='start' style='margin-top: 18px'>
        <a-col :span='value.layout || 8' v-for='(value, key) in searchForm' :key='key'>
          <a-form-item :label='value.label'>
            <div v-if='isGui(value)' :style='{width: value.itemWidth || null}'>
              <component
                :is='value.widget'
                v-decorator='[key, value.options || []]'
                v-bind='value'
                autocomplete='off'
                allow-clear
                @change='searchItemChange($event, key)'
              ></component>
            </div>
            <CustomComp :style='{width: value.itemWidth || null}' v-decorator='[key, value.options || []]' v-else :item='value' :k='key' @change='searchItemChange($event, key)'></CustomComp>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type='flex' justify='end' class='search-but'>
        <a-col>
          <a-button style='marginRight: 12px' @click='handleReset'>重置</a-button>
          <!-- <a-button type="primary" html-type="submit">查询</a-button> -->
          <a-button type="primary" @click='handleSearch'>搜索</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import CustomComp from './customCompoent'
export default {
  name: 'search-model',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {
    CustomComp
  },
  computed: {
    searchForm: function () {
      return this.data.searchConfig && this.data.searchConfig.searchForm || {}
    }
  },
  mounted () {
  },
  methods: {
    handleSearch () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.data.paginationData.pageNum = 1
          this.data.query(values)
        }
      })
    },
    handleReset () {
      this.data._searchReset()
      this.form.resetFields()
      this.handleSearch()
    },
    isGui (item) {
      const leg = /^a-\w+/
      return leg.test(item.widget)
    },
    searchItemChange (result, key) {
      let value
      if (typeof result === 'object' && result.target && result.target.value) {
        value = result.target.value
      } else {
        value = result
      }
      this.data.handleSearchChange(value, key)
      
    }
  }
}
</script>

<style lang='scss'>
.g-panel-search {
  background-color: #ffffff;
  // box-shadow: 0px 3px 6px 0px rgba(84, 84, 84, 0.15);
  border: solid 1px #f4f4f4;
  .ant-advanced-search-form .ant-form-item {
    margin-bottom: 7px;
  }
  .search-but {
    border-top: solid 1px #f4f4f4;
    padding: 9px 14px;
  }
  .ant-form-item-control {
    text-align: left;
  }
  .ant-form-item-control {
  text-align: left;
  }
  .ant-form-item-control-wrapper {
    width: 51.9%;
    display: inline-block;
  }
  .ant-form-item-label {
    width: 120px;
  }
  .ant-form-item-label label {
    color: #606266;
  }
}
</style>