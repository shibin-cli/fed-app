<template>
  <div>
    <el-progress
      v-if="uploading"
      type="circle"
      :width="178"
      :percentage="uploadProgress"
      :status="uploadProgress===100?'success':undefined"
    ></el-progress>
    <el-upload
      v-else
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadImage"
    >
      <img
        v-if="value"
        :src="value"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      ></i>
    </el-upload>

  </div>

</template>
<script lang="ts">
import { uploadImg } from '@/services/course'
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      uploading: false,
      uploadProgress: 0
    }
  },
  methods: {
    beforeAvatarUpload(file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async uploadImage(options: any) {
      this.uploading = true
      const { data } = await uploadImg({
        file: options.file
      }, e => {
        this.uploadProgress = Math.floor(e.loaded / e.total * 100)
      })
      this.uploading = false
      this.uploadProgress = 0
      if (data.code === '000000') {
        this.$emit('input', data.data.name)
      }
      console.log(data)
    }
  }
})
</script>
<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
