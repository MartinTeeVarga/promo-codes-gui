<template>
  <form id="editor" v-on:submit.prevent>
    <div class="u-full-width row">
      <label for="codeId">Promocode ID</label>
      <input class="u-full-width" type="text" placeholder="Any alphanumeric string, case insensitive" id="codeId"
             name="promocode" v-model="codeId" v-validate="'required|alpha_num'">
      <span v-show="errors.has('promocode')" class="error">{{ errors.first('promocode') }}</span>
    </div>
    <div class="row">
      <div class="six columns">
        <label for="from">Valid from</label>
        <input class="u-full-width" type="text" id="from" name="from" placeholder='YYYY-MM-DD' v-model="from" v-validate="'date_format:YYYY-MM-DD|required'">
        <span v-show="errors.has('from')" class="error">{{ errors.first('from') }}</span>
      </div>
      <div class="six columns">
        <label for="from">Valid to</label>
        <input class="u-full-width" type="text" id="to" name="to" placeholder='YYYY-MM-DD' v-model="to" v-validate="'date_format:YYYY-MM-DD|required'">
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
        <input type="checkbox" v-model="pub">
        <span class="label-body">Public code?</span>
      </label>
    </div>
    <hr/>
    <div class="row">
      <button class="button-primary three columns" @click="submit" :disabled="errors.any()">Save</button>
      <button class="three columns" @click="generate(8)">Generate new ID</button>
      <button class="three columns" type="reset">Clear</button>
      <button class="three columns">Cancel</button>
    </div>
  </form>
</template>

<script>

  import moment from 'moment'

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

  export default {
    name: 'editor',
    data: function () {
      return {
        gameId: '',
        codeId: 'FXVJD',
        from: moment(new Date()).format('YYYY-MM-DD'),
        to: moment(new Date()).format('YYYY-MM-DD'),
        pub: true,
        payload: 'Hello World'

      }
    },
    methods: {
      submit: function () {
        console.log(this.errors)
        if (this.errors.any()) {
          return
        } else {
          console.log('SUBMIT')
        }
      },
      generate: function (length) {
        this.codeId = randomStr(length)
      }
    }
  }
</script>

<style scoped>
  .error {
    color: red;
    font-size: small;
    display: inline-block;
    margin-bottom: 1em;
  }

</style>
