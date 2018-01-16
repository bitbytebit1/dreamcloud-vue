import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import player from './player'
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
