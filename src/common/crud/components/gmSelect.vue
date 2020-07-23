<template>
  <div class="crud-gminput">
    <a-select :value='value' @change='change' :placeholder="item.placeholder || '请选择'" allowClear>
      <a-select-option v-for='(item, key) in options' :key='key' :value='item.value'>{{item.label}}</a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: []
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
    change (value) {
      console.log(value)
      this.$emit('change', value)
    },
    getOptions () {
      const {optionsList, adapter, params} = this.item
      if (Array.isArray(optionsList)) {
        this.options =  this.item.optionsList
      } else if (typeof optionsList === 'function') {
        let ary = []
        optionsList(params).then(json => {
          if (adapter) {
            ary = adapter(json)
          } else {
              ary = json.data.map(item => {
                return {
                  label: item.name,
                  value: item.value
                }
              })
          }
          this.options = ary
        })
      }
    }
  },
  mounted () {
  },
  computed: {
  },
  watch: {
    'item.optionsList': {
      handler (val) {
        this.getOptions()
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.crud-gminput {
  display: inline-block;
  width: 100%;
}
</style>