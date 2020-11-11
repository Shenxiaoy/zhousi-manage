<template>
  <div class="home">
    <Dnd :list="list" @reviseData="reviseData" class="dnd-box">
      <div
        v-for="(item, index) in list"
        :key="index"
        :data-sort="index"
        :style="posStyle(index)"
        class="dnd-model"
      >
        {{ item.name }}
      </div>
    </Dnd>
  </div>
</template>

<script>
// @ is an alias to /src
import Dnd from '@/common/components/drag/dnd.vue'
export default {
  name: 'Home',
  data () {
    return {
      list: [
        {
          id: 1,
          name: '1'
        },
        {
          id: 2,
          name: '2'
        },
        {
          id: 3,
          name: '3'
        },
        {
          id: 4,
          name: '4',
        },
                {
          id: 4,
          name: '5',
        },        {
          id: 4,
          name: '6',
        },        {
          id: 4,
          name: '7',
        },        {
          id: 4,
          name: '8',
        },        {
          id: 4,
          name: '9',
        }
      ],
      isInsert: false
    }
  },
  components: {
    Dnd
  },
  methods: {
    reviseData (data) {
      console.log(data, '@reviseData')
      // this.list = data
    },
    posStyle (key) {
      // {left: (index*60 + 'px'), top: '0px'}
      let left = 0 
      let top = 0
      let background = this.randomColor()
      if (key%3 === 0) {
        left = '30px'
      } else if (key%3 === 1) {
        left = (30 * 2 + 50) + 'px'
      } else {
        left = (80 * 2 + 30) + 'px'
      }
      const rowCount = Math.ceil((key + 1)/3)
      top = (rowCount - 1) * 80 + 30
      const style = {left: left, top: `${top}px`, 'backgroundColor': background}

      return style
    },
    randomNum (m, n) {
      return Math.floor(Math.random() * (n - m + 1) + m);
    },
    randomColor() {
      var r = this.randomNum(0, 255);
      var g = this.randomNum(0, 255);
      var b = this.randomNum(0, 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
  }
}
</script>
<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}
.dnd-box {
  width: 300px;
  height: 300px;
}
.dnd-model {
}
</style>
