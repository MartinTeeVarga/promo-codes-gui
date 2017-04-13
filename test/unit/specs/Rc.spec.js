import rc from 'src/restClient'
import axios from 'axios'
import moxios from 'moxios'

describe.only('Rest Client', () => {
  beforeEach(function () {
    moxios.install()
  })
  afterEach(function () {
    moxios.uninstall()
  })

  it('should set the JWT token as a header', () => {
    rc.setToken('Token')
    expect(axios.defaults.headers.common['X-Token'])
      .to.equal('Token')
  })

  describe('deleteCode', function () {
    it('should delete code', done => {
      moxios.stubRequest(process.env.API_URL + '/games/GM01/codes/CD01', {
        status: 200
      })
      rc.deleteCode('GM01', 'CD01')
        .then(function (message) {
          expect(message).to.contain('CD01')
          done()
        })
    })
    it('should catch errors', function (done) {
      moxios.stubRequest(process.env.API_URL + '/games/GM01/codes/CD01', {
        status: 400
      })
      rc.deleteCode('GM01', 'CD01')
        .catch(function (message) {
          expect(message).to.contain('CD01')
          done()
        })
    })
  })
})
