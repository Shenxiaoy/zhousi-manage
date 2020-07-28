<template>
  <div>
      <a-modal
        :title="title || '添加'"
        :visible='visible'
        @cancel='onCancel'
        @ok='onOk'
        :maskClosable='false'
        cancelText='取消'
        okText='确定'
        class="edit-modal-style"
      >
        <div class="modal-form-set">
          <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-form-item label='商品标题：' required>
              <a-input allow-clear v-model='ruleForm.name'></a-input>
            </a-form-item>
            <a-form-item label='商品描述：' required>
              <a-input allow-clear v-model='ruleForm.descri'></a-input>
            </a-form-item>
            <a-form-item label='库存：' required>
              <a-input v-model='ruleForm.count'></a-input>
            </a-form-item>
            <a-form-item label='商品图片：' required>
              <ImageUpload v-model='ruleForm.url'></ImageUpload>
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
  </div>
</template>

<script>
import ImageUpload from 'common/crud/components/upload/upload-image'
import API from 'API'
import {messageRule} from 'common/utils/businessCode'
export default {
  data () {
    return {
      visible: false,
      ruleForm: {
      }
    }
  },
  props: ['title', 'refreshTable', 'status'],
  components: {ImageUpload},
  methods: {
    onCancel () {
      this.visible = false
      this.ruleForm = {}
    },
    async onOk () {
      const ruleResult = messageRule(this.ruleForm, ['url', 'count', 'descri', 'name'])
      if (!ruleResult) {
        this.$message.warning('请填写表单必填内容！')
        return
      }
      if (this.status === 'add') {
      const result = await API.goodsSave(this.ruleForm)
      } else {
        const result = await API.goodsUpdate(this.ruleForm)       
      }
      this.refreshTable()
      this.$message.success('添加成功！')
      this.onCancel()

    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.edit-modal-style .ant-modal-body {
  padding: 0;
}
</style>