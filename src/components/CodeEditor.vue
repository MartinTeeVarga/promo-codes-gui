<template>
  <form id="editor" v-on:submit.prevent>
    <div class="u-full-width row">
      <label for="codeId">Promocode ID</label>
      <input class="u-full-width" type="text" placeholder="Any alphanumeric string, case insensitive" id="codeId"
             name="promocode" v-model="codeId" v-validate="'required|alpha_num'" :disabled="edit">
      <span v-show="errors.has('promocode')" class="error">{{ errors.first('promocode') }}</span>
    </div>
    <div class="row">
      <div class="six columns">
        <label for="from">Valid from</label>
        <input class="u-full-width" type="text" id="from" name="from" placeholder='YYYY-MM-DD' v-model="from"
               v-validate="'date_format:YYYY-MM-DD|required'">
        <span v-show="errors.has('from')" class="error">{{ errors.first('from') }}</span>
      </div>
      <div class="six columns">
        <label for="from">Valid to</label>
        <input class="u-full-width" type="text" id="to" name="to" placeholder='YYYY-MM-DD' v-model="to"
               v-validate="'date_format:YYYY-MM-DD|required'">
        <span v-show="errors.has('to')" class="error">{{ errors.first('to') }}</span>
      </div>
    </div>
    <div class="row">
      <label for="payload">Payload</label>
      <textarea class="u-full-width" placeholder="Any text you want, can be a json, etc." id="payload"
                v-model="payload"></textarea>
    </div>
    <div class="row">
      <label>
        <input type="checkbox" v-model="pub" id="pub">
        <span class="label-body">Public code?</span>
      </label>
    </div>
    <hr/>
    <div class="row">
      <button id="save" class="button-primary four columns" @click="submit" :disabled="errors.any()">
        <span class="fa fa-floppy-o" aria-hidden="true"></span> Save
      </button>
      <button id="generate" v-if="!edit" class="four columns" @click="generate(8)">
        <span class="fa fa-random" aria-hidden="true"></span> Generate ID
      </button>
      <button id="delete" v-if="edit" class="button-primary four columns">
        <span class="fa fa-trash" aria-hidden="true"></span> Delete
      </button>
      <button id="cancel" class="four columns" @click="$router.back()">
        <span class="fa fa-ban" aria-hidden="true"></span> Cancel
      </button>
    </div>
  </form>
</template>

<script>

  import moment from 'moment'
  import axios from 'axios'

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function randomStr (length) {
    var str = ''
    for (var i = 0; i < length; i++) {
      str += chars[getRandomInt(0, chars.length - 1)]
    }
    return str
  }

  function format (str) {
    return moment(str).format('YYYY-MM-DD')
  }

  export default {
    name: 'code-editor',
    created () {
      this.maybeFetch()
    },
    data: function () {
      return {
        edit: false,
        gameId: '',
        codeId: '',
        from: '',
        to: '',
        pub: true,
        payload: ''
      }
    },
    watch: {
      codeId: function () {
        this.codeId = this.codeId.toUpperCase()
      },
      '$route': 'maybeFetch'
    },
    methods: {
      submit: function () {
        if (this.errors.any()) {
          return
        } else {
          console.log('SUBMIT')
        }
      },
      generate: function (length) {
        this.codeId = randomStr(length)
      },
      maybeFetch: function () {
        var q = this.$route.query
        var self = this
        if (q.gameId && q.codeId) {
          axios.get(process.env.API_URL + '/games/' + q.gameId + '/codes/' + q.codeId)
            .then(function (response) {
              if (response.status === 200) {
                var d = response.data
                self.codeId = d.codeId
                self.gameId = d.gameId
                self.from = format(d.from)
                self.to = format(d.to)
                self.pub = d.pub
                self.payload = d.payload
                self.edit = true
              } else {
                console.log(response)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    }
  }
</script>

<style scoped>
</style>
