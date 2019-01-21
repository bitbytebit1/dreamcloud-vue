export default {
  state: {
    snackb: false,
    snackc: 'primary',
    snacks: '',
    snackt: ''
  },
  mutations: {
    snack (state, payload) { 
      state.snacks = payload.s
      state.snackc = payload.c
      state.snackb = payload.b
    },
    snackb (state, payload) { state.snackb = payload },
    snackt (state, payload) { state.snackt = payload },
  },
  getters: {
    snackb: state =>  state.snackb,
    snackc: state =>  state.snackc,
    snacks: state =>  state.snacks,
  },
  actions: {
    snack ({commit, state}, payload) {
      commit('snackb', false)
      clearTimeout(state.snackt)
      setTimeout(() => {
        commit('snackt', setTimeout(() => {
          commit('snackb', false)
        }, 2000))
        commit('snack', payload)
      }, 250)
    }
  }
}
