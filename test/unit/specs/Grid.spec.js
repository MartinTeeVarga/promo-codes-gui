import Vue from 'vue';
import Grid from 'src/components/Grid';

function create (Component, propsData) {
  const Ctor = Vue.extend(Component);
  return new Ctor({ propsData }).$mount();
}

describe('Grid.vue', () => {
  it('should render column headers', () => {
    const vm = create(Grid, {
      data: [],
      columns: [
        {key: 'a', name: 'ColumnA', filter: 'none'},
        {key: 'b', name: 'ColumnB', filter: 'none'}
      ],
      initialSortKey: 'a'
    });
    expect(vm.$el.querySelector('thead th.active').textContent.trim())
      .to.equal('ColumnA');
    expect(vm.$el.querySelector('thead th.active span').className)
      .to.equal('fa fa-caret-up');
    expect(vm.$el.querySelector('thead th:not(.active)').textContent.trim())
      .to.equal('ColumnB');
  });
  it('should debounce search', () => {
    const vm = create(Grid, {
      data: [],
      columns: [
        {key: 'a', name: 'ColumnA', filter: 'none'},
        {key: 'b', name: 'ColumnB', filter: 'none'}
      ],
      initialSortKey: 'a'
    });
    var box = vm.$el.querySelector('#filterBox');
    //TODO figure out how to send keys
  });
});
