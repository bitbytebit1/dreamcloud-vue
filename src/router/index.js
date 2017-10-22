/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/routes/home/home'
import settings from '../components/routes/settings/settings'

import artist from '../components/routes/artist/artist'

import searchpage from '../components/routes/search/searchpage'
import song from '../components/routes/search/song'

import userPlaylist from '../components/routes/user/user-playlist'
import userIndex from '../components/routes/user/user-index'


import user from '@/components/user-auth/user'
import login from '@/components/user-auth/login'
import signUp from '@/components/user-auth/sign-up'
import password from '@/components/user-auth/password-reset'

import {fb} from '../DCAPIs/DCFB.js'

Vue.use(Router)

let router = new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
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
      meta: {
        requiresAuth: true
      }
    },    
    {
      path: '/',
      redirect: '/home'      
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
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
      path: '/t/:source/:artist/:title/:trackID',
      name: 'song',
      component: song,
      props: true
    },
    {
      path: '/u/:user/',
      name: 'userIndex',
      component: userIndex,
      props: true
    },
    {
      path: '/u/:user/:playlist/:name',
      name: 'userPlaylist',
      component: userPlaylist,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {

  let currentUser = fb.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth && !currentUser ) next('login')
  else next()
})
export default router

