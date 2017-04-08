<template>
  <div class="row">
    <div class="row">
      <label for="games">Games</label>
      <select class="u-full-width" id="games" v-model="selected">
        <option disabled selected value="none"> -- select a game --</option>
        <option v-for="game in gameData" :value="game.gameId">{{game.attributes.name}}</option>
      </select>
    </div>
    <div class="row">
      <button class="button-primary" @click="createNewCode()"><span class="fa fa-file-o" aria-hidden="true"></span>&nbsp;Add
        code
      </button>
      <button><span class="fa fa-files-o" aria-hidden="true"></span>&nbsp;Generate multiple</button>
      <button @click="deleteSelected()"><span class="fa fa-trash" aria-hidden="true"></span>&nbsp;Delete selected
      </button>
    </div>
    <div class="row">
      <grid-component
        :data="gridData"
        :columns="gridColumns"
        :initialSortKey="sortKey"
        :editCallback="editEntry"
        :deleteCallback="deleteEntry">
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
      createNewCode: function () {
        this.$router.push({
          name: 'code',
          query: {
            gameId: this.selected
          }
        })
      },
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
            var q = self.$route.query
            if (q.gameId) {
              // TODO only do it if there is such id
              console.log('PRESELECTED ' + q.gameId)
              self.selected = q.gameId
            } else {
              // TODO remove this
              self.selected = self.gameData[0].gameId
            }
          })
      },
      deleteSelected: function () {
        // make a copy of data
        var self = this
        var data = self.gridData.slice(0)
        data.forEach(function (item) {
          if (item.selected) {
            self.deleteEntry(item)
          }
        })
      },
      deleteEntry: function (entry) {
        var self = this
        axios.delete(process.env.API_URL + '/games/' + entry.gameId + '/codes/' + entry.codeId)
          .then(function (response) {
            if (response.status === 200) {
              self.gridData = self.gridData.filter(function (item) {
                return !(entry.codeId === item.codeId && entry.gameId === item.gameId)
              })
            } else {
              console.log('Cannot delete ' + JSON.stringify(entry))
            }
          })
          .catch(function (error) {
            console.log('ERR ' + JSON.stringify(error))
          })
      },
      editEntry: function (entry) {
        this.$router.push({
          name: 'code',
          query: {
            gameId: entry.gameId,
            codeId: entry.codeId
          }
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
