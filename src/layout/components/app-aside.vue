<template>
  <div class="aside">
    <el-menu
      :default-active="activePath"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="$store.state.isCollapse"
      router
    >
      <el-submenu index="/role">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-user"></i> 角色管理
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-menu"></i> 菜单管理
        </el-menu-item>
        <el-menu-item index="/resourse">
          <i class="el-icon-document"></i> 资源管理
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-menu"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
        <el-submenu index="/advert">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-setting"></i> 广告列表
        </el-menu-item>
        <el-menu-item index="/advert/space">
          <i class="el-icon-setting"></i> 广告位列表
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    activePath() {
      return this.$route.path
    }
  },
  methods: {
    handleOpen(key: string, keyPath: string): void {
      console.log(key, keyPath)
    },
    handleClose(key: string, keyPath: string): void {
      console.log(key, keyPath)
    }
  }
})
</script>
<style lang="scss" scoped>
.aside {
  .el-menu {
    min-height: 100vh;
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }
}
</style>
