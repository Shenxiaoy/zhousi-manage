<script>
import gmenu from './g-menu'
import gmenuitem from './g-menu-item'
import gmenugroup from './g-menu-item-group'
import gsubmenu from './g-sub-menu' 
const GSiderMenu = {
  props: {
    data: Object
  },
  data() {
    return {};
  },
  methods: {},
  render() {
    const { data, openKeys, defaultSelectedKeys } = this.data;
    return (
      <a-layout-sider width="220" class="g-sider-menu" collapsible>
        <div class="menu-wrap">
          <gmenu
            defaultSelectedKeys={defaultSelectedKeys}
            openKeys={openKeys}
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
          >
            {data.map((menuItem, index) =>
              menuItem.url ? (
                <gmenuitem class="home-menu-item" key={menuItem.key}>
                  <router-link to={menuItem.url}>
                    <i class={`iconfont menu-icon ${menuItem.iconClass}`}></i>
                    {menuItem.title}
                  </router-link>
                </gmenuitem>
              ) : menuItem.items ? (
                <gsubmenu key={menuItem.key}>
                  <span slot="title">
                    <i class={`iconfont menu-icon ${menuItem.iconClass}`}></i>
                    {menuItem.title}
                  </span>
                  <gmenugroup>
                    <span slot="title">{menuItem.title}</span>
                    {menuItem.items.map((item, index) => (
                      <gmenuitem key={item.key}>
                        <router-link to={item.url}>{item.title}</router-link>
                      </gmenuitem>
                    ))}
                  </gmenugroup>
                </gsubmenu>
              ) : null
            )}
          </gmenu>
        </div>
      </a-layout-sider>
    );
  }
};
export default GSiderMenu;
</script>
<style lang="scss" scoped>
.g-sider-menu {
  background: #ffffff;
  box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.05);
  z-index: 2;
  .iconfont.menu-icon {
    margin-right: 16px;
  }
}
</style>
<style lang="scss">
.menu-wrap {
  max-width: 220px;
  width: 220px;
  position: fixed;
  height: 100%;
  left: 0;
  top: 66px;
}
.ant-layout-sider-collapsed {
  .menu-wrap {
    max-width: 54px;
    width: 54px;
  }
}
.ant-layout-sider-trigger {
  left: 220px;
  width: 16px !important;
  height: 40px;
  line-height: 40px;
  top: 345px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  opacity: 0.7;
}
.ant-layout-sider-collapsed {
  width: 54px !important;
  min-width: 54px !important;
  max-width: 54px !important;
}
.ant-layout-sider-collapsed .ant-layout-sider-trigger {
  left: 54px;
}
</style>
