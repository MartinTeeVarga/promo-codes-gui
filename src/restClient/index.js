'use strict'

import axios from 'axios'

var rc = {
  setToken: function (token) {
    axios.defaults.headers.common = {
      'X-Token': token
    }
  }
}

export default rc
