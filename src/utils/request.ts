import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

interface Func {
  (): void
}

export interface ResponseData {
  state: number
  message: string
  content: string
  success: boolean
}

const request = axios.create()

let isRefresh = false

let requests: Array<Func> = []

function redirectLogin() {
  router.push({
    name: 'Login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken() {
  return axios.create().post<ResponseData>('/front/user/refresh_token', qs.stringify({
    refreshtoken: store.state.user.refresh_token
  }))
}

request.interceptors.request.use(config => {
  // 处理用户登陆后携带身份信息
  if (store.state.user) config.headers.Authorization = store.state.user.access_token
  return config
})

request.interceptors.response.use(config => config, async err => {
  if (err.response) {
    const { status } = err.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      Message.warning('登陆过期,请重新登陆')
      if (!store.state.user) {
        redirectLogin()
        return
      }
      if (!isRefresh) {
        try {
          isRefresh = true
          const res = await refreshToken()
          if (res.data.success) {
            store.commit('setUser', res.data.content)
            requests.forEach(cb => cb())
            requests = []
            return request(err.config)
          }
          throw new Error('')
        } catch (error) {
          store.commit('setUser', null)
          redirectLogin()
        } finally {
          isRefresh = false
        }
      } else {
        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(err.config))
          })
        })
      }
    } else if (status === 403) {
      Message.error('您没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (err.request) {
    console.log(err)
    Message.error('请求超时，请刷新重试')
  } else {
    Message.error(`请求失败：${err.message}`)
  }
  return Promise.reject(err)
})

export default request
