<template>
  <div class="row">
    <grid-component
      :data="gridData"
      :columns="gridColumns"
      :initialSortKey="sortKey">
    </grid-component>
  </div>
</template>

<script>
  import GridComponent from 'components/Grid';
  import axios from 'axios';

  export default {
    name: 'promocodes',
    data () {
      this.fetch();
      return {
        gridColumns: [
          {key: 'codeId', name: 'Code', filter: 'none'},
          {key: 'from', name: 'From', filter: 'localDate'},
          {key: 'to', name: 'To', filter: 'localDate'},
          {key: 'pub', name: 'Public', filter: 'none'}],
        gridData: [],
        sortKey: 'codeId'
      };
    },
    methods: {
      fetch: function () {
        var self = this;
        console.log('URL: ' + 'gg');
        axios.get('http://localhost:8080/api/v1/games/GAME0/codes/list')
          .then(function (response) {
            self.gridData = response.data;
//            console.log(response.data); // ex.: { user: 'Your User'}
//            console.log(response.status); // ex.: 200
          });
      }
    },
    components: {
      GridComponent
    }
  };
  //  var json = {
  //    "_embedded": {
  //      "codeList": [{
  //        "from": "2017-01-28T06:18:34+00:00",
  //        "to": "2037-01-28T06:18:34+00:00",
  //        "pub": true,
  //        "payload": "Hello World",
  //        "codeId": "PUB1",
  //        "gameId": "test",
  //        "_links": {
  //          "self": {
  //            "href": "/api/v1/games/test/codes/PUB1"
  //          }
  //        }
  //      }, {
  //        "from": "2017-02-10T06:10:16+00:00",
  //        "to": "2019-02-10T06:10:16+00:00",
  //        "pub": true,
  //        "payload": "Something",
  //        "codeId": "PUB2",
  //        "gameId": "test",
  //        "_links": {
  //          "self": {
  //            "href": "/api/v1/games/test/codes/PUB2"
  //          }
  //        }
  //      }]
  //    },
  //    "page": {
  //      "size": 2,
  //      "totalElements": 2,
  //      "totalPages": 1,
  //      "number": 0
  //    }
  //  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
