import Vue from 'vue'
import Vuex from 'vuex'
// import { mapState } from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

    auth_state: false,
    current_Playlist: [],
    current_Index: -1,
    current_Hash: '',
    settings: {
      'Night Mode': false
    }
  },
  mutations: {
    authChange (state, payload) {
      state.auth_state = payload
    },
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
    auth_state: state => {
      return state.auth_state
    },
    theme: state => {
      if (state.settings['Night Mode']) {
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
