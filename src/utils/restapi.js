import axios from 'axios'
import store from '../store'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.RESTAPI_PREFIX
})

const cancelableRequests = []

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

export default {
  request: (request) => {
    service.request({
      method: request.method,
      url: request.url,
      data: request.data
    }).then(response => {
      if (response.data.code < 300) {
        typeof request.success === 'function' && request.success(response.data.data)
      } else {
        typeof request.error === 'function' && request.error(response.data)
      }
    }).catch(error => {
      typeof request.error === 'function' && request.error(error)
    })
  },
  requestWithCancel: (request) => {
    let CancelToken = axios.CancelToken
    let source = CancelToken.source()
    cancelableRequests.push(source)
    service.request({
      method: request.method,
      url: request.url,
      data: request.data,
      cancelToken: source.token
    }).then(response => {
      let index = cancelableRequests.indexOf(source)
      index > -1 && cancelableRequests.splice(index, 1)
      if (response.data.code < 300) {
        typeof request.success === 'function' && request.success(response.data.data)
      } else {
        typeof request.error === 'function' && request.error(response.data)
      }
    }).catch(error => {
      if (axios.isCancel(error)) {
        // console.log('request canceled: ', request.url)
      } else {
        typeof request.error === 'function' && request.error(error)
      }
    })
  },
  clearUnfinishedRequests () {
    for (let i = 0; i < cancelableRequests.length; i++) {
      cancelableRequests[i].cancel()
    }
    cancelableRequests.splice(0, cancelableRequests.length)
  },
  download: (request) => {
    service.request({
      method: request.method,
      url: request.url,
      data: request.data
    }).then(response => {
      if (response.status < 300) {
        typeof request.success === 'function' && request.success(response.data)
      } else {
        typeof request.error === 'function' && request.error(response.data)
      }
    })
  }
}
