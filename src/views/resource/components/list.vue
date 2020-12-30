<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form :inline="true" :model="form" class="demo-form-inline" ref="form">
        <el-form-item label="资源名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="资源名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input
            v-model="form.url"
            placeholder="资源路径"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select
            v-model="form.categoryId"
            placeholder="资源分类"
            prop="categoryId"
            clearable
          >
            <el-option
              :label="item.name"
              v-for="item in catetiries"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button @click="onReset" :disabled="loading">重置</el-button>
          <el-button type="primary" @click="onSubmit" :disabled="loading">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="resources" border style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="编号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="name" label="资源名称" width="200">
      </el-table-column>
      <el-table-column prop="url" label="地址"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column label="添加时间" width="200">
        <template slot-scope="scope">{{
          scope.row.createdTime | formatTime
        }}</template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click.native.prevent="editResource(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click.native.prevent="deleteResource(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :disabled="loading"
      :page-sizes="[10, 15, 20, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResource, getCategory } from '@/services/resource'
import dayjs from 'dayjs'
import { Form } from 'element-ui'

export default Vue.extend({
  data() {
    return {
      form: {
        name: '',
        url: '',
        categoryId: null
      },
      loading: false,
      resources: [],
      catetiries: [],
      page: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.loadResource()
    this.loadCategory()
  },
  filters: {
    formatTime(timestr: string) {
      return dayjs(timestr).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    async loadResource() {
      this.loading = true
      const { data } = await getResource({
        ...this.page,
        ...this.form
      })
      this.loading = false
      this.resources = data.data.records
      this.page.total = data.data.total
    },
    async loadCategory() {
      const { data } = await getCategory()
      this.catetiries = data.data
    },
    editResource(index: number, row: any) {
      console.log(index, row)
    },
    deleteResource(index: number, row: any) {
      console.log(index, row)
    },
    handleSizeChange(val: number) {
      this.page.size = val
      this.page.current = 1
      this.loadResource()
    },
    handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`)
      this.page.current = val
      this.loadResource()
    },
    onSubmit() {
      this.page.current = 1
      this.loadResource()
    },
    onReset() {
      (this.$refs.form as Form).resetFields()
      this.page.current = 1
      this.page.size = 10
      this.loadResource()
    }
  }
})
</script>

<style lang="scss" scoped>
.el-pagination {
  padding: 20px 0;
  text-align: center;
}
</style>
