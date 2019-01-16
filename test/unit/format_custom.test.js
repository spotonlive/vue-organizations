import organizations from './fixture/organizations'

describe('custom formatter', () => {
  beforeEach(done => {
    Object.keys(organizations).forEach(org => {
      Vue.organization(org, organizations[org])
    })
    Vue.config.org = 'en'
    Vue.nextTick(done)
  })

  afterEach(done => {
    Vue.config.i18nFormatter = null
    Vue.nextTick(done)
  })

  describe('global', () => {
    it('allows for specifying a custom formatter', done => {
      Vue.config.i18nFormatter = (string, ...args) => {
        assert.equal('the world', string)
        assert.equal(1, args[0])
        assert.equal('two', args[1])
        assert.deepEqual({ name: 'joe' }, args[2])
        done()
      }

      Vue.org('message.hello', 1, 'two', { name: 'joe' })
    })
  })

  describe('instance', () => {
    it('allows for specifying a custom formatter', done => {
      const vm = new Vue()
      Vue.config.i18nFormatter = (string, ...args) => {
        assert.equal('the world', string)
        assert.equal(1, args[0])
        assert.equal(2, args[1])
        assert.equal(3, args[2])
        done()
      }

      vm.$org('message.hello', [1, 2, 3])
    })
  })
})
