/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Wavesurfer from 'Wavesurfer'
import App from './App'
import router from './router'
import playlist from './components/playlist/playlist'
import DCAPIPlug from './DCAPIs/DCAPI.js'
import DCPlayerPlug from './DCAPIs/DCPlayer.js'
import DCUserPlug from './DCAPIs/DCUser.js'
import UtilsPlug from './DCAPIs/Utils.js'
import VueLazyload from 'vue-lazyload'
import store from './vuex'

import Vuetify from 'vuetify'
Vue.use(Vuetify)
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(VueLazyload, {
  preLoad: 1.6,
  loading: '/static/img/loading.gif',
  attempt: 1
})
Vue.use(UtilsPlug)
Vue.use(DCUserPlug)
Vue.use(DCAPIPlug)
Vue.use(DCPlayerPlug)
Vue.component('playlist', playlist)

Vue.config.productionTip = false

import VueFire from 'vuefire'
Vue.use(VueFire)

import {fb, DCFB} from './DCAPIs/DCFB.js'

let app

fb.auth().onAuthStateChanged(function (user) {
  if(user)
    DCFB.init(user.uid)
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App },
      store
    })
  }
})
