<template>
  <el-card>
    <el-form label-width="80px" :inline="true" :model="form" ref="form">
      <el-form-item label="手机号" prop="name">
        <el-input v-model="form.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="date">
        <el-date-picker
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="form.date"
          :picker-options="pickerOptions"
          :editable="false"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit"
          >查询</el-button
        >
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="users" style="width: 100%" border v-loading="loading">
      <el-table-column prop="name" label="用户名" width="180">
      </el-table-column>
      <el-table-column label="头像" width="150" align="center">
        <template slot-scope="scope">
          <el-avatar size="medium" :src="scope.row.portrait"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="createTime" label="注册时间" width="200">
        <template slot-scope="scope">{{
          scope.row.createTime | formatTime
        }}</template>
      </el-table-column>
      <el-table-column prop="id" label="用户id" width="180" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 'ENABLE'">启用</span>
          <span v-else-if="scope.row.status === 'DISABLE'" class="status-danger"
            >禁用</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini">禁用</el-button>
          <el-button size="mini" @click="allocRoleDialog(scope.row)"
            >分配角色</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-select v-model="checkedRoleId" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allocRole">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages } from '@/services/user'
import { getRoles, alloctRoles, getUserRole } from '@/services/role'
import dayjs from 'dayjs'
import { DatePicker, Form } from 'element-ui'
interface User {
  id: number
  name: string
  phone: string
  portrait: string
  createTime: string
  status: string
}
interface ResUser {
  records: Array<User>
  total: number
}
export default Vue.extend({
  data() {
    return {
      users: [],
      currentPage: 1,
      pageSize: 10,
      loading: false,
      total: 0,
      form: {
        phone: '',
        date: [undefined, undefined]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker: DatePicker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker: DatePicker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker: DatePicker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      dialogVisible: false,
      currentRow: null,
      roles: [],
      checkedRoleId: []
    }
  },
  filters: {
    formatTime(timestr: string) {
      return dayjs(timestr).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created() {
    this.loadUsers()
  },
  methods: {
    async loadUsers() {
      this.loading = true
      const { data } = await getUserPages<ResUser>({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        phone: this.form.phone,
        startCreateTime: this.form.date[0],
        endCreateTime: this.form.date[1]
      });
      (this.users as Array<User>) = data.data.records
      this.total = data.data.total
      this.loading = false
    },
    async loadRoles() {
      const { data } = await getRoles()
      console.log(data)
      this.roles = data.data
    },
    onSubmit() {
      this.currentPage = 1
      this.loadUsers()
    },
    allocRoleDialog(row: any) {
      this.dialogVisible = true
      this.currentRow = row
      this.loadRoles()
      this.loadRolesPermission()
      console.log(row)
    },
    handleSizeChange(val: number) {
      this.pageSize = val
      this.currentPage = 1
      this.loadUsers()
    },
    handleCurrentChange(val: number) {
      this.currentPage = val
      this.loadUsers()
    },
    resetForm(formName: string) {
      (this.$refs[formName] as Form).resetFields()
    },
    handleClose() {
      console.log('close')
      this.dialogVisible = false
    },
    async allocRole() {
      const { data } = await alloctRoles({
        userId: (this.currentRow as any).id,
        roleIdList: this.checkedRoleId
      })
      if (data.code === '000000') {
        this.$message.success('分配成功')
        this.dialogVisible = false
      }
    },
    async loadRolesPermission() {
      const { data: { data: userRoles } } = await getUserRole((this.currentRow as any).id)
      console.log(userRoles)
      this.checkedRoleId = userRoles.map((role: any) => role.id)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
  padding: 20px 0 10px;
}
.status-danger {
  color: red;
}
</style>
