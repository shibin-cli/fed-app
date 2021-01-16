<template>
  <el-card>
    <el-button @click="addRole">添加角色</el-button>
    <el-dialog
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <Edit
        v-if="dialogVisible"
        @success="onSuccess"
        @cancel="handleClose"
        :isEdit="isEdit"
        :role="currentRole"
      />
    </el-dialog>
    <el-table
      :data="roles"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        type="index"
        label="编号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
      ></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
      ></el-table-column>
      <el-table-column
        prop="createdTime"
        label="添加时间"
        width="200"
      >
        <template slot-scope="scope">{{
          scope.row.createdTime | formatTime
        }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-row>
            <el-button
              @click="
                $router.push({
                  name: 'AllocMenu',
                  params: { roleId: scope.row.id }
                })
              "
              type="text"
              size="small"
            >分配菜单</el-button>
            <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'AllocResource',
                  params: { roleId: scope.row.id }
                })
              "
            >分配资源</el-button>
          </el-row>
          <el-row>
            <el-button
              @click="handleEdit(scope.row)"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
            >删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script lang="ts">
import Vue from 'vue'
import Edit from './components/edit.vue'
import { getRoles } from '@/services/role'
import dayjs from 'dayjs'

export default Vue.extend({
  components: {
    Edit
  },
  data() {
    return {
      dialogVisible: false,
      roles: [],
      loading: false,
      roleId: null,
      isEdit: false,
      currentRole: {}
    }
  },
  filters: {
    formatTime(timestr: string) {
      return dayjs(timestr).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
      this.currentRole = {}
    },
    onSuccess() {
      this.loadRoles()
      this.handleClose()
    },
    addRole() {
      this.isEdit = false
      this.dialogVisible = true
    },
    handleEdit(row: any) {
      this.roleId = row.id
      this.isEdit = true
      this.currentRole = row
      this.dialogVisible = true
    },
    async loadRoles() {
      this.loading = true
      const { data } = await getRoles()
      this.loading = false
      this.roles = data.data
    }
  }
})

</script>
<style>
</style>
