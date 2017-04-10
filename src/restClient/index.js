'use strict'

import axios from 'axios'

var Rc = function () {

}

Rc.prototype.setToken = function (token) {
  axios.defaults.headers.common = {
    'X-Token': token
  }
}

export default new Rc()
