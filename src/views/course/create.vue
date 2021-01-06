<template>
  <el-card>
    <div slot="header">
      <el-steps :active="activeStep">
        <el-step
          v-for="(step,index) in steps"
          :title="step.title"
          :icon="step.icon"
          @click.native="activeStep=index"
          :key="step.title"
        ></el-step>
      </el-steps>
    </div>
    <el-form label-width="110px">
      <div v-show="activeStep===0">
        <el-form-item label="课程名称">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input v-model="course.brief"></el-input>
        </el-form-item>
        <el-form-item label="课程概述">
          <el-input
            type="textarea"
            placeholder="概述1"
            v-model="course.previewFirstField"
          ></el-input>
          <el-input
            type="textarea"
            placeholder="概述2"
            v-model="course.previewSecondField"
          > </el-input>
        </el-form-item>
        <el-form-item label="讲师姓名">
          <el-input v-model="course.teacherDTO.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="course.teacherDTO.position"></el-input>
        </el-form-item>
        <el-form-item label="讲师简介">
          <el-input v-model="course.teacherDTO.description"></el-input>
        </el-form-item>
        <el-form-item label="课程概述">
          <el-input v-model="course.description"></el-input>
        </el-form-item>
        <el-form-item label="课程排序">
          <el-input-number v-model="course.sortNum"></el-input-number>
        </el-form-item>
      </div>
      <div v-show="activeStep===1">
        <el-form-item label="课程封面">
          <upload-img
            v-model="course.courseListImg"
            :limit="2"
          />
        </el-form-item>
        <el-form-item label="解锁封面">
          <upload-img
            v-model="course.courseImgUrl"
            :limit="2"
          />
        </el-form-item>
      </div>
      <div v-show="activeStep===2">
        <el-form-item label="售卖价格">
          <el-input
            v-model="course.discounts"
            type="number"
          ><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item label="商品原价">
          <el-input
            v-model="course.price"
            type="number"
          ><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input
            v-model="course.sales"
            type="number"
          ><template slot="append">单</template></el-input>
        </el-form-item>
        <el-form-item label="活动标签">
          <el-input v-model="course.discountsTag"></el-input>
        </el-form-item>
      </div>
      <div v-show="activeStep===3">
        <el-form-item label="显示秒杀开关">
          <el-switch
            v-model="course.activityCourse"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <template v-if="course.activityCourse">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="course.activityCourseDTO.beginTime"
              type="date"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="course.activityCourseDTO.endTime"
              type="date"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="秒杀价格">
            <el-input
              v-model="course.activityCourseDTO.amount"
              type="number"
            ><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="秒杀库存">
            <el-input
              v-model="course.activityCourseDTO.stock"
              type="number"
            ><template slot="append">单</template></el-input>
          </el-form-item>
        </template>
      </div>
      <div v-show="activeStep===4">
        <el-form-item label="秒杀库存">
          <el-switch
            v-model="course.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="课程详情">
          <TextEditor v-model="course.courseDescriptionMarkDown" />
        </el-form-item>
      </div>
      <el-form-item v-if="activeStep<4">
        <el-button @click="activeStep++">下一步</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button @click="createCourse">创建课程</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import Vue from 'vue'
import UploadImg from './components/uploadimg.vue'
import { saveOrUpdateCourse } from '@/services/course'
import TextEditor from '@/components/text-editor/index.vue'
export default Vue.extend({
  components: {
    UploadImg,
    TextEditor
  },
  data() {
    return {
      activeStep: 0,
      form: {
        name: '',
        test: ''
      },
      isSeckill: false,
      course: {
        courseName: '',
        brief: '',
        teacherDTO: {
          // courseId: '',
          position: '',
          teacherName: ''
        },
        previewFirstField: '',
        previewSecondField: '',
        description: '',
        sortNum: '',
        courseImgUrl: '',
        courseListImg: '',
        discounts: '',
        price: '',
        sales: '',
        activityCourse: false,
        discountsTag: '',
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: '',
          stock: ''
        },
        status: 0,
        courseDescriptionMarkDown: ''
      },
      steps: [
        { title: '基本信息', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-picture' },
        { title: '销售信息', icon: 'el-icon-upload' },
        { title: '秒杀活动', icon: 'el-icon-picture' },
        { title: '课程详情', icon: 'el-icon-picture' }
      ]
    }
  },
  methods: {
    async createCourse() {
      const { data } = await saveOrUpdateCourse({
        ...this.course
      })
      this.$message.success('创建成功')
      this.$router.back()
    }
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
