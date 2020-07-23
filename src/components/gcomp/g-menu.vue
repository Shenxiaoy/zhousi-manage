<script>
import GMenu from "ant-design-vue/lib/menu";
// import "ant-design-vue/lib/menu/style/css";

export default GMenu;
</script>
<style lang="scss">
.ant-menu,
.ant-menu-item > a,
.ant-menu-item > a:hover {
  color: #303133;
}

// .ant-menu-item > a.router-link-active {
//   color: #409eff;
// }

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #f4f4fc;
}

.ant-menu-sub.ant-menu-inline .ant-menu-item {
  height: 50px;
  line-height: 50px;
}

.ant-menu-inline .ant-menu-item {
  margin-top: 0;
  margin-bottom: 0;
}

.ant-menu-inline .ant-menu-item:not(:last-child) {
  margin-bottom: 0;
}

// .ant-menu-item-selected > a,
// .ant-menu-item-selected > a:hover {
//   color: #409eff;
// }

.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title,
.ant-menu-inline-collapsed > .ant-menu-item {
  padding: 0 20px !important;
}

.ant-menu-vertical .ant-menu-item,
.ant-menu-vertical .ant-menu-submenu-title {
  margin-top: 0;
  margin-bottom: 0;
}
.ant-menu-vertical .ant-menu-item:not(:last-child) {
  margin-bottom: 0;
}
.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
  height: 56px;
  line-height: 56px;
}

.ant-menu-inline .ant-menu-submenu-title {
  padding: 0;
  margin-bottom: 0;
  margin-top: 0;
}

.ant-menu-submenu-title {
  padding-left: 20px !important;
  text-align: left;
  line-height: 56px !important;
  height: 56px !important;
}

.ant-menu-inline .ant-menu-selected:after,
.ant-menu-inline .ant-menu-item-selected:after {
  left: 0;
  right: inherit;
}

.ant-menu-item {
  text-align: left;
  padding-left: 56px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGBAMAAAAS4vJ7AAAAD1BMVEXh4eHh4eHh4eHh4eHh4eGvjszWAAAABHRSTlPukQaJu9weVAAAABlJREFUCNdjUGQQYhBxcWZgcXEAYRAbJAYAH3ACrdaL5UUAAAAASUVORK5CYII=")
    no-repeat 40px center;
  background-size: 6px 6px;
}

.ant-menu-item-selected {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGBAMAAAAS4vJ7AAAAD1BMVEVGn/lGn/lGn/lGn/lGn/lt4UKIAAAABHRSTlPukQaJu9weVAAAABlJREFUCNdjUGQQYhBxcWZgcXEAYRAbJAYAH3ACrdaL5UUAAAAASUVORK5CYII=")
    no-repeat 40px center;
  background-size: 6px 6px;
}
.ant-menu-submenu-popup .ant-menu-item,
.ant-menu-submenu-popup .ant-menu-item-selected {
  background: none;
}

.ant-menu-item,
.ant-menu-submenu-title {
  transition: none;
}

.ant-menu-inline-collapsed {
  width: 54px;
}

.ant-menu-sub.ant-menu-inline > .ant-menu-item {
  padding-left: 56px !important;
}

.home-menu-item {
  height: 56px !important;
  line-height: 56px !important;
  padding-left: 20px !important;
  background-image: none !important;
  &:after {
    border-right: none;
  }
}

.ant-menu-horizontal .home-menu-item,
.ant-menu-horizontal .ant-menu-submenu-title {
  height: 44px !important;
  line-height: 44px !important;
}

.title-border-left {
  content: "" !important;
  position: absolute !important;
  width: 4px !important;
  border-left: 4px solid $themeColor !important;
  box-sizing: border-box !important;
  height: 56px !important;
  left: 0 !important;
  top: 0 !important;
}

.ant-menu-item:hover,
.ant-menu-submenu-title:hover {
  background-color: #f4f4fc;
  color: #303133 !important;
}

.ant-layout-sider-collapsed {
  .ant-menu-submenu-vertical.ant-menu-submenu-selected,
  .ant-menu-item.ant-menu-item-selected {
    position: relative;
  }
  .ant-menu-submenu-vertical.ant-menu-submenu-selected
    .ant-menu-submenu-title::before,
  .ant-menu-item.ant-menu-item-selected a::before {
    @extend .title-border-left;
  }
}

.ant-menu-inline-collapsed-tooltip.ant-tooltip-placement-right {
  .ant-tooltip-inner {
    background-color: #ffffff !important;
    text-align: center;
    a {
      color: #303133 !important;
    }
    i {
      display: none;
    }
  }
  .ant-tooltip-arrow {
    border-right-color: #ffffff !important;
  }
}

.ant-menu-submenu-popup {
  .ant-menu-item {
    &:hover {
      background-color: #f4f4fc;
    }

    height: 56px;
    line-height: 56px;
    padding-left: 36px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGBAMAAAAS4vJ7AAAAD1BMVEXh4eHh4eHh4eHh4eHh4eGvjszWAAAABHRSTlPukQaJu9weVAAAABlJREFUCNdjUGQQYhBxcWZgcXEAYRAbJAYAH3ACrdaL5UUAAAAASUVORK5CYII=")
      no-repeat 20px center;
    background-size: 6px 6px;
  }

  .ant-menu-item-selected {
    padding-left: 36px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGBAMAAAAS4vJ7AAAAD1BMVEVGn/lGn/lGn/lGn/lGn/lt4UKIAAAABHRSTlPukQaJu9weVAAAABlJREFUCNdjUGQQYhBxcWZgcXEAYRAbJAYAH3ACrdaL5UUAAAAASUVORK5CYII=")
      no-repeat 20px center;
    background-size: 6px 6px;
    background-color: #f4f4fc;
  }

  .ant-menu-vertical {
    .ant-menu-item-selected {
      position: relative;
      a::before {
        @extend .title-border-left;
      }
    }
  }
}

// .ant-menu-inline .ant-menu-item:after,
// .ant-menu-vertical-left .ant-menu-item:after,
// .ant-menu-vertical-right .ant-menu-item:after,
// .ant-menu-vertical .ant-menu-item:after {
//   border-right: 4px solid #409eff;
// }

.ant-menu-horizontal > .ant-menu-item-active,
.ant-menu-horizontal > .ant-menu-item:hover,
.ant-menu-horizontal > .ant-menu-submenu-active,
.ant-menu-horizontal > .ant-menu-submenu-open,
.ant-menu-horizontal > .ant-menu-submenu:hover {
  border-bottom: none;
  cursor: pointer;
}

.ant-menu-horizontal > .ant-menu-submenu {
  border-bottom: none;
}
</style>
