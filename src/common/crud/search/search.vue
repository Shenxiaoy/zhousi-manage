<template>
  <div class="g-panel-search">
    <g-form class="ant-advanced-search-form" @submit='handleSearch' :form='form'>
      <!-- <g-panel-title text='查询' /> -->
      <g-row type='flex' justify='start' style='margin-top: 18px'>
        <g-col :span='value.layout || 8' v-for='(value, key) in searchForm' :key='key'>
          <g-form-item :label='value.label'>
            <div v-if='isGui(value)' :style='{width: value.itemWidth || null}'>
              <component
                :is='value.widget'
                v-decorator='[key, value.options || null]'
                v-bind='value'
                autocomplete='off'
                allow-clear
                @change='searchItemChange($event, key)'
              ></component>
            </div>
            <CustomComp :style='{width: value.itemWidth || null}' v-decorator='[key, value.options || null]' v-else :item='value' :k='key' @change='searchItemChange($event, key)'></CustomComp>
          </g-form-item>
        </g-col>
      </g-row>
      <g-row type='flex' justify='end' class='search-but'>
        <g-col>
          <g-button style='marginRight: 12px' @click='handleReset'>重置</g-button>
          <!-- <g-button type="primary" html-type="submit">查询</g-button> -->
          <g-button type="primary" @click='handleSearch'>搜索</g-button>
        </g-col>
      </g-row>
    </g-form>
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
      const leg = /^g-\w+/
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

<style lang='scss' scoped>
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
}
</style>