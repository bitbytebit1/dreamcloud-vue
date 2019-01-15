export default {
  state: {
    bShuffled: false,
    aShuffled: []
  },
  mutations: {
    bShuffled (state, payload) {
      state.bShuffled = payload
    },
    aShuffled (state, payload) {
      state.bShuffled = payload
    }
  },
  getters: {
    bShuffled: (state) => { return state.bShuffled },
    aShuffled: (state) => { return state.aShuffled },
  }
}
