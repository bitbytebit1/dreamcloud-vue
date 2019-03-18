import Vue from 'vue'

export default {
  state: {
    snackb: false,
    snackc: 'primary',
    snacks: '',
    snackt: '',
    snacku: []
  },
  mutations: {
    snack (state, payload) { 
      state.snacks = payload.s
      state.snackc = payload.c
      state.snackb = payload.b
      if (payload.hasOwnProperty('u')) {
        state.snacku = payload.u
      } else {
        state.snacku = []
      }
    },
    snackb (state, payload) { state.snackb = payload },
    snackt (state, payload) { state.snackt = payload },
  },
  getters: {
    snackb: state =>  state.snackb,
    snackc: state =>  state.snackc,
    snacks: state =>  state.snacks,
    snacku: state =>  state.snacku,
    snackul: state =>  state.snacku.length,
  },
  actions: {
    snack ({commit, state}, payload) {
      // close previous snackbar
      commit('snackb', false)
      clearTimeout(state.snackt)
      // wait for close
      setTimeout(() => {
        commit('snackt', setTimeout(() => {
          commit('snackb', false)
        }, 2000))
        commit('snack', payload)
      }, 250)
    },
    
    snacku ({state}) { 
      if (state.snacku.length) {
        Vue.prototype.$DCFB.playlistsRefs.child(state.snacku[0].playlist).once('value', (snapshot) => {
          if (snapshot.exists()) {
            Vue.prototype.$DCFB.playlistGet(state.snacku[0].user, state.snacku[0].playlist).set(state.snacku[0].songs)
          } else {
            let c = []
            for( const b in state.snacku[0].songs ){
              c.push(state.snacku[0].songs[b])
            }
            Vue.prototype.$DCFB.createNewPlaylist(state.snacku[0].name, c, state.snacku[0].playlist)
          }
        })
      }
    }
  }
}
