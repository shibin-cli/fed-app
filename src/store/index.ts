import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('USER') || 'null')
  },
  mutations: {
    setUser(state, user) {
      state.user = JSON.parse(user)
      window.localStorage.setItem('USER', user)
    }
  },
  actions: {
  },
  modules: {
  }
})
