// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Wavesurfer from 'Wavesurfer'
import App from './App'
import router from './router'
import playlist from './components/playlist.vue'
import DCAPIPlug from '././DCAPIs/DCAPIV.js'
import DCPlayerPlug from '././DCAPIs/DCPlayer.js'
import DCUserPlug from '././DCAPIs/DCUser.js'
import UtilsPlug from '././DCAPIs/Utils.js'
import VueLazyload from 'vue-lazyload'
import store from './vuex'

Vue.use(VueLazyload, {
  preLoad: 1.6,
  loading: '//dream.tribe.nu/r3/pix/loading.gif',
  attempt: 1
})
Vue.use(UtilsPlug)
Vue.use(DCUserPlug)
Vue.use(DCAPIPlug)
Vue.use(DCPlayerPlug)
Vue.component('playlist', playlist)
require('bootstrap/dist/css/bootstrap.css')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
