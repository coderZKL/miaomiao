import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: '定位',
    id: '1'
  },
  mutations: {
    changeCity(state, value) {
      if (value) {
        state.city = value
      } else {
        state.city = "定位"
      }
    },
    changeCityId(state, value) {
      if (value) {
        state.id = value
      } else {
        state.id = "1"
      }
    }
  },
  actions: {

  },
  modules: {

  }
})