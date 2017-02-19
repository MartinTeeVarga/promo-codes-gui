import Vue from 'vue'
import VueRouter from 'vue-router'
import CodeEditor from 'src/components/CodeEditor'
import moxios from 'moxios'
import moment from 'moment'
import VeeValidate, { Validator } from 'vee-validate'

Validator.installDateTimeValidators(moment)
Vue.use(VeeValidate)

describe('CodeEditor.vue', () => {
  describe('REST calls', () => {
    beforeEach(function () {
      moxios.install()
    })
    afterEach(function () {
      moxios.uninstall()
    })
    function createAndRouteToCodeEditor (query) {
      Vue.use(VueRouter)
      const router = new VueRouter({
        routes: [
          {path: '/code', name: 'code', component: CodeEditor}
        ]
      })
      const vm = new Vue({
        el: document.createElement('div'),
        router: router,
        render: h => h('router-view')
      })
      router.push({name: 'code', query: query})
      return vm
    }
    it('should totest renders stuff', done => {
      var vm = createAndRouteToCodeEditor()
      Vue.nextTick(() => {
        console.log('html:', vm.$el)
        console.log('input:', vm.$el.querySelector('#codeId'))
        expect(vm.$el.querySelector('#codeId').value).to.be.empty
        expect(vm.$el.querySelector('#from').value).to.be.empty
        expect(vm.$el.querySelector('#to').value).to.be.empty
        expect(vm.$el.querySelector('#pub').checked).to.be.true
        expect(vm.$el.querySelector('#payload').textContent).to.be.empty
        expect(vm.$el.querySelector('#save')).to.exist
        expect(vm.$el.querySelector('#delete')).to.not.exist
        expect(vm.$el.querySelector('#generate')).to.exist
        expect(vm.$el.querySelector('#cancel')).to.exist
        done()
      })
    })
  })
  // describe('The rest (hahaha)', () => {
  //
  // })


  // it('should render filled form on edit', done => {
  //   var vm = createAndRouteToCodeEditor({gameId: 'GM01', codeId: 'CD01'})
  //   var responseBody = {
  //     gameId: 'GM01',
  //     codeId: 'CD01',
  //     from: '2017-02-17T02:16:07+00:00',
  //     to: '2017-02-19T02:16:07+00:00',
  //     pub: false,
  //     payload: 'hello'
  //   }
  //   moxios.stubRequest(process.env.API_URL + '/games/GM01/codes/CD01', {
  //     status: 200,
  //     responseText: JSON.stringify(responseBody)
  //   })
  //
  //   moxios.wait(moxDone => {
  //     expect(vm.$el.querySelector('#codeId').value).to.equal('CD01')
  //     expect(vm.$el.querySelector('#from').value).to.equal('2017-02-17')
  //     expect(vm.$el.querySelector('#to').value).to.equal('2017-02-19')
  //     expect(vm.$el.querySelector('#pub').checked).to.be.false
  //     expect(vm.$el.querySelector('#payload').value).to.equal('hello')
  //     expect(vm.$el.querySelector('#save')).to.exist
  //     expect(vm.$el.querySelector('#delete')).to.exist
  //     expect(vm.$el.querySelector('#generate')).to.not.exist
  //     expect(vm.$el.querySelector('#cancel')).to.exist
  //     moxDone()
  //     done()
  //   })
  // })
})
