<template>
  <div>
    <div>That's what it's all about.</div>
    <div class="container">
      <div>
        With Facebook: <a href="http://localhost:8080/login/facebook">click here</a>
      </div>
      <div>
        With Github: <a href="http://localhost:8080/login/github">click here</a>
      </div>
      <div>
        With Dev: <a href="http://localhost:8080/dev?userId=Krtek">click here</a>
      </div>
      <div>
        Logout <a href="http://localhost:8080/logout">click here</a>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'about',
    created () {
      this.fetch()
    },
    data () {
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
        var xToken = this.$cookies.get('X-Token')
        console.log('GETTING WITH COOKIE XTOKEN: ' + xToken)
//        var self = this
        var config = {
          headers: {'X-Token': xToken}
        }
        axios.get('http://localhost:8080/api/v1/user', config)
          .then(function (response) {
            console.log(response.data)
          })
      }
    }
  }
</script>

<style scoped>
</style>
