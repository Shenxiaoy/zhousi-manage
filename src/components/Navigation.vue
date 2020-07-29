<template>
  <iframe
    ref="navigation"
    style="width: 100%; height: 50px; border: none;box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);"
    class="navi-cl"
  ></iframe>
</template>
<script>
export default {
  name: 'Navigation',
  data () {
    return {
       origin: window.location.origin // `http://10.115.6.21/`
    }
  },
  mounted() {
    const { navigation } = this.$refs;
    // navigation.src = `${this.origin}#/nav`;
    navigation.scrolling = 'no';
  },
};
</script>
<style scoped>
.navi-cl {
  background: white;
}
</style>
