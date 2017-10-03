import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import searchpage from '../components/routes/search/searchpage'
import artist from '../components/routes/search/artist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
    }
  ]
})
