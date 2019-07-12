/* eslint-disable */
import Vue from 'vue'
import store from '../vuex'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router({
  scrollBehavior: (to, from, savedPosition) => {
      return { x: 0, y: 0 };
  },
  // scrollBehavior: (to, from, savedPosition) => {
  //   //   return { x: 0, y: 0 };
  //   let scrollTo = 0

  //   if (to.hash) {
  //     scrollTo = to.hash
  //   } else if (savedPosition) {
  //     scrollTo = savedPosition.y
  //   }

  //   return goTo(scrollTo)
  // },
  routes: [
    {
      path: '/password-reset',
      name: 'password-reset',
      component: () => import(/* webpackChunkName: "password"*/ '@/router/login/password-reset')
    },
    {
      path: '/r/:source/:artist/:title/:trackID',
      name: 'related',
      component: () => import(/* webpackChunkName: "related"*/ '@/router/related/related')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login"*/ '@/router/login/login')
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import(/* webpackChunkName: "signUp"*/ '@/router/login/sign-up')
    },
    {
      path: '/u/:user/overview',
      name: 'userOverview',
      component: () => import(/* webpackChunkName: "user"*/ '@/router/user/user'),
      props: true
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import(/* webpackChunkName: "genre"*/ '@/router/genres/genres')
    },
    {
      path: '/',
      redirect: '/about'
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings"*/ '@/router/settings/settings')
    },
    {
      path: '/s/:source/:query',
      name: 'searchQuery',
      component: () => import(/* webpackChunkName: "searchQuery"*/ '@/router/search/searchQuery'),
      props: true
    },
    {
      path: '/sa/:source/:query',
      name: 'searchArtist',
      component: () => import(/* webpackChunkName: "searchpage"*/ '@/router/search/artist'),
      props: true
    },
    {
      path: '/a/:source/:artist/:artistID/',
      name: 'artist',
      component: () => import(/* webpackChunkName: "artist"*/ '@/router/artist/artist'),
      props: true
    },
    {
      path: '/current',
      name: 'stage',
      component: () => import(/* webpackChunkName: "stage"*/ '@/router/stage/stage-route')
    },
    {
      path: '/t/:source/:artist/:trackID',
      name: 'auto',
      component: () => import(/* webpackChunkName: "auto"*/ '@/router/song/auto'),
      props: true
    },
    {
      path: '/trending',
      name: 'trending',
      component: () => import(/* webpackChunkName: "trending"*/ '@/router/trending/trending'),
    },
    {
      path: '/u/:user/subscriptions',
      name: 'userSubOverview',
      component: () => import(/* webpackChunkName: "userSubOverview"*/ '@/router/user/subs/overview'),
      props: true
    },
    {
      path: '/u/:user/subscriptions-all',
      name: 'subsAll',
      component: () => import(/* webpackChunkName: "subsAll"*/ '@/router/user/subs/all'),
      props: true
    },
    {
      path: '/u/:user/playlists-all',
      name: 'playlistsAll',
      component: () => import(/* webpackChunkName: "playlistsAll"*/ '@/router/user/playlists/all'),
      props: true
    },
    {
      path: '/u/:user/:playlist/:name',
      name: 'userPlaylist',
      component: () => import(/* webpackChunkName: "userPlaylist"*/ '@/router/user/playlists/playlist'),
      props: true
    },
    {
      path: '/p/:title/:source/:artistID/:listID/',
      name: 'channelPlaylist',
      component: () => import(/* webpackChunkName: "channelPlaylist"*/ '@/router/channel-playlist/playlist'),
      props: true
    },
    {
      path: '/tos',
      name: 'tos',
      component: () => import(/* webpackChunkName: "tos"*/ '@/router/tos/tos'),
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about"*/ '@/router/about/about'),
    },
    {
      path: '/u/:user/history',
      name: 'history',
      component: () => import(/* webpackChunkName: "history"*/ '@/router/user/history/history'),
      props: true
    },
    {
      path: '/u/:user/playlist-overview',
      name: 'playlistOverview',
      component: () => import(/* webpackChunkName: "playlistOverview"*/ '@/router/user/playlists/overview'),
      props: true
    },
    {
      path: '/u/:user/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home"*/ '@/router/user/home/home'),
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('bShuffled', false)

  // close navbar on back
  if (store.getters.isMobile && (store.state.user.drawLeft || store.state.user.drawRight) && window.popStateDetected) {
    window.popStateDetected = false
    // console.log(to, from)
    store.commit('drawLeft', false)
    store.commit('drawRight', false)
    next(false)
  } else if (store.state.bShowStage && (to.name !== 'stage' || to.name !== 'current')) {
    // console.log('disabled stage')
    store.commit('bShowStage', false)
    // store.commit('show_pop', true)
    next()
  } else {
    next()
  }
})
export default router

