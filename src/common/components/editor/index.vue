<template>
  <div class="box">
    <quill-editor v-model="content"
                  :options='editorOption'
                  @blur='onEditorBlur($event)'
                  @focus='onEditorFocus($event)'
                  @ready="onEditorReady($event)"
                  @change="onEditorChange($event)"
                  ref='gomeQuill'
                  class="gome-quill"
                  :style="{height}">
    </quill-editor>
    <!-- <div class="ql-editor" v-html="content"></div> -->
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'
import quillTitle from './config/quill-title'
import toolbarOptions from './config/quill-utils'
import imageConfig from './config/image'
Quill.register('modules/imageResize', ImageResize)
export default {
  name: 'editor',
  props: {
    height: {
      type: String,
      default: '400px'
    },
    value: {
      type: String,
      default: ''
    }
  },
  model: {
    event: 'change',
    prop: 'value'

  },
  watch: {
    'value': {
      immediate: true,
      handler (val) {
        this.content = val
      }
    }
  },
  data () {
    return {
      content: ``,
      editorOption: {
        placeholder: '在此处编辑内容',
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: imageConfig
            }
          },
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        }
      }
    }
  },
  components: { quillEditor },
  methods: {
    onEditorBlur () {
    },
    onEditorFocus (event) {
      // event.enable(false)  // 禁止编辑
      // event.quill.getSelection(true).index // 编辑区文字的长度
    },
    onEditorReady () {
    },
    onEditorChange (event) {
      const content = event.html
      this.$emit('change', content)
    },
    getText () {
      return this.$refs.gomeQuill.quill.getText()
    }
  },
  created () {

  },
  mounted () {
    const quill = this.$refs.gomeQuill
    quillTitle(quill)
  }
}
</script>

<style>
.box {
  text-align: left;
  height: 100%;
  min-width: 600px;
}
.gome-quill {
  margin-bottom: 66px;
}
</style>