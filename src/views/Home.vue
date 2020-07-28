<template>
  <div class='store-home'>
    <div class='header-layout-fixed'>
      <GmHeader></GmHeader>
    </div>
    <div class="dis-box">
      <Menu></Menu>
      <div class="flex-1">
        <div>
          <a-config-provider :locale="locale">
            <router-view></router-view>
          </a-config-provider>
        </div>
        <div
          class="footer"
          style="text-align: center;font-size: 12px;color: #909399;line-height: 44px"
        >
        Copyright 2011-2020 Gome All rights reserved. Proprietary and confidential. | v1.0.0 技术支持：国美供应链科技有限公司
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/menu"
import GmHeader from '@/components/Header'
import GmNavigation from '@/components/Navigation'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default {
  name: "Home",
  components: {
    Menu,
    GmHeader,
    GmNavigation
  },
  data () {
    return {
      locale: zhCN
    }
  }
};
</script>
<style lang="scss">
.store-home {
  background-color: rgb(245, 245, 245);
  min-height: 100vh;
}
.nav-head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 66px;
  z-index: 1000;
  background-image: radial-gradient(circle at 29% 55%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 4%,transparent 4%, transparent 44%,transparent 44%, transparent 100%),radial-gradient(circle at 85% 89%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 52%,transparent 52%, transparent 100%),radial-gradient(circle at 6% 90%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 53%,transparent 53%, transparent 64%,transparent 64%, transparent 100%),radial-gradient(circle at 35% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 6%,transparent 6%, transparent 98%,transparent 98%, transparent 100%),radial-gradient(circle at 56% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 16%,transparent 16%, transparent 23%,transparent 23%, transparent 100%),radial-gradient(circle at 42% 0%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 3%,transparent 3%, transparent 26%,transparent 26%, transparent 100%),radial-gradient(circle at 29% 28%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 75%,transparent 75%, transparent 100%),radial-gradient(circle at 77% 21%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 35%,transparent 35%, transparent 55%,transparent 55%, transparent 100%),radial-gradient(circle at 65% 91%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 46%,transparent 46%, transparent 76%,transparent 76%, transparent 100%),linear-gradient(45deg, rgb(83, 91, 235),rgb(76, 11, 174));
}

.dis-box {
    display: -ms-flexbox;      /* TWEENER - IE 10 */  
    display: -webkit-flex;     /* NEW - Chrome */  
    display: flex;  
    background-color: rgb(245, 245, 245);
    position: relative;
    top: 106px;
    .g-sider-menu {
      z-index: 2;
    }
    .menu-wrap {
      top: 100px;
      overflow: hidden;
    }
}
.flex-1{
    margin: 0 20px 0 19px;
    width: 100%;
    min-height: calc(100vh - 106px - 12px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .page-content-main {
      min-height: calc(100vh - 106px - 90px);
      background: white;
    }
}
.header-layout-fixed {
  // background:rgb(245, 245, 245);
  position: fixed;
  width: 100%;
  height: 106px;
  top: 0;
  left: 0;
  z-index: 100;
}


</style>
