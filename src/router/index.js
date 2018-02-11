/* eslint-disable */
import Vue from 'vue'
import store from '../vuex'
import Router from 'vue-router'
Vue.use(Router)


import settings from '@/router/routes/settings/settings'

import artist from '@/router/routes/artist/artist'

import searchpage from '@/router/routes/search/searchpage'
import song from '@/router/routes/search/song'

import userPlaylist from '@/router/routes/user/playlists/playlist'
import playlistsAll from '@/router/routes/user/playlists/all'

import home from '@/router/routes/user/subs/all'
import subsAll from '@/router/routes/user/subs/all'

import user from '@/router/routes/account/user'
import login from '@/router/routes/account/login'
import signUp from '@/router/routes/account/sign-up'
import password from '@/router/routes/account/password-reset'

import stage from '@/router/routes/stage/stage-route'

let router = new Router({
  routes: [
    // {
    //   path: '/current',
    //   name: 'stage',
    //   component: stage
    // },
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
      component: user,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/',
      redirect: '/current'
    },
    {
      path: '/home',
      name: 'home',
      component: home
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/subs/all',
      name: 'subsAll',
      component: subsAll
    },
    {
      path: '/u/playlists/all',
      name: 'playlistsAll',
      component: playlistsAll
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
    // {
    //   path: '/u/:user/',
    //   name: 'userIndex',
    //   component: userIndex,
    //   props: true
    // },
    {
      path: '/u/:user/:playlist/:name',
      name: 'userPlaylist',
      component: userPlaylist,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  // let currentUser = store.getters.auth_state;
  // let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // if (requiresAuth && !currentUser ) next('login')
  // console.log()
  if (to.name === 'stage') {
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

