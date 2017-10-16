import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/routes/home/home'
import settings from '../components/routes/settings/settings'

import artist from '../components/routes/artist/artist'

import searchpage from '../components/routes/search/searchpage'
import song from '../components/routes/search/song'

import userPlaylist from '../components/routes/user/user-playlist'
import userIndex from '../components/routes/user/user-index'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
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
