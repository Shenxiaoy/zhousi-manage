<template>
  <div class="box1">
    <p class="demo-title">富文本编辑器-quill</p>
    <Editor v-model='content'
            height='200px'></Editor>
    <div class="html-show">
      <div class="show ql-container ql-snow">
        <div class="ql-editor"
             v-html="content"></div>
      </div>
    </div>
    <div>
      <p class="demo-title">拼图拖拽替换</p>
      <Drag></Drag>
    </div>
    <div>
      <p class="demo-title"></p>
    </div>
  </div>
</template>

<script>
import Editor from 'common/components/editor'
import Drag from './components/drag'
export default {
  components: { Editor, Drag },
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style>
.box1 .ql-editor img {
  max-width: 100%;
}
.html-show .ql-container {
  border: none;
}
.demo-title {
  margin: 10px;
  color: salmon;
}
</style>