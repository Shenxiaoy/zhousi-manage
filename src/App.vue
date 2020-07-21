<template>
  <div id="app" class="bhs-stock">
    <router-view />
    <div class="stock-back-top">
      <BackTop></BackTop>
    </div>
  </div>
</template>
<script>
import BackTop from 'ant-design-vue/lib/back-top'
export default {
  components: {
    BackTop
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.bhs-stock {
  text-align: left;
  .ant-table-thead > tr > th {
    text-align: left;
    // padding-left: 16px;
  }
  .ant-table-tbody > tr > td {
    text-align: left;
  }
  // .ant-row {
  //   display: -webkit-box;
  // }
}
.stock-back-top .ant-back-top {
  background: white;
}
</style>
