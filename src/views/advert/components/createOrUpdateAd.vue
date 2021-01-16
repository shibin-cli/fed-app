<template>
  <el-card>
    <el-form label-width="100px">
      <el-form-item label="广告名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="广告位置">
        <el-select
          v-model="form.spaceId"
          placeholder="请选择广告位置"
        >
          <el-option
            v-for="item in spaces"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="form.startTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="form.endTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">上线</el-radio>
          <el-radio :label="0">下线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片">
        <upload-img
          :value="form.img"
          @input="changeImg"
        />
      </el-form-item>
      <el-form-item label="广告链接">
        <el-input v-model="form.link" />
      </el-form-item>
      <el-form-item label="广告备注">
        <el-input
          type="textarea"
          v-model="form.text"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="saveAd"
        >提交</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAdById, getAllSpaces, saveOrUpdateAd } from '@/services/advert'
import UploadImg from '@/components/upload-img/index.vue'
export default Vue.extend({
  components: {
    UploadImg
  },
  props: {
    id: {
      type: [String, Number]
    }
  },
  data() {
    return {
      form: {
        img: ''
      },
      spaces: []
    }
  },
  created() {
    this.loadAd()
    this.loadSpace()
  },
  methods: {
    async loadAd() {
      if (!this.id) {
        return
      }
      const { data } = await getAdById(this.id)
      this.form = data.content
    },
    async loadSpace() {
      const { data } = await getAllSpaces({})
      this.spaces = data.content
    },
    changeImg(url: string) {
      this.form.img = url
    },
    async saveAd() {
      const { data } = await saveOrUpdateAd({
        ...this.form
      })
      this.$message.success('提交成功')
      console.log(data)
    }
  }
})
</script>
<style scoped>
.el-form {
  width: 900px;
  padding-left: 30px;
}
</style>
