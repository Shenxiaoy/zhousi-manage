/*
* 1) 需在组件上定义拖拽容器的宽高大小样式；默认定义了子组件position: absolute;
* 2) 需自定义拖拽元素的绝对定位位置，跟dnd组件容器是父子关系；
* 3) 默认 isInsert props属性为 false，表示拖拽内容位置替换；设置isInsert = true ,表示拖拽内容的插入；
* 4) 在dnd上定义@reviseData ，可获取拖拽完毕后数据的顺序；
* 5) props 传入list，即拖拽数据array；
* 6) 
**/
<template>
  <div class="drop" ref="drop">
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'dnd',
  props: ['list'],
  data() {
    return {
      // list: [
      //   {
      //     id: 1,
      //     name: '无话'
      //   },
      //   {
      //     id: 2,
      //     name: '端口'
      //   },
      //   {
      //     id: 3,
      //     name: '框架'
      //   },
      //   {
      //     id: 4,
      //     name: '关闭'
      //   }
      // ],
      disX: '',
      disY: '',
      offseX: '',
      offsetY: '',
      curNode: null,
      cloneCurNode: null,
      box: null,
      isInsert: false
    }
  },
  methods: {
    _mousemove(e) {
      e.preventDefault()
      let x = e.clientX - this.disX
      let y = e.clientY - this.disY
      // 边界预留
      x = x <= 0 ? 0 : x
      x = x >= this.box.offsetWidth - this.curNode.offsetWidth ? this.box.offsetWidth - this.curNode.offsetWidth : x
      y = y <= 0 ? 0 : y
      y = y >= this.box.offsetHeight -this.curNode.offsetHeight ? this.box.offsetHeight - this.curNode.offsetHeight : y
      this.curNode.style.left = x + 'px'
      this.curNode.style.top = y + 'px'
      this.curNode.addEventListener('mouseover', this._mouseover)
    },
    _mouseup() {
      this.computedPos()
      this.box.removeEventListener('mousemove',  this._mousemove)
      this.box.removeEventListener('mouseup', this._mouseup)
    },
    // 位置移动
    arrMove(ary, moveIndex, downIndex) {
      let list = [...ary]
      if (moveIndex - downIndex > 0) {
        const moveItem = list.splice(moveIndex, 1)[0]
        list.splice(downIndex, 0, moveItem)
      } else if (moveIndex < downIndex) {
        const moveItem = list.splice(moveIndex, 1)[0]
        list.splice(downIndex - 1, 0, moveItem)
      }
      return list
    },
    // 拖拽计算
    computedPos() {
      const classList = Array.from(this.box.childNodes)
      let isSwap = false
      for(let k in classList) {
        const item = classList[k]
        if (item !== this.curNode) {
          const curl = parseInt(this.curNode.style.left)
          const curt = parseInt(this.curNode.style.top)
          const dropl = parseInt(item.style.left)
          const dropt = parseInt(item.style.top)
          // 位置拖拽交换
          if (((curl <= dropl) && ((dropl - curl) <= (item.offsetWidth)/2) ||
              (curl >= dropl) && ((curl - dropl) <= ((item.offsetWidth)/2))) &&
              ((curt <= dropt) && ((dropt - curt) <= ((item.offsetHeight)/2)) || 
              (curt >= dropt) && ((curt - dropt) <= ((item.offsetHeight)/2)))) {
                let pos = ''
                const data = [...this.list]
                classList.find((item, k) => {
                  if (item === this.curNode) {
                    pos = k
                    return true
                  }
                })
                // 插入
                if (this.isInsert) {
                  if ((curl <= dropl) && ((dropl - curl) <= (item.offsetWidth)/2)) {
                    const result = this.arrMove(data, pos, parseInt(k))
                    // this.list = result
                    console.log(result)
                    this.$emit('reviseData', result)
                  } else {
                    const result = this.arrMove(data, pos, parseInt(k) + 1)
                    // this.list = result
                    this.$emit('reviseData', result)
                  }
                  this.curNode.style.left = this.cloneCurNode.style.left
                  this.curNode.style.top = this.cloneCurNode.style.top
                  return
                }

                this.curNode.style.left = dropl + 'px'
                this.curNode.style.top = dropt + 'px'
                item.style.left = this.cloneCurNode.style.left
                item.style.top = this.cloneCurNode.style.top
                item.style.transition = 'all .4s'
                isSwap = true
                const replaceData = [...this.list]
                const temp = replaceData[pos]
                replaceData[pos] = replaceData[k]
                replaceData[k] = temp
                this.$emit('reviseData', replaceData)
                return
          }
        }
      }
      if (!isSwap) {
        this.curNode.style.left = this.cloneCurNode.style.left
        this.curNode.style.top = this.cloneCurNode.style.top
      }
    }
  },
  mounted() {
    const box = this.$refs.drop
    const _this = this
    box.addEventListener('mousedown', function(ev) {
      ev.preventDefault()
      const sort = ev.target.dataset.sort
      if (typeof sort === 'string') {
        ev.target.style.transition = null
        _this.curNode = ev.target
        _this.cloneCurNode = ev.target.cloneNode()
        _this.disX = ev.clientX - _this.curNode.offsetLeft
        _this.disY = ev.clientY - _this.curNode.offsetTop
        _this.box = box

        Array.from(box.childNodes).forEach(node => {
          node.classList.remove('curIndex')
        })
        _this.curNode.classList.add('curIndex')

        box.addEventListener('mousemove', _this._mousemove)
        box.addEventListener('mouseup', _this._mouseup)
      }
    })
  }
}
</script>

<style lang="scss">
.drop {
  text-align: left;
  background: darkcyan;
  position: relative;
  overflow: hidden;

  &>div {
    width: 50px;
    height: 50px;
    // background: saddlebrown;
    // float: left;
    position: absolute;
  cursor: move;
  }
}
.curIndex {
  z-index: 2;
}

</style>
