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
      rc.setToken('Token')
      rc.deleteCode('GM01', 'CD01')
        .then(function (message) {
          expect(message).to.contain('CD01')
          let request = moxios.requests.mostRecent()
          expect(request.config.method).to.equal('delete')
          expect(request.config.headers['X-Token']).to.equal('Token')
          done()
        })
    })
    it('should catch errors', done => {
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

  describe('createCode', function () {
    it('should create new code', done => {
      moxios.stubRequest(process.env.API_URL + '/games/GM01/codes', {
        status: 200
      })
      var code = {
        gameId: 'GM01',
        codeId: 'CD01',
        from: '1',
        to: '2',
        pub: true,
        payload: 'empty'
      }
      rc.setToken('Token')
      rc.createCode(code)
        .then(function (message) {
          expect(message).to.contain('CD01')
          let request = moxios.requests.mostRecent()
          expect(request.config.method).to.equal('post')
          expect(request.config.headers['X-Token']).to.equal('Token')
          expect(JSON.parse(request.config.data)).to.deep.equal(code)
          done()
        })
    })
    it('should catch errors', done => {
      moxios.stubRequest(process.env.API_URL + '/games/GM01/codes', {
        status: 400
      })
      var code = {
        gameId: 'GM01',
        codeId: 'CD01',
        from: '1',
        to: '2',
        pub: true,
        payload: 'empty'
      }
      rc.createCode(code)
        .catch(function (message) {
          expect(message).to.contain('CD01')
          done()
        })
    })
  })
})
