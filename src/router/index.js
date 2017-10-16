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


import Hello from '@/components/firebase/Hello'
import Login from '@/components/firebase/Login'
import SignUp from '@/components/firebase/SignUp'
import firebase from 'firebase'

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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
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
      component: Home
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
      path: '/u/:user/:playlist',
      name: 'userPlaylist',
      component: userPlaylist,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log("User logged in", !!firebase.auth().currentUser)
  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('hello')
  else next()
})
export default router

