import axios from 'axios'
import qs from 'qs'
import store from '@/store'

const request = axios.create({

})

request.interceptors.request.use(config => {
  if (config.data) config.data = qs.stringify(config.data)
  if (store.state.user) config.headers.Authorization = store.state.user.access_token
  return config
})

export default request
