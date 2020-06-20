import restapi from '@/utils/restapi'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { setAvatar, removeAvatar } from '@/utils/avatar'
const user = {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    REMOVE_TOKEN: (state, token) => {
      state.token = ''
    }
  },
  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        return restapi.request({
          method: 'post',
          url: `/api/login`,
          data: userInfo,
          success: res => {
            if (res.data.code === 0) {
              setToken(username)
              commit('SET_TOKEN', username)
              resolve(res)
            }
          },
          error: reject
        })
      })
    },
    // 获取用户信息
    GetInfo () {
      return new Promise((resolve, reject) => {
        return restapi.request({
          method: 'get',
          url: `/api/getCurrentUser`,
          success: res => {
            if (res.data.data) {
              setAvatar(res.data.data.avatarUrl)
            } else {
              removeAvatar()
              removeToken()
            }
            resolve(res)
          },
          error: reject
        })
      })
    },
    // 后端 登出
    Logout ({ commit }) {
      return new Promise((resolve, reject) => {
        return restapi.request({
          method: 'get',
          url: `/api/logout`,
          success: res => {
            if (res.data.code === 0) {
              commit('SET_TOKEN', '')
              removeAvatar()
              removeToken()
            }
            resolve(res)
          },
          error: reject
        })
      })
    },
    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeAvatar()
        removeToken()
        resolve()
      })
    }
  }
}

export default user
