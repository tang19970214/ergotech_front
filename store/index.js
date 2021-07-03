import Vue from 'vue'
import Vuex from 'vuex'
import {
  login
} from "../api/api"

import {
  getToken,
  setToken,
  removeToken
} from "../api/auth"

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    token: getToken(),
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },
  actions: {
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password)
          .then((response) => {
            const data = response.data
            setToken(data.token)
            window.localStorage.setItem("token", data.token)
            commit("SET_TOKEN", data.token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "")
            removeToken()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "")
        removeToken()
        resolve()
      })
    },
  }
})

export default store
