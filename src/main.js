/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// if (process.env.NODE_ENV == 'production') {
// window.location.protocol = 'https:'
// }
// suitcase for storage
import Vue from 'vue'
import './registerServiceWorker'

Vue.config.productionTip = false

import Vuetify, { VLayout } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
// Vue.use(Vuetify)

Vue.use(Vuetify, {
  components: {
    VLayout
  }
})
// import Vuetify from 'vuetify'
// Vue.use(Vuetify)
// import('../node_modules/vuetify/dist/vuetify.min.css')


import('@/assets/dream.css')

import App from './App'
import router from './router'
import store from './vuex'

import UtilsPlug from '@/api/utils.js'
Vue.use(UtilsPlug)

import DCAPIPlug from '@/api/DCAPI.js'
Vue.use(DCAPIPlug)

import DCPlayerPlug from '@/api/DCPlayer.js'
Vue.use(DCPlayerPlug)

import DCFBPlug from '@/api/DCFB.js'
Vue.use(DCFBPlug)

import VueFire from 'vuefire'
Vue.use(VueFire)

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

// import VueAnalytics from 'vue-analytics'
// Vue.use(VueAnalytics, {
//   id: 'UA-113982522-1',
//   router
// })

import audioStage from '@/components/stage/audio'
Vue.component('audio-stage', audioStage)
import videoStage from '@/components/stage/video'
Vue.component('video-stage', videoStage)
import playlist from '@/components/playlist/playlist.vue'
Vue.component('playlist', playlist)
import menu from '@/components/buttons/context-menu.vue'
Vue.component('context-menu', menu)

Vue.use(Vuetify, {
  theme: {
    primary: '#009688', // #E53935
  }
})

// used to catch back on mobile
window.popStateDetected = false
window.addEventListener('popstate', () => {
  window.popStateDetected = true
})


import VueLazyload from 'vue-lazyload'

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.7,
  error: 'dist/img/no-image.png',
  // loading: 'dist/loading.gif',
  attempt: 1
})

import VueClazyLoad from 'vue-clazy-load';
Vue.use(VueClazyLoad);
Vue.component('clazy-load', VueClazyLoad)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

