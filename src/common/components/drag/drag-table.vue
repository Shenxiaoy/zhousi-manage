// element-ui table组件的使用
<template>
  <div class="dek-list">
    <el-table :data='tableData'>
      <el-table-column v-for="(item, key) in tableColumns"
                       :key='key'
                       :prop="key"
                       :label='item.name'>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    noDrag: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.getDragArea('once')
  },
  watch: {
    noDrag: {
      handler: function (value) {
        this.$nextTick(() => this.getDragArea())
      }
    }
  },
  methods: {
    onDragOver (ev) {
      ev.preventDefault()
    },
    onDragStart (index, ev) {
      ev.dataTransfer.setData('text', index)
    },
    onDrop (index, ev) {
      const dragSort = ev.dataTransfer.getData('text')
      const curSort = index
      const list = [...this.tableData]
      const temp = list[dragSort]
      list[dragSort] = list[curSort]
      list[curSort] = temp
      this.tableData = list
    },
    getDragArea (type) {
      const box = document.querySelector('.dek-list')
      const dragcontent = box.querySelector('.el-table__body-wrapper tbody')
      const childs = dragcontent.children
      const childsArray = [...childs]
      childsArray.forEach((item, index) => {
        if (!this.tableData[index].drag) return
        if (this.noDrag) {
          item.setAttribute('draggable', false)
          item.classList.remove('row-drag')
          // item.removeEventListener('dragstart', this.onDragStart)
          // item.removeEventListener('dragover', this.onDragOver)
          // item.removeEventListener('drop', this.onDrop)
          return
        }
        item.setAttribute('draggable', 'true')
        item.classList.add('row-drag')
        if (type === 'once') {
          item.addEventListener('dragstart', this.onDragStart.bind(this, index))
          item.addEventListener('dragover', this.onDragOver)
          item.addEventListener('drop', this.onDrop.bind(this, index))
        }

      })

      // dragcontent.addEventListener('dragover', function (e) {
      //   e.preventDefault()
      // })
    }
  },
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '森林狼',
          address: 'amewlwwlwl',
          id: 1,
          drag: true
        },
        {
          date: '2020-05-02',
          name: '电动阀',
          address: 'amewlwwlwl',
          id: 2,
          drag: true
        },
        {
          date: '2022-6-23',
          name: '搜喔',
          id: 4
        },
        {
          date: '2022-05-02',
          name: '各行业',
          address: 'amewlwwlwl',
          id: 3,
          drag: true
        }
      ],
      tableColumns: {
        date: {
          name: '日期'
        },
        name: {
          name: '姓名'
        },
        address: {
          name: '地址'
        },
        sll: {
          name: '考试实施'
        }
      }
    }
  }
}
</script>

<style>
.dek-list .el-table tbody .row-drag {
  background: #ebf9ff;
}
.dek-list .el-table tbody .row-drag:hover > td {
  background-color: #ebf9ff;
}
</style>