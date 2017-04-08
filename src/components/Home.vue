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
//  import axios from 'axios'

  export default {
    name: 'home',
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
    }
  }
</script>

<style scoped>
</style>
