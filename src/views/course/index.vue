<template>
  <el-card>
    <el-form
      inline
      slot="header"
      class="header"
    >
      <el-form-item label="课程名称">
        <el-input
          v-model="courseName"
          placeholder="请输入课程名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="status"
          placeholder="状态"
        >
          <el-option
            label="全部"
            value=""
          ></el-option>
          <el-option
            label="上架"
            value="1"
          ></el-option>
          <el-option
            label="下架"
            value="0"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="fnSearch"
        >查询</el-button>
      </el-form-item>
      <el-form-item class="add">
        <el-button
          icon="el-icon-plus"
          @click="$router.push({name:'CreateCourse'})"
        >新建课程</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="courses"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名称"
        align="center"
      >
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          ￥{{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column
        prop="sortNum"
        label="排序"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            @change="changeCourseState(scope.row)"
            :disabled="scope.row.loading"
            :active-value="1"
            :inactive-value="0"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        width="300"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="$router.push({name:'CourseEdit',params:{
            courseId:scope.row.id
          }})"
          >编辑</el-button>
          <el-button
            size="small"
            @click="$router.push({name:'CourseSection',params:{
            courseId:scope.row.id
          }})"
          >内容管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[10, 15, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { changeState, getCourses } from '@/services/course'
export default Vue.extend({
  data() {
    return {
      courses: [],
      loading: false,
      courseName: '',
      status: '',
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
    }
  },
  created() {
    this.loadCourses()
  },
  methods: {
    async loadCourses() {
      this.loading = true
      const { data } = await getCourses({
        ...this.page,
        courseName: this.courseName,
        status: this.status
      })
      this.loading = false
      this.page.total = data.data.total
      data.data.records.forEach((item: any) => {
        item.loading = false
      })
      this.courses = data.data.records
    },
    fnSearch() {
      this.page.currentPage = 1
      this.loadCourses()
    },
    handleSizeChange(val: number) {
      console.log(`每页 ${val} 条`)
      this.page.pageSize = val
      this.loadCourses()
    },
    handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`)
      this.page.currentPage = val
      this.loadCourses()
    },
    async changeCourseState(row: any) {
      row.loading = true
      const { data } = await changeState({
        courseId: row.id,
        status: row.status
      })
      row.loading = false
      if (data.code === '000000') {
        this.$message.success(`${row.status === 1 ? '上架' : '下架'}成功`)
      }
      console.log(data)
    }
  }
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  .add {
    margin-left: auto;
  }
}
.el-pagination {
  text-align: center;
  padding: 20px 0;
}
</style>
