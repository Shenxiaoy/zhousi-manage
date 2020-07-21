<template>
  <g-sider-menu :data="menuData" />
</template>
<script>
import API from 'API'
import gomeUI from 'gome-ui'
const message = gomeUI.GMessage
const menuData = {
  defaultSelectedKeys: ['1'],
  data: [
    {
      key: "1",
      url: "/stock-revise",
      title: "库存维护",
      iconClass: "menuicon iconfont icon-kucunweihu",
      code: 'inventory_defend'
    }
  ]
};
export default {
  data() {
    return {
      menuData: {
        defaultSelectedKeys: menuData.defaultSelectedKeys,
        data: []
      }
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
  mounted () {
    API.resources().then(json => {
      const data = json.data
      const result = data.find(item => item.resourceCode === 'inventory')
      let codes = []
      if (result && result.childrenResource) {
        this.getCodes(result.childrenResource, codes)
      }
      let ary = []
      menuData.data.forEach(item => {
        if (codes.includes(item.code)) {
          ary.push(item)
        }
      })
      this.menuData.data = ary
    })
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
// .ant-layout-sider {
//   background-color: #fff;
//   padding-bottom: 0;
//   .ant-menu {
//     height: 100%;
//     box-shadow: rgb(222, 222, 222) 0px 5px 15px 0px;
//     border-right: none;
//     .ant-menu-item {
//       height: 56px;
//       line-height: 56px;
//       padding-left: 20px;
//       background-image: none;
//       &.ant-menu-item-selected::after {
//         right: initial;
//         left: 0;
//         opacity: 1;
//         transform: scaleY(1);
//       }
//       .iconfont {
//         font-size: 18px;
//         margin-right: 16px;
//       }
//     }
//   }
// }
</style>
