<template>
  <div class="crud-input">
    <a-input-number :min='min' :max='max' :precision='precision' :value='first' @change="(e) => {change(e, 'first')}" style='width: 40%'></a-input-number> ~
    <a-input-number :min='min' :max='max' :precision='precision' :value='last' @change="(e) => {change(e, 'last')}" style='width: 40%'></a-input-number>
  </div>
</template>

<script>
export default {
  data () {
    return {
      first: '',
      last: ''
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value:{
      type: Object
    },
    item: {
      type: Object
    }
  },
  mounted () {
  },
  methods: {
    change (e, type) {
      const value = e
      this[type] = value
      const obj = {
        first: this.first,
        last: this.last
      }
      this.$emit('change', obj)
    }
  },
  watch: {
    'value': function (val) {
      if (!val) {
        this.first = ''
        this.last = ''
        this.$emit('change', undefined)
      }
    }
  },
  computed: {
    'min': function () {
      if (typeof this.item.min === 'number') {
        return this.item.min
      } else {
        return 0
      }
    },
    'max': function () {
      if (typeof this.item.max === 'number') {
        return this.item.max
      } else {
        return 99999999
      }
    },
    precision: function () {
      if (typeof this.item.precision === 'number') {
        return this.item.precision
      } else {
        return 2
      }
    }
  }
}
</script>

<style scoped>
.crud-input {
  display: inline-block;
}
</style>