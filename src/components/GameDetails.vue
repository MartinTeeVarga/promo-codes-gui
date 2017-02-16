<template>
  <div class="row">
    <div class="row">
      <button class="button-primary"><span class="fa fa-file-o" aria-hidden="true"></span>&nbsp;Add code</button>
      <button class="button-primary"><span class="fa fa-files-o" aria-hidden="true"></span>&nbsp;Generate</button>
    </div>
    <div class="row">
      <grid-component
        :data="gridData"
        :columns="gridColumns"
        :initialSortKey="sortKey">
      </grid-component>
    </div>
  </div>
</template>

<script>
  import GridComponent from 'components/Grid'
  import axios from 'axios'

  export default {
    name: 'promocodes',
    data () {
      this.fetch()
      return {
        gridColumns: [
          {key: 'codeId', name: 'Code', filter: 'none'},
          {key: 'from', name: 'From', filter: 'localDate'},
          {key: 'to', name: 'To', filter: 'localDate'},
          {key: 'pub', name: 'Public', filter: 'none'}],
        gridData: [],
        sortKey: 'codeId'
      }
    },
    methods: {
      fetch: function () {
        var self = this
        axios.get(process.env.API_URL + '/games/GAME0/codes/list')
          .then(function (response) {
            // todo deal with errors
            self.gridData = response.data
          })
      }
    },
    components: {
      GridComponent
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
