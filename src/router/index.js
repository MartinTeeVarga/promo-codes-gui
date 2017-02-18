import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Editor from 'components/Editor'
import About from 'components/About'
import GameDetails from 'components/GameDetails'

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/editor'
    },
    // {
    //   path: '/',
    //   redirect: '/promocodes/gamedetails/GAME0'
    // },
    {
      path: '/promocodes/gamedetails/:id',
      name: 'gamedetails',
      component: GameDetails
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    }
  ]
})
