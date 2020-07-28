<template>
  <GsliderMenu :data="menuData" />
</template>
<script>
import API from 'API'
import GsliderMenu from './gcomp/g-sider-menu'
// import gomeUI from 'gome-ui'
// const message = gomeUI.GMessage
const menuData = {
  defaultSelectedKeys: ['1'],
  data: [
    {
      key: "1",
      url: "/shop/list",
      title: "商品列表",
      iconClass: "menuicon iconfont icon-kucunweihu",
      code: 'inventory_defend'
    },
    {
      key: "2",
      url: "/shop/category",
      title: "商品分类",
      iconClass: "menuicon iconfont icon-kucunweihu",
      code: 'inventory_defend'
    }
  ]
};
export default {
  data() {
    return {
      // menuData: {
      //   defaultSelectedKeys: menuData.defaultSelectedKeys,
      //   data: []
      // }
      menuData
    };
  },
  methods: {
    getCodes (list, codes) {
      list.forEach(item => {
        codes.push(item.resourceCode)
        if (item.childrenResource) {
          this.getCodes(item.childrenResource, codes)
        }
      })
    }
  },
  components: {
    GsliderMenu
  },
  mounted () {
    // API.resources().then(json => {
    //   const data = json.data
    //   const result = data.find(item => item.resourceCode === 'inventory')
    //   let codes = []
    //   if (result && result.childrenResource) {
    //     this.getCodes(result.childrenResource, codes)
    //   }
    //   let ary = []
    //   menuData.data.forEach(item => {
    //     if (codes.includes(item.code)) {
    //       ary.push(item)
    //     }
    //   })
    //   this.menuData.data = ary
    // })
  }
};
</script>
<style lang='scss'>
.g-sider-menu .iconfont.menu-icon.menuicon {
  margin-right: 18px;
}
.ant-layout-sider-collapsed .menu-wrap{
  transition: .2s;
  overflow: hidden;
}
</style>
