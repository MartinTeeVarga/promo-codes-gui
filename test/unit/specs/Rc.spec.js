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
})
