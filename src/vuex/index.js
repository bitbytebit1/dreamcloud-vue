import Vue from 'vue'
import Vuex from 'vuex'
// import { mapState } from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    current_Playlist: [],
    current_Index: -1,
    current_Hash: ''
  },
  mutations: {
    setNPlay (state, payload) {
      state.current_Playlist = payload.songs
      state.current_Index = payload.current
      state.current_Hash = payload.path
    },
    changeIndex (state, payload) {
      state.current_Index = payload
    }
  },
  getters: {
    index: state => {
      return state.current_Index
    },
    hash: state => {
      return state.current_Hash
    }
  }
})
export default store
