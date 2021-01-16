<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" type="tel"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          class="login-btn"
          :loading="isLoginLoading"
          >登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  data() {
    return {
      form: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, min: 6, max: 18, message: '密码应在6到18位', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit() {
      try {
        await (this.$refs.form as Form).validate()
        this.isLoginLoading = true
        const res = await login(this.form)
        if (res.data.state !== 1) {
          return this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
        this.$store.commit('setUser', res.data.content)
        this.$router.push(this.$route.query.redirect as string || '/')
        this.$message({
          type: 'success',
          message: '登陆成功'
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoginLoading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-form {
    width: 300px;
    padding: 20px;
    background: #fff;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
