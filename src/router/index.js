import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import CodeEditor from 'components/CodeEditor'
import Home from 'components/Home'
import Promocodes from 'components/Promocodes'

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // {
    //   path: '/',
    //   redirect: '/promocodes/gamedetails/GAME0'
    // },
    {
      path: '/promocodes',
      name: 'promocodes',
      component: Promocodes
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/code',
      name: 'code',
      component: CodeEditor
    }
  ]
})
