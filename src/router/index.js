/* eslint-disable */
import Vue from 'vue'
import store from '../vuex'
import Router from 'vue-router'
Vue.use(Router)


import settings from '@/router/settings/settings'
import tos from '@/router/tos/tos'
import history from '@/router/user/history/history'
import historyRecommended from '@/router/user/history/recommended'

import artist from '@/router/artist/artist'

import searchpage from '@/router/search/searchpage'
import song from '@/router/search/song'

import userPlaylist from '@/router/user/playlists/playlist'
import playlistsAll from '@/router/user/playlists/all'
import playlistOverview from '@/router/user/playlists/overview'

import home from '@/router/user/home/home'
import subsAll from '@/router/user/subs/all'
import userSubOverview from '@/router/user/subs/overview'

import user from '@/router/user/user'
import login from '@/router/user/login/login'
import signUp from '@/router/user/login/sign-up'
import password from '@/router/user/login/password-reset'
import about from '@/router/about/about'
import stage from '@/router/stage/stage-route'
// #/s/YouTube/q/sort/page/number of results/filter

let router = new Router({
  routes: [
    {
      path: '/password-reset',
      name: 'password-reset',
      component: password
    },
    {
      path: '/login',
      name: 'Login',
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
      path: '/u/:user/home',
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
      path: '/:user/history',
      name: 'history',
      component: history,
      props: true
    },
    {
      path: '/:user/playlist-overview',
      name: 'playlistOverview',
      component: playlistOverview,
      props: true
    },
    {
      path: '/u/:user/recommended',
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
  window.scrollTo(0, 0)
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

