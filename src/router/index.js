/* eslint-disable */
import Vue from 'vue'
import store from '../vuex'
import Router from 'vue-router'
Vue.use(Router)

import home from '@/components/routes/user/subs/all'

import settings from '@/components/routes/settings/settings'

import artist from '@/components/routes/artist/artist'

import searchpage from '@/components/routes/search/searchpage'
import song from '@/components/routes/search/song'

import userPlaylist from '@/components/routes/user/playlists/playlist'
import playlistsAll from '@/components/routes/user/playlists/all'

import subsAll from '@/components/routes/user/subs/all'

import user from '@/components/routes/account/user'
import login from '@/components/routes/account/login'
import signUp from '@/components/routes/account/sign-up'
import password from '@/components/routes/account/password-reset'

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
      component: user,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/',
      redirect: '/home'
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

// router.beforeEach((to, from, next) => {
  
//   let currentUser = store.getters.auth_state;
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth && !currentUser ) next('login')
//   else next()
// })
export default router

