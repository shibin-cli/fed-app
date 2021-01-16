<template>
  <div class="header">
    <div>
      <el-button
        icon="el-icon-s-fold"
        type="text"
        @click="setCollapse(!isCollapse)"
      ></el-button>
      <el-breadcrumb
        separator="/"
        class="inline"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in navs" :key="item.name">{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="40"
          :src="
            userInfo.portrait ||
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          "
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item
          divided
          @click.native="loginout"
        >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { getUserInfo } from '@/services/user'
export default Vue.extend({
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    console.log(this.$route)
    this.loadUserInfo()
    this.loadUserInfo()
  },
  computed: {
    ...mapState(['isCollapse']),
    navs() {
      const temps: any[] = []
      this.$route.matched.filter((item) => {
        if (item.name) {
          temps.push({
            name: item.name,
            title: item.meta.title
          })
        }
      })
      console.log(temps)
      return temps
    }
  },
  methods: {
    ...mapMutations(['setUser', 'setCollapse']),
    async loadUserInfo() {
      const { data } = await getUserInfo()
      if (data.state) {
        this.userInfo = data.content
      }
    },
    loginout() {
      this.$confirm('确定要退出吗？', '提示')
        .then(() => {
          this.setUser(null)
          this.$router.push({
            name: 'Login'
          })
          this.$message({
            type: 'success',
            message: '退出成功'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
})
</script>
<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
  .el-breadcrumb {
    display: inline-block;
    padding-left: 20px;
  }
}
</style>
