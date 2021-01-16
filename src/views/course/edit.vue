<template>
  <div>
    <create-or-update-course isEdit :courseId="courseId"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import createOrUpdateCourse from './components/createOrUpdate.vue'
// import { saveOrUpdateCourse } from '@/services/course'

export default Vue.extend({
  name: 'CourseEdit',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    createOrUpdateCourse
  },
  methods: {
    // async createCourse() {
    //   const { data } = await saveOrUpdateCourse({
    //     ...this.course
    //   })
    //   this.$message.success('创建成功')
    //   this.$router.back()
    // }
  }
})
</script>
<style scoped lang="scss">
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
