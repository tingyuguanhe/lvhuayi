import { login, logout, getInfo } from '@/api/user'
import { getToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { getMultiMedias,getAllUesrs } from '@/api/common'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    localStorage.removeItem('userToken');
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
       
        commit('SET_TOKEN', response.data)
        localStorage.setItem('userToken', response.data);
       
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        localStorage.removeItem("");
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      localStorage.removeItem('userToken');
      resolve()
    })
  },
  getMediasData({commit, state}) {
    return new Promise((resolve, reject) => {
      getMultiMedias().then((response) => {
        
        localStorage.setItem("qiniuToken", JSON.stringify(response.data));
      }).catch(error => {
        reject(error)
      })
    })

  },
  getAllUesrsData(){
    return new Promise((resolve, reject) => {
      getAllUesrs().then((response) => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

