import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import CodeEditor from 'components/CodeEditor'
import About from 'components/About'
import Promocodes from 'components/Promocodes'

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
      path: '/promocodes',
      name: 'promocodes',
      component: Promocodes
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/code',
      name: 'code',
      component: CodeEditor
    }
  ]
})
