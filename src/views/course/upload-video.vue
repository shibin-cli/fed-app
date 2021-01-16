<template>
  <el-card class="video-upload">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="课程">
        <el-input
          v-model="form.name"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="课时">
        <el-input
          v-model="form.name"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="视频上传">
        <input
          type="file"
          ref="video"
        >
      </el-form-item>
      <el-form-item label="封面上传">
        <input
          type="file"
          ref="image"
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleUpload"
        >开始上传</el-button>
        <el-button @click="$router.back">返回</el-button>
      </el-form-item>
      <el-form-item label="上传进度">
        <el-progress
          type="circle"
          :status="uploadPercent===100?'success':undefined"
          :percentage="uploadPercent"
        ></el-progress>
      </el-form-item>
      <el-form-item label="转码进度">
        <el-progress
          type="circle"
          :status="transCodePercent===100?'success':undefined"
          :percentage="transCodePercent"
        ></el-progress>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { getImgUploadAddressAdnAuth, getTransCode, getTransCodePercent, getVideoUploadAddressAdnAuth } from '@/services/aliyun-upload'
import Vue from 'vue'
let uploader: any
let imgData: any
let videoData: any
let uploadAddressAuth: any
export default Vue.extend({
  name: 'UploadVideo',
  props: {
    courseId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      form: {
        name: '123'
      },
      uploadPercent: 0,
      transCodePercent: 0,
      uploadSuccess: false,
      transCodeSuccess: false
    }
  },
  created() {
    this.initUploader()
  },
  methods: {
    onSubmit() {
      console.log(123)
    },
    initUploader() {
      uploader = new window.AliyunUpload.Vod({
        userId: '1618139964448548',
        region: '',
        partSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        onUploadstarted: async (uploadInfo: any) => {
          console.log('开始上传', uploadInfo)
          if (uploadInfo.isImage) {
            const { data } = await getImgUploadAddressAdnAuth()
            imgData = uploadAddressAuth = data.data
            console.log(data)
          } else {
            const { data } = await getVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: imgData.imageURL
            })
            videoData = uploadAddressAuth = data.data
            videoData.fileName = uploadInfo.file.name
            console.log(data)
          }
          uploader.setUploadAuthAndAddress(uploadInfo, uploadAddressAuth.uploadAuth, uploadAddressAuth.uploadAddress, uploadAddressAuth.videoId || uploadAddressAuth.imageId)
        },
        onUploadSucceed: function (uploadInfo: any) {
          console.log('上传成功')
        },
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          console.log('上传失败')
        },
        onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
          console.log(uploadInfo, totalSize, loadedPercent)
          if (!uploadInfo.isImage) {
            this.uploadPercent = Math.floor(loadedPercent * 100)
            console.log(this.uploadPercent)
            if (this.uploadPercent === 100) {
              this.uploadSuccess = true
            }
          }
        },
        onUploadTokenExpired: function (uploadInfo: any) {
          console.log(uploadInfo)
        },
        onUploadEnd: async (uploadInfo: any) => {
          console.log('onUploadEnd', uploadInfo)
          const { data } = await getTransCode({
            lessonId: this.$route.query.lessonId,
            coverImageUrl: imgData.imageURL,
            fileName: videoData.fileName,
            fileId: videoData.videoId
          })
          const timer = setInterval(async () => {
            const { data } = await getTransCodePercent(this.$route.query.lessonId)
            console.log(data)
            this.transCodePercent = data.data
            if (data.data === 100) {
              this.transCodeSuccess = true
              this.$message.success('转码成功')
              clearInterval(timer)
            }
          }, 3000)
          console.log(data)
          this.$message.success('上传成功')
        }
      })
    },
    handleUpload(key: string, e: any) {
      this.uploadPercent = 0
      this.transCodePercent = 0
      this.uploadSuccess = false
      this.transCodeSuccess = false
      const paramData = '{"Vod":{}}'
      uploader.addFile((this.$refs.image as any).files[0], null, null, null, paramData)
      uploader.addFile((this.$refs.video as any).files[0], null, null, null, paramData)

      uploader.startUpload()
    }
  }
})
</script>

<style scoped>
.video-upload {
  width: 700px;
  margin: 0 auto;
  padding: 30px 30px 0 30px;
  text-align: center;
}
</style>
