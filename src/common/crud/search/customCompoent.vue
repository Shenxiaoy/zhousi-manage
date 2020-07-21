<script>
export default {
  data () {
    return {}
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['item', 'k', 'value'],
  methods: {
    compRender () {
      // const path = `../components/${item.widget}`
      const widget = require(`../components/${this.item.widget}.vue`).default
      return <widget value={this.value} onChange={this.change} item={this.item}></widget>
    },
    change (k) {
      this.$emit('change', k)
    }
  },
  render () {
    return this.compRender()
  }
}
</script>