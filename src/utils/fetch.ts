import axios from 'axios'
import { message } from 'antd'

const service = axios.create({
  baseURL: 'http://localhost:32001',
  timeout: 15000,
})

service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['token'] = 'token'
  // }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.statusCode !== 200 && res.message) {
      message.error(res.message)
      return Promise.reject('error')
    }
    // if (response.config.method === 'put' || response.config.method === 'post' || response.config.method === 'delete') {
    //   message.success('操作成功')
    // }
    return response.data
  },
  error => {
    message.error(error.message)
    return Promise.reject(error)
  },
)

export default service
