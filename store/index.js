import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    // explanationNote: {},
  },
  mutations: {
    // GETEXPLANATIONNOTE(state, payload) {
    //   state.explanationNote = payload;
    // },
  },
  actions: {
    // setExplanationNote(state, payload) {
    //   state.commit("GETEXPLANATIONNOTE", payload)
    // },
  }
})

export default store
