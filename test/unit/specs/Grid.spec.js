import Vue from 'vue'
import Grid from 'src/components/Grid'
import simulant from 'simulant'

function create (Component, propsData) {
  const Ctor = Vue.extend(Component)
  return new Ctor({propsData}).$mount()
}

describe('Grid.vue', () => {
  var clock
  beforeEach(function () {
    clock = sinon.useFakeTimers()
  })
  afterEach(function () {
    clock.restore()
  })
  it('should render column headers', () => {
    const vm = create(Grid, {
      data: [],
      columns: [
        {key: 'a', name: 'ColumnA', filter: 'none'},
        {key: 'b', name: 'ColumnB', filter: 'none'}
      ],
      initialSortKey: 'a'
    })
    expect(vm.$el.querySelector('thead th.active').textContent.trim())
      .to.equal('ColumnA')
    expect(vm.$el.querySelector('thead th.active span').className)
      .to.equal('fa fa-caret-up')
    expect(vm.$el.querySelector('thead th:not(.active)').textContent.trim())
      .to.equal('ColumnB')
  })
  it('should debounce search', () => {
    const vm = create(Grid, {
      data: [],
      columns: [
        {key: 'a', name: 'ColumnA', filter: 'none'},
        {key: 'b', name: 'ColumnB', filter: 'none'}
      ],
      initialSortKey: 'a'
    })

    var spy = sinon.spy()
    vm.setFilterKey = spy
    var box = vm.$el.querySelector('#filterBox')
    var event = simulant('input')

    simulant.fire(box, event)
    simulant.fire(box, event)
    simulant.fire(box, event)
    spy.should.not.have.been.called
    clock.tick(300)
    spy.should.not.have.been.called
    clock.tick(300)
    spy.should.have.been.called.once
  })
  it('should filter results', done => {
    const vm = create(Grid, {
      data: [{a: 'Hello', b: 'World'}, {a: 'Ehlo', b: 'World'}],
      columns: [
        {key: 'a', name: 'ColumnA', filter: 'none'},
        {key: 'b', name: 'ColumnB', filter: 'none'}
      ],
      initialSortKey: 'a'
    })
    vm.setFilterKey({target: {value: 'hello'}})
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('table').textContent.trim())
        .to.contain('Hello')
      expect(vm.$el.querySelector('table').textContent.trim())
        .not.to.contain('Ehlo')
      done()
    })
  })
  it.only('should sort results', done => {
    const vm = create(Grid, {
      data: [{a: 'A', b: 'X'}, {a: 'D', b: 'Z'}],
      columns: [
        {key: 'a', name: 'Column1', filter: 'none'},
        {key: 'b', name: 'Column2', filter: 'none'}
      ],
      initialSortKey: 'a'
    })
    expect(vm.$el.querySelector('table').textContent.replace(/\r?\n|\r/g, ''))
      .to.match(/.*A.*X.*D.*Z.*/)
    var th = vm.$el.querySelector('th:not(.active)')
    simulant.fire(th, 'click')
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('table').textContent.replace(/\r?\n|\r/g, ''))
        .to.match(/.*D.*Z.*A.*X.*/)
      done()
    })
  })
})
