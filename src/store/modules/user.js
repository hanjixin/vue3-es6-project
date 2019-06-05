
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import { login, loginout } from '@/api/login'
const user = {
  state: {
    token: getToken(),
    name: '',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()

      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if (response.data.data) {
            const data = response.data.data
            setToken(data.token)
            const roleList = []
            roleList.push(data.roles[0].sign)
            commit('SET_TOKEN', data.token)
            // commit('SET_ROLES', roleList)
            resolve()
          } else {
            this.$message({
              message: '用户名或密码错误',
              type: 'error'
            })
          }
        }).catch(error => {
          this.$message({
            message: '用户名或密码错误',
            type: 'error'
          })
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      commit
      state
      return new Promise((resolve, reject) => {
        reject()
        resolve()
      })
    },
    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        loginout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
