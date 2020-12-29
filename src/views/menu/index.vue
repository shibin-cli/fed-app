<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'MenuCreate' })"
          >添加菜单</el-button
        >
      </div>
      <el-table :data="menus" style="width: 100%">
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="菜单名称"> </el-table-column>
        <el-table-column prop="level" label="菜单级数"> </el-table-column>
        <el-table-column prop="icon" label="前端图标"> </el-table-column>
        <el-table-column prop="orderNum" label="排序"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="editMenu(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteMenu(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getAllMenu, deleteMenu } from '@/services/menu'
import Vue from 'vue'
interface Menu {
  id: number
}
export default Vue.extend({
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.loadAllMenu()
  },
  methods: {
    async loadAllMenu() {
      const { data } = await getAllMenu()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    deleteMenu(index: number, row: Menu) {
      console.log(index, row)
      this.$confirm('确定删除吗？', '提示').then(async () => {
        const { data } = await deleteMenu(row.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadAllMenu()
        } else {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    editMenu() {
      console.log('编辑')
    }
  }
})
</script>

<style>
</style>
