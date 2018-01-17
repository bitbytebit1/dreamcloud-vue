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
import DCAPIPlug from '@/DCAPIs/DCAPI.js'
import DCPlayerPlug from '@/DCAPIs/DCPlayer.js'
import DCFBPlug from '@/DCAPIs/DCFB.js'
// import DCUserPlug from '@/DCAPIs/DCUser.js'
import UtilsPlug from '@/DCAPIs/Utils.js'
import VueLazyload from 'vue-lazyload'
import store from './vuex'

import Vuetify from 'vuetify'
Vue.use(Vuetify)
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(VueLazyload, {
  preLoad: 3,
  loading: '/static/img/all.png',
  attempt: 1
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

let app

app = new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  store
})