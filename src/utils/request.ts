import axios from 'axios'
import qs from 'qs'

const request = axios.create({

})

request.interceptors.request.use(config => {
  if (config.data) config.data = qs.stringify(config.data)
  return config
})

export default request
