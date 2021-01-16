<template>
  <el-card>
    <div slot="header">
      <el-button
        size="small"
        @click="$router.push({
        name:'AdvertCreate'
      })"
      >添加广告</el-button>
    </div>
    <el-table
      :data="adverts"
      style="width: 100%"
      v-loading="loading"
      border
    >
      <el-table-column
        prop="id"
        label="id"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="spaceName"
        label="广告位置"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="广告图片"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="height: 80px"
            :src="scope.row.img"
            fit="scale-down"
            :preview-src-list="[scope.row.img]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="时间"
      > <template slot-scope="scope">
          <p>开始时间：{{scope.row.startTime | formatDate}}</p>
          <p>到期时间：{{scope.row.endTime | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="上下线"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="changeStatus(scope.row)"
          >
          </el-switch>
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
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdList, getAllSpaces, updateStatus } from '@/services/advert'
import dayjs from 'dayjs'
export default Vue.extend({
  data() {
    return {
      adverts: [],
      loading: false
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
      const [adListData, spaceData] = await Promise.all([getAdList({}), getAllSpaces({})])
      this.loading = false
      const adList = adListData.data.content

      if (adListData.status === 200) {
        const spaceList = spaceData.data.content
        adList.forEach((ad: any) => {
          const space = spaceList.find((space: any) => space.id === ad.spaceId)
          if (space) {
            ad.spaceName = space.name
          }
        })
      }
      this.adverts = adList
    },
    async changeStatus(row: any) {
      const { data } = await updateStatus({
        id: row.id,
        status: row.status
      })
      this.$message.success(`${row.status === 0 ? '下线' : '上线'}成功`)
    },
    gotoEdit(row: any) {
      console.log(row)
      this.$router.push({
        name: 'AdvertEdit',
        params: {
          id: row.id
        }
      })
    }
  }
})
</script>

<style>
</style>
