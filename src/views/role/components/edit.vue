<template>
  <el-form label-width="80px">
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="角色编码" prop="code">
      <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="loading"
        >确 定</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdate } from '@/services/role'
export default Vue.extend({
  props: {
    role: {
      type: Object
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        code: '',
        description: '',
        id: null
      },
      loading: false
    }
  },
  created() {
    this.form.name = this.role.name
    this.form.code = this.role.code
    this.form.description = this.role.description
    this.form.id = this.role.id
  },
  methods: {
    async onSubmit() {
      this.loading = true
      const { data } = await createOrUpdate(this.form)
      this.loading = false
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.$emit('success')
      } else {
        this.$message.error(data.mesg)
      }
    }
  }
})
</script>
<style>
</style>
