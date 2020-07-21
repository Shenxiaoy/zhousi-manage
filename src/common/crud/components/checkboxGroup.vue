<template>
  <div class="crud-checkboxGroup">
    <g-checkbox-group :value="value" :options="options" @change='change' :defaultValue='allChecked'></g-checkbox-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [],
      allChecked: []
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
      this.$emit('change', list)
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
          // this.allChecked.push(item.location)
          return {
            label: item.locationName,
            value: item.location
          }
        })
        this.options = ary
        // this.change(this.allChecked)
      })
    }
  },
  computed: {
  },
  watch: {
    value: function (val) {
    }
  }
}
</script>

<style scoped>
.crud-checkboxGroup {
  display: inline-block;
}
</style>