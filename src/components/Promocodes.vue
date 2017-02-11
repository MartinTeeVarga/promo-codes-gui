<template>
  <div class="row">
    <grid-component
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery">>
    </grid-component>
  </div>
</template>

<script>
  import GridComponent from 'components/Grid';
  import axios from 'axios';

  export default {
    name: 'promocodes',
    data () {
      axios.get('http://localhost:8080/api/v1/games/test/codes/list')
        .then(function (response) {
          console.log(response.data); // ex.: { user: 'Your User'}
          console.log(response.status); // ex.: 200
        });

      return {
        searchQuery: '',
        gridColumns: ['name', 'power'],
        gridData: [
          {name: 'Chuck Norris', power: Infinity},
          {name: 'Bruce Lee', power: 9000},
          {name: 'Jackie Chan', power: 7000},
          {name: 'Jet Li', power: 8000}
        ]
      };
    },
    methods: {
      foo: function () {
        axios.get('http://localhost:8080/api/v1/games/test/codes/list')
          .then(function (response) {
            console.log(response.data);
            console.log(response.status);
          });
      }
    },
    components: {
      GridComponent
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
