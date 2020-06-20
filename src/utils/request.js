import axios from 'axios'
import store from '../store'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  timeout: 30000, // 请求超时时间
  baseURL: process.env.RESTAPI_PREFIX
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      if (res.code === 1004) {
        // 清除登录信息
        store.dispatch('FedLogOut').then(() => {
          router.replace({
            name: 'login'
          })
        })
      }
      return Promise.reject(response)
    } else {
      return response
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
