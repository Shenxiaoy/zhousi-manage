<template>
  <div class="layout-readcrumb">
    <i class="iconfont icon-dizhi"></i>
    当前位置：
    <a-breadcrumb separator=">">
      <a-breadcrumb-item v-for="(item, index) of paths" :key="index">
        <router-link v-if="item.path" :to="item.path">{{item.title}}</router-link>
        <template v-else>{{item.title}}</template>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
  props: {
    breadcrumbPath: [String, Array, Object],
  },
  computed: {
    paths() {
      if (this.breadcrumbPath) {
        if (typeof this.breadcrumbPath === 'string') {
          return [{
            title: this.breadcrumbPath,
          }];
        }
        if (Array.isArray(this.breadcrumbPath)) {
          return this.breadcrumbPath.map((item) => {
            if (typeof item === 'string') {
              return {
                title: item,
              };
            }
            return item;
          });
        }
        return [this.breadcrumbPath];
      }
      return [{
        title: this.$route.meta.title,
      }];
    },
  },
};
</script>
<style lang="scss" scoped>
.layout-readcrumb {
  height: 44px;
  line-height: 44px;
  // padding-left: 18px;
  color: #606266;
  display: flex;
  .icon-dizhi {
    font-size: 16px;
    margin-right: 6px;
  }
  .ant-breadcrumb {
    line-height: 44px;
    color: #303133;
    a {
      color: #303133;
      &:hover{
        text-decoration: underline;
      }
    }
    ::v-deep{
      > span:last-child {
        color: #303133;
      }
    }
  }
}
</style>
