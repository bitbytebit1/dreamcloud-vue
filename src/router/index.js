/* eslint-disable */
import Vue from 'vue'
import store from '../vuex'
import Router from 'vue-router'
Vue.use(Router)

const settings = () => import(/* webpackChunkName: "settings "*/ '@/router/settings/settings')
const tos = () => import(/* webpackChunkName: "tos "*/ '@/router/tos/tos')
const history = () => import(/* webpackChunkName: "history "*/ '@/router/user/history/history')
const historyRecommended = () => import(/* webpackChunkName: "historyRecommended "*/ '@/router/user/history/recommended')
const artist = () => import(/* webpackChunkName: "artist "*/ '@/router/artist/artist')
const searchpage = () => import(/* webpackChunkName: "searchpage "*/ '@/router/search/searchpage')
const song = () => import(/* webpackChunkName: "song "*/ '@/router/search/song')
const userPlaylist = () => import(/* webpackChunkName: "userPlaylist "*/ '@/router/user/playlists/playlist')
const playlistsAll = () => import(/* webpackChunkName: "playlistsAll "*/ '@/router/user/playlists/all')
const playlistOverview = () => import(/* webpackChunkName: "playlistOverview "*/ '@/router/user/playlists/overview')
const home = () => import(/* webpackChunkName: "home "*/ '@/router/user/home/home')
const subsAll = () => import(/* webpackChunkName: "subsAll "*/ '@/router/user/subs/all')
const userSubOverview = () => import(/* webpackChunkName: "userSubOverview "*/ '@/router/user/subs/overview')
const user = () => import(/* webpackChunkName: "user "*/ '@/router/user/user')
const login = () => import(/* webpackChunkName: "login "*/ '@/router/login/login')
const signUp = () => import(/* webpackChunkName: "signUp "*/ '@/router/login/sign-up')
const password = () => import(/* webpackChunkName: "password "*/ '@/router/login/password-reset')
const about = () => import(/* webpackChunkName: "about "*/ '@/router/about/about')
const stage = () => import(/* webpackChunkName: "stage "*/ '@/router/stage/stage-route')
const channelPlaylist = () => import(/* webpackChunkName: "channelPlaylist "*/ '@/router/channel-playlist/playlist.vue')

// import settings from '@/router/settings/settings'
// import tos from '@/router/tos/tos'
// import history from '@/router/user/history/history'
// import historyRecommended from '@/router/user/history/recommended'

// import artist from '@/router/artist/artist'

// import searchpage from '@/router/search/searchpage'
// import song from '@/router/search/song'

// import userPlaylist from '@/router/user/playlists/playlist'
// import playlistsAll from '@/router/user/playlists/all'
// import playlistOverview from '@/router/user/playlists/overview'

// import home from '@/router/user/home/home'
// import subsAll from '@/router/user/subs/all'
// import userSubOverview from '@/router/user/subs/overview'

// import user from '@/router/user/user'
// import login from '@/router/login/login'
// import signUp from '@/router/login/sign-up'
// import password from '@/router/login/password-reset'
// import about from '@/router/about/about'
// import stage from '@/router/stage/stage-route'

// import channelPlaylist from '@/router/channel-playlist/playlist.vue'
// #/s/YouTube/q/sort/page/number of results/filter
// #/s/YouTube/q/sort/page/number of results/filter

let router = new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/password-reset',
      name: 'password-reset',
      component: password
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/',
      redirect: '/about'
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings
    },
    {
      path: '/s/:source/:query',
      name: 'searchPage',
      component: searchpage,
      props: true
    },
    {
      path: '/a/:source/:artist/:artistID/',
      name: 'artist',
      component: artist,
      props: true
    },
    {
      path: '/current',
      name: 'stage',
      component: stage,
      props: true
    },
    {
      path: '/t/:source/:artist/:trackID',
      name: 'song',
      component: song,
      props: true
    },
    {
      path: '/u/:user/home1',
      name: 'home',
      component: home,
      props: true
    },
    {
      path: '/u/:user/subscriptions',
      name: 'userSubOverview',
      component: userSubOverview,
      props: true
    },
    {
      path: '/u/:user/subscriptions-all',
      name: 'subsAll',
      component: subsAll,
      props: true
    },
    {
      path: '/u/:user/playlists-all',
      name: 'playlistsAll',
      component: playlistsAll,
      props: true
    },
    {
      path: '/u/:user/:playlist/:name',
      name: 'userPlaylist',
      component: userPlaylist,
      props: true
    },
    {
      path: '/p/:title/:source/:artistID/:listID/',
      name: 'channelPlaylist',
      component: channelPlaylist,
      props: true
    },
    {
      path: '/tos',
      name: 'tos',
      component: tos,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
    {
      path: '/u/:user/history',
      name: 'history',
      component: history,
      props: true
    },
    {
      path: '/u/:user/playlist-overview',
      name: 'playlistOverview',
      component: playlistOverview,
      props: true
    },
    {
      path: '/u/:user/home',
      name: 'historyRecommended',
      component: historyRecommended,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  // let currentUser = store.getters.auth_state;
  // let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // if (requiresAuth && !currentUser ) next('login')
  // console.log()
  // setTimeout(() => {
  //   window.scrollTo(0, 0)
  // }, 200)
  if (to.name === 'stage') {
    // window.scrollTo(0, 0)
    store.commit('bShowStage', true)
    next()
  } else if (store.getters.bShowStage) {
    store.commit('bShowStage', false)
    next()
  } else {
    next()
  }
})
export default router

