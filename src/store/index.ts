import { createStore } from 'vuex'
import services from './services'
import { AppState } from './types/state.interface'

export default createStore({
  state: {
    isAuthenticated: false,
    userData: null,
  } as AppState,
  getters: {},
  mutations: {},
  actions: services,
  modules: {},
})
