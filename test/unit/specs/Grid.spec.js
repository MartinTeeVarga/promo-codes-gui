import Vue from 'vue';
import Grid from 'src/components/Grid';

function element (Component, propsData) {
  const Ctor = Vue.extend(Component);
  const vm = new Ctor({ propsData }).$mount();
  return vm.$el;
}

describe('Grid.vue', () => {
  it('should render column headers', () => {
    const el = element(Grid, {
      data: [],
      columns: [
        {key: 'a', name: 'ColumnA', filter: 'none'},
        {key: 'b', name: 'ColumnB', filter: 'none'}
      ],
      initialSortKey: 'a'
    });
    expect(el.querySelector('thead th.active').textContent.trim())
      .to.equal('ColumnA');
    expect(el.querySelector('thead th.active span').className)
      .to.equal('fa fa-caret-up');
    expect(el.querySelector('thead th:not(.active)').textContent.trim())
      .to.equal('ColumnB');
  });
});
