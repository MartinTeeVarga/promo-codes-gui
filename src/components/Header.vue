<template>
  <div class="row">
    <div class="row">
      <div class="u-pull-left">
        <h1>Jepice</h1>
      </div>
      <div v-if="user == null" class="u-pull-right">
        <!--for now only dev-->
        <a href="http://localhost:8080/dev?userId=Krtek" class="button button-primary"><span class="fa fa-sign-in" aria-hidden="true"></span>&nbsp;Sign
          In</a>
      </div>
      <div v-else class="u-pull-right">
        <button>
          <span class="fa fa-user-circle" aria-hidden="true"></span>
          <span>{{user.attributes.name}}</span>
        </button>
        <a href="/" @click="destroy" class="button button-primary"><span class="fa fa-sign-out" aria-hidden="true"></span>Sign out</a>
      </div>
    </div>
    <div class="row">
      <nav class="navbar">
        <div class="row">
          <ul class="navbar-list centered">
            <li class="navbar-item">
              <router-link class="navbar-link" to="/home">Home</router-link>
            </li>
            <li v-if="user != null" class="navbar-item">
              <router-link class="navbar-link" to="/promocodes">Promo Codes</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import rc from '../restClient'

  export default {
    name: 'header',
    created () {
      rc.setToken(this.$cookies.get('X-Token'))
      this.fetch()
    },
    data () {
      return {
        user: null
      }
    },
    methods: {
      fetch: function () {
        var self = this
        axios.get('http://localhost:8080/api/v1/user')
          .then(function (response) {
            console.log(response)
            if (response.status === 200) {
              self.user = response.data
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      destroy: function () {
        this.$cookies.remove('X-Token')
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
