<template>
  <div class="row">
    <div class="row">
      <label for="games">Games</label>
      <select class="u-full-width" id="games" v-model="selected">
        <option value="GAME-1">Game 1</option>
        <option value="GAME-2">Game 2</option>
        <option value="GAME-3">Game 3</option>
      </select>
    </div>
    <div class="row">
      <button class="button-primary"><span class="fa fa-file-o" aria-hidden="true"></span>&nbsp;Add code</button>
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
    created () {
      this.fetch()
    },
    data () {
      return {
        selected: 'GAME-1',
        gridColumns: [
          {key: 'codeId', name: 'Code', filter: 'none'},
          {key: 'from', name: 'From', filter: 'localDate'},
          {key: 'to', name: 'To', filter: 'localDate'},
          {key: 'pub', name: 'Public', filter: 'boolean'}],
        gridData: [],
        sortKey: 'codeId'
      }
    },
    methods: {
      fetch: function () {
        var self = this
        axios.get(process.env.API_URL + '/games/' + self.selected + '/codes/list')
          .then(function (response) {
            // todo deal with errors
            self.gridData = response.data
          })
      }
    },
    watch: {
      selected: 'fetch'
    },
    components: {
      GridComponent
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
