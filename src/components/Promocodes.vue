<template>
  <div class="row">
    <div class="row">
      <label for="games">Games</label>
      <select class="u-full-width" id="games" v-model="selected">
        <option disabled selected value="none"> -- select a game -- </option>
        <option v-for="game in gameData" :value="game.gameId">{{game.attributes.name}}</option>
      </select>
    </div>
    <div class="row">
      <button class="button-primary"><span class="fa fa-file-o" aria-hidden="true"></span>&nbsp;Add code</button>
      <button><span class="fa fa-files-o" aria-hidden="true"></span>&nbsp;Generate multiple</button>
      <button><span class="fa fa-trash" aria-hidden="true"></span>&nbsp;Delete selected</button>
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
      this.fetchGames()
    },
    data () {
      return {
        selected: 'none',
        gridColumns: [
          {key: 'codeId', name: 'Code', filter: 'none'},
          {key: 'from', name: 'From', filter: 'localDate'},
          {key: 'to', name: 'To', filter: 'localDate'},
          {key: 'pub', name: 'Public', filter: 'boolean'}],
        gridData: [],
        gameData: [],
        sortKey: 'codeId'
      }
    },
    methods: {
      fetchCodes: function () {
        var self = this
        axios.get(process.env.API_URL + '/games/' + self.selected + '/codes/list')
          .then(function (response) {
            // todo deal with errors
            var gridData = response.data
            gridData.forEach(function (item) {
              // add selected flag before passing to the component
              item.selected = false
            })
            self.gridData = gridData
          })
      },
      fetchGames: function () {
        var self = this
        axios.get(process.env.API_URL + '/games/list')
          .then(function (response) {
            // todo deal with errors
            self.gameData = response.data
            self.selected = 'GAME-1'
          })
      }
    },
    watch: {
      selected: 'fetchCodes'
    },
    components: {
      GridComponent
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
