/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// if (process.env.NODE_ENV == 'production') {
  // window.location.protocol = 'https:'
// }
// suitcase for storage
import Vue from 'vue'
// import Wavesurfer from 'Wavesurfer'
import App from './App'
import router from './router'
import DCAPIPlug from '@/api/DCAPI.js'
import DCPlayerPlug from '@/api/DCPlayer.js'
import DCFBPlug from '@/api/DCFB.js'
// import DCUserPlug from '@/api/DCUser.js'
import UtilsPlug from '@/api/Utils.js'
import VueLazyload from 'vue-lazyload'
import store from './vuex'

// import 'roboto-fontface/css/roboto/roboto-fontface.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import 'material-design-icons/iconfont/material-icons.css'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(VueLazyload, {
  preLoad: 1.6,
  loading: '/static/img/loading.png',
  error: '/static/img/loading.png',
  attempt: 1
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  // listenEvents: [ 'scroll' ]
})
Vue.use(UtilsPlug)
// Vue.use(DCUserPlug)
Vue.use(DCAPIPlug)
Vue.use(DCPlayerPlug)
Vue.use(DCFBPlug)

Vue.config.productionTip = false

import VueFire from 'vuefire'
Vue.use(VueFire)

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

import VueAnalytics from 'vue-analytics'
Vue.use(VueAnalytics, {
  id: 'UA-113982522-1',
  router
})

import audioStage from '@/components/main/stage/audio-stage'
Vue.component('audio-stage', audioStage)
import videoStage from '@/components/main/stage/video-stage'
Vue.component('video-stage', videoStage)
import playlist from '@/components/main/playlist/playlist.vue'
Vue.component('playlist', playlist)

let app

app = new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  store
})
