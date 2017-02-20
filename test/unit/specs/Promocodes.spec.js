import Vue from 'vue'
import VueRouter from 'vue-router'
import Promocodes from 'src/components/Promocodes'
import moxios from 'moxios'
import simulant from 'simulant'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {path: '/whatever', name: 'whatever', component: {render: h => '-'}},
    {path: '/promocodes', name: 'promocodes', component: Promocodes}
  ]
})
const vm = new Vue({
  el: document.createElement('div'),
  router: router,
  render: h => h('router-view')
})

describe('Promocodes.vue', () => {
  beforeEach(function (done) {
    moxios.install()
    router.push({path: 'whatever', query: {}})
    Vue.nextTick(() => {
      done()
    })
  })
  afterEach(function () {
    moxios.uninstall()
  })
  function routeToPromocodes (queryParams) {
    router.push({path: 'promocodes', query: queryParams})
  }
  it('should show the list of games', done => {
    // TODO define list of games
    var responseBody = {
    }
    moxios.stubRequest(process.env.API_URL + '/games/list', {
      status: 200,
      responseText: JSON.stringify(responseBody)
    })

    routeToPromocodes({gameId: 'GM01'})
    Vue.nextTick(() => {
      console.log('HTML: ' + vm.$el.querySelector('div'))
      moxios.wait(() => {
        done()
      })
    })
  })
})
