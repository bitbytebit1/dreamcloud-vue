import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home1'
import searchpage from '../components/routes/search/searchpage'
import artist from '../components/routes/search/artist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/s/:source/:query',
      name: 'searchPage',
      component: searchpage,
      props: true
    },
    {
      path: '/a/:source/:artistID',
      name: 'artist',
      component: artist,
      props: true
    }
  ]
})
