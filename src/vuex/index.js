import Vue from 'vue'
import Vuex from 'vuex'
// import { mapState } from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    current_Playlist: [],
    current_Index: -1,
    current_Hash: '',
    settings: {
      'Dark Theme': true
    }
  },
  mutations: {
    setNPlay (state, payload) {
      state.current_Playlist = payload.songs
      state.current_Index = payload.current
      state.current_Hash = payload.path
    },
    changeIndex (state, payload) {
      state.current_Index = payload
    },

    changeSetting (state, payload) {
      state.settings[payload.setting] = payload.value
    }
  },
  getters: {

    theme: state => {
      if (state.settings['Dark Theme']) {
        return {'dark': true}
      } else {
        return {'light': true}
      }
    },

    current_Playlist: state => {
      return state.current_Playlist
    },
    index: state => {
      return state.current_Index
    },
    hash: state => {
      return state.current_Hash
    }
  }
})
export default store
