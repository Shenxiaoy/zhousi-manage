<template>

  <iframe class="nav-iframe" ref="header"></iframe>

</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      origin: window.location.origin // `http://10.115.6.21/`
    }
  },
  mounted() {
    const { header } = this.$refs;
    // header.src = `${window.location.origin + process.env.VUE_APP_PUBLIC_PATH}#/header`;
    header.src = `${this.origin}#/header`
    header.scrolling = 'no';
  },
};
</script>
<style lang="scss">
.nav-iframe {
  width: 100%;
  height: 103px;
  overflow: hidden;
  border: none;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
}

</style>
