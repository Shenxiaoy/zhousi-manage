<template>
  <div>
    <g-table :columns='columns' :data-source='dataSource' :pagination='false'></g-table>
  </div>
</template>

<script>
export default {
  name: 'table-model',
  data () {
    return {

    }
  },
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    columns: function () {
      return this.data.tableColumns
    },
    dataSource: function () {
      return this.data.tableDataSource
    }
  }
}
</script>

<style lang='scss' scoped>

</style>