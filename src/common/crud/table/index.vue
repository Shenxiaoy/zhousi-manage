<template>
  <div>
    <a-table :columns='columns' :data-source='dataSource' :pagination='false'></a-table>
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