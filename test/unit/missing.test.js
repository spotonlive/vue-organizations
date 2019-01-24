describe('missing', () => {
  let org
  beforeEach(() => {
    org = Vue.config.org
    Vue.config.org = 'freemium'
  })

  afterEach(done => {
    Vue.config.org = org
    Vue.config.missingHandler = null
    Vue.nextTick(done)
  })

  describe('global', () => {
    it('should be handled translate missing', done => {
      Vue.config.missingHandler = (org, key, vm) => {
        assert.equal('freemium', org)
        assert.equal('foo.bar.buz', key)
        assert(vm === null)
        done()
      }

      Vue.org('foo.bar.buz')
    })
  })

  describe('instance', () => {
    it('should be handled translate missing', done => {
      const vm = new Vue()
      Vue.config.missingHandler = (org, key, instance) => {
        assert.equal('freemium', org)
        assert.equal('foo.bar.buz', key)
        assert(vm === instance)
        done()
      }

      vm.$org('foo.bar.buz')
    })
  })
})
