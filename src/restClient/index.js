'use strict'

import axios from 'axios'

var Rc = function () {
// TBI
}

Rc.prototype.setToken = function (token) {
  axios.defaults.headers.common = {
    'X-Token': token
  }
}

Rc.prototype.deleteCode = function (gameId, codeId) {
  return new Promise((resolve, reject) => {
    axios.delete(process.env.API_URL + '/games/' + gameId + '/codes/' + codeId)
      .then(function (response) {
        resolve('Code ' + gameId + ' deleted.')
      })
      .catch(function (error) {
        console.error(error)
        reject('Error while deleting code ' + codeId)
      })
  })
}

export default new Rc()
