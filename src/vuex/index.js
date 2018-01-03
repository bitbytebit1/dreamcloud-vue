import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import player from './player.js'
import youtube from './youtube'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: user,
    player: player,
    youtube: youtube
  }
})

export default store
