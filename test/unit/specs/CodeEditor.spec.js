import Vue from 'vue'
import VueRouter from 'vue-router'
import CodeEditor from 'src/components/CodeEditor'
import moxios from 'moxios'
import moment from 'moment'
import VeeValidate, {Validator} from 'vee-validate'
import simulant from 'simulant'

Validator.installDateTimeValidators(moment)
Vue.use(VeeValidate)

Vue.use(VueRouter)
var realRouter = new VueRouter({
  routes: [
    {path: '/whatever', name: 'whatever', component: {render: h => '-'}},
    {path: '/code', name: 'code', component: CodeEditor}
  ]
})
const router = sinon.spy(realRouter, 'push')
const vm = new Vue({
  el: document.createElement('div'),
  router: router,
  render: h => h('router-view')
})

describe('CodeEditor.vue', () => {
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
  function routeToCodeEditor (queryParams) {
    router.push({path: 'code', query: queryParams})
  }

  it('should render empty form on new', done => {
    routeToCodeEditor()
    Vue.nextTick(() => {
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
  it('should render filled form on edit', done => {
    var responseBody = {
      gameId: 'GM01',
      codeId: 'CD01',
      from: '2017-02-17T02:16:07+00:00',
      to: '2017-02-19T02:16:07+00:00',
      pub: false,
      payload: 'hello'
    }
    moxios.stubRequest(process.env.API_URL + '/games/GM01/codes/CD01', {
      status: 200,
      responseText: JSON.stringify(responseBody)
    })

    routeToCodeEditor({gameId: 'GM01', codeId: 'CD01'})
    Vue.nextTick(() => {
      moxios.wait(() => {
        expect(vm.$el.querySelector('#codeId').value).to.equal('CD01')
        expect(vm.$el.querySelector('#from').value).to.equal('2017-02-17')
        expect(vm.$el.querySelector('#to').value).to.equal('2017-02-19')
        expect(vm.$el.querySelector('#pub').checked).to.be.false
        expect(vm.$el.querySelector('#payload').value).to.equal('hello')
        expect(vm.$el.querySelector('#save')).to.exist
        expect(vm.$el.querySelector('#delete')).to.exist
        expect(vm.$el.querySelector('#generate')).to.not.exist
        expect(vm.$el.querySelector('#cancel')).to.exist
        done()
      })
    })
  })
  it('should re-generate code on button click', done => {
    routeToCodeEditor()
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#codeId').value).to.be.empty
      let button = vm.$el.querySelector('#generate')
      simulant.fire(button, 'click')
      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#codeId').value).to.match(/^[A-Z0-9]{8}$/)
        done()
      })
    })
  })
})
