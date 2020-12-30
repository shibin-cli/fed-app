<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ isEdit ? "编辑菜单" : "创建菜单" }}</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径">
        <el-input v-model="form.href"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-select v-model="form.parentId" placeholder="请选择上级菜单">
          <el-option label="无上级菜单" :value="-1"></el-option>
          <el-option
            v-for="item in parentMenuList"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="前端图标">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-radio-group v-model="form.shown">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number
          v-model="form.orderNum"
          :min="1"
          :max="10"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{
          isEdit ? "修改" : "立即创建"
        }}</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { createMenu, getMenuInfo, Menu } from '@/services/menu'

interface MemuData {
  parentMenuList: []
  menuInfo: null | Menu
}

export default Vue.extend({
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: true
      },
      parentMenuList: []
    }
  },
  created() {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo() {
      const id = this.$route.params.id || -1
      const { data } = await getMenuInfo<MemuData>(id)
      if (data.code === '000000') {
        if (data.data.menuInfo) {
          this.form = data.data.menuInfo
        }
        this.parentMenuList = data.data.parentMenuList
      }
    },
    async onSubmit() {
      const { data } = await createMenu({
        ...this.form
      })
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.back()
      } else {
        if (data.mesg) {
          this.$message.error(data.mesg)
        }
      }
    }
  }
})
</script>

<style>
</style>
