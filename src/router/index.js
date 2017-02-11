import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import About from 'components/About';
import Promocodes from 'components/Promocodes';

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/promocodes'
    },
    {
      path: '/promocodes',
      name: 'promocodes',
      component: Promocodes
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }

  ]
});
