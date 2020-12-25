<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <app-aside />
      </el-aside>
      <el-container>
        <el-header>
          <app-header/>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  components: {
    AppAside,
    AppHeader
  },
  data() {
    return {
      isCollapse: true
    }
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  background: #d3dee6;
}
.el-header {
  background: #ffffff;
}
.el-footer {
  background: #e9eef3;
}
</style>
