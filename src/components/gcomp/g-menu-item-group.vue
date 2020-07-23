<script>
import GMenu from 'ant-design-vue/lib/menu';
import 'ant-design-vue/lib/menu/style/css';

export default GMenu.ItemGroup;
</script>

<style lang="scss">
.ant-menu-item-group-title > span {
  font-size: 10px;
}
.menu-wrap .ant-menu-item-group-title {
  display: none;
}
.ant-layout-sider-collapsed {
  .menu-wrap .ant-menu-item-group-title {
    display: block;
  }
}
.ant-menu-sub.ant-menu-inline .ant-menu-item {
  padding-left: 56px !important;
}
</style>
