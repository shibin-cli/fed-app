<template>
  <el-card>
    <div slot="header">
      <el-button
        size="small"
        @click="gotoEdit()"
      >添加广告位</el-button>
    </div>
    <el-table
      :data="adverts"
      style="width: 100%"
      v-loading="loading"
      border
    >
      <el-table-column
        prop="spaceKey"
        label="spaceKey"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告位名称"
      >
      </el-table-column>=
      <el-table-column label="创建时间"> <template slot-scope="scope">
          {{scope.row.startTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="更新时间"> <template slot-scope="scope">
          {{scope.row.startTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="gotoEdit(scope.row)"
            size="small"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="35%"
    >
      <el-form label-width="100px">
        <el-form-item label="广告位名称">
          <el-input v-model="currentAdSpace.name" />
        </el-form-item>
        <el-form-item label="spaceKey">
          <el-input v-model="currentAdSpace.spaceKey" />
        </el-form-item>
        <el-form-item>
          <el-button @click="calcelEdit">取 消</el-button>
          <el-button
            type="primary"
            @click="addAdSpace"
          >确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAllSpaces, saveOrUpdateAdSpace } from '@/services/advert'
import dayjs from 'dayjs'
export default Vue.extend({
  data() {
    return {
      adverts: [],
      loading: false,
      dialogVisible: false,
      currentAdSpace: {}
    }
  },
  filters: {
    formatDate(time: any) {
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  },
  created() {
    this.loadAdList()
  },
  methods: {
    async loadAdList() {
      this.loading = true
      const { data } = await getAllSpaces({
        // pageNum: 1,
        // pageSize: 10
      })
      this.loading = false
      this.adverts = data.content
    },
    async addAdSpace() {
      const { data } = await saveOrUpdateAdSpace({
        ...this.currentAdSpace
      })
      this.$message.success(`${(this.currentAdSpace as any).id ? '修改' : '新增'}成功`)
      this.loadAdList()
      this.dialogVisible = false
    },
    gotoEdit(row: any) {
      this.dialogVisible = true
      if (row) this.currentAdSpace = { ...row }
      else {
        this.currentAdSpace = {
          name: '',
          spaceKey: ''
        }
      }
    },
    calcelEdit() {
      this.currentAdSpace = {}
      this.dialogVisible = false
    }
  }
})
</script>

<style>
</style>
