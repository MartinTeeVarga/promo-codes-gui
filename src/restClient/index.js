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
      .then(function () {
        resolve('Code ' + codeId + ' deleted.')
      })
      .catch(function (error) {
        console.error(error)
        reject('Error while deleting code ' + codeId)
      })
  })
}
Rc.prototype.createCode = function (code) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.API_URL + '/games/' + code.gameId + '/codes', code)
      .then(function () {
        resolve('Code ' + code.codeId + ' created.')
      })
      .catch(function (error) {
        console.error(error)
        reject('Error while creating code ' + code.codeId)
      })
  })
}

export default new Rc()
