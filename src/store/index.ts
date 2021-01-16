import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('USER') || 'null'),
    isCollapse: false
  },
  mutations: {
    setUser(state, user) {
      state.user = JSON.parse(user)
      window.localStorage.setItem('USER', user)
    },
    setCollapse(state, isCollapse) {
      state.isCollapse = isCollapse
    }
  },
  actions: {
  },
  modules: {
  }
})
