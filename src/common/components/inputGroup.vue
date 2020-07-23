<template>
  <div class="crud-input">
    <a-input :value='first' @change="(e) => {change(e, 'first')}" style='width: 80px'></a-input> ~
    <a-input :value='last' @change="(e) => {change(e, 'last')}" style='width: 80px'></a-input>
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
    }
  },
  methods: {
    change (e, type) {
      const value = e.target.value
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
      console.log(val, 'vvvv')
      if (!val) {
        this.first = ''
        this.last = ''
        this.$emit('change', undefined)
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