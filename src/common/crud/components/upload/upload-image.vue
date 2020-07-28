<template>
  <div class="kaolou-upload-image">
    <a-upload
      :action='action'
      :accept='accept'
      :headers="headers"
      name='file'
      :beforeUpload='beforeUpload'
      @change='handleUpload'
      :remove='remove'
      :showUploadList='false'
      :data='uploadData'
    >
      <div v-if='onlyOneShow'>
        <div class="iamge-item" v-for="(item, k) in fileList" :key='k'>
          <img :src="item.url">
        </div>
      </div>
      <div class="upload-icon" v-else>
        <a-icon style='display: inline-block' type="cloud-upload" />
      </div>
    </a-upload>
  </div>
</template>

<script>

export default {
  data () {
    return {
      fileList: []
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    action: {
      type: String,
      default: 'http://upload-z2.qiniup.com'
    },
    accept: {
      type: String,
      default: 'image/*,.pdf'
    },
    headers: {
      type: Object,
      default: function () {
        return {
          token: 'valid'
        }
      }
    },
    limit: {
      type: Number,
      default: 1
    },
    value: {
      type: String
    }
    
  },
  methods: {
    beforeUpload (file) {
    },

    handleUpload (info) {
      let fileList = [...info.fileList]
      // this.fileList = fileList
      // 本地转base 64展示
      // fileList.forEach(item => {
      //   this.getBase64(item.originFileObj, item)
      // })
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = `http://qdt6mw3wh.bkt.clouddn.com/${file.response.key}`
        }
        return file
      })
      const urlList = fileList.map(item => item.url)
      if (this.limit === 1) {
        this.fileList = fileList.slice(-1)
        this.$emit('change', urlList[0])
      }
    
    },

    remove () {},
    getBase64 (img, item) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        item.url = reader.result
        this.fileList = [item]
      })
      reader.readAsDataURL(img)
    }
  },
  computed: {
    onlyOneShow: function () {
      if (this.limit === 1 && this.fileList.length === this.limit) {
        return true
      } else {
        return false
      }
    },
    uploadData: function () {
      return {
        token: '9h5kHWHnr20ObcQ45Efmw7Y2J8Dn_0lvl6ch0cTZ:nzSSxVrToZykZpLETp9W01puJ2I=:eyJzY29wZSI6Inpob3VzaWkiLCJkZWFkbGluZSI6MTYyNzExODQ4N30='
      }
    }
  },
  watch: {
    'value': {
      handler: function (val) {
          console.log(val, 'fffffffffffff')
          if (!val) {
            this.fileList = []
          } else {
            if (Array.isArray(val)) {
              this.fileList = val.map((item, k) => {
                return {
                  url: item,
                  response: item,
                  uid: k
                }
              })
            } else if (typeof val === 'string') {
              this.fileList = [{
                url: val,
                uid: 1,
                response: {url: val},
                status: 'done',
                name: 'xxx'
              }]
            }
          }
     },
     immediate: true
    }
  }
}
</script>

<style lang='scss' scoped>
.kaolou-upload-image {
  .upload-icon {
    width: 100px;
    height: 100px;
    border: 1px dashed darkgray;
    font-size: 18px;
    color:darkgreen;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .iamge-item {
    width: 100px;
    height: 100px;
    display: inline-block;
    margin-right: 12px;
    img {
      display: inline-block;
      width: 100px;
      height: 100px;
      &:hover {
        cursor: pointer;
        filter:blur(1px)
      }
    }
  }
}
</style>