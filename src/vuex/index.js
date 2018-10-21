import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import player from './player'
import youtube from './youtube'
import loading from './loading'
import settings from './settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: user,
    settings: settings,
    player: player,
    loading: loading,
    youtube: youtube
  }
})

export default store
