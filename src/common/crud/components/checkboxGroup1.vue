<template>
  <div class="crud-checkboxGroup">
    <div style='width: 80px'>
      <a-checkbox :checked="checkAll" @change="onCheckAllChange">全部</a-checkbox>
    </div>
      <a-checkbox-group :value="value" :options="options" @change='change'></a-checkbox-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [],
      checkAll: false
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    item:{
      type: Object
    },
    value: {
    }
  },
  methods: {
    change (list) {
      this.checkAll = list && list.length === this.options.length
      this.$emit('change', list)
    },
    onCheckAllChange (e) {
      this.checkAll = e.target.checked
      if (e.target.checked) {
        const list = this.options.map(item => item.value)
        this.$emit('change', list)
      } else {
        this.$emit('change', [])
      }
    }
  },
  mounted () {
    const options = this.item.optionsList
    if (Array.isArray(options)) {
    this.options =  this.item.optionsList
    } else if (typeof options === 'function') {
      let ary = []
      options().then(json => {
        ary = json.data.map(item => {
          return {
            label: item.locationName,
            value: item.location
          }
        })
        this.options = ary
      })
    }
  },
  computed: {
  },
  watch: {
    value: function (val) {
      if (val === undefined) {
        this.checkAll = false
      }
    }
  }
}
</script>

<style scoped>
.crud-checkboxGroup {
  display: flex;
  align-items: baseline;
}
</style>