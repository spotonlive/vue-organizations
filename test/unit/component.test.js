import organizations from './fixture/organizations'

describe('component organizations', () => {
  let vm
  beforeEach(done => {
    Object.keys(organizations).forEach(org => {
      Vue.organization(org, organizations[org])
    })
    Vue.config.org = 'en'

    const el = document.createElement('div')
    const compOptions = {
      organizations: {
        en: {
          foo: {
            bar: {
              buz: 'hello world'
            }
          },
          fallback: 'this is fallback on component'
        },
        ja: {
        }
      }
    }
    compOptions.render = function (h) {
      return h('p', {}, [this.$org('foo.bar.buz')])
    }

    const options = {
      el,
      components: { component1: compOptions }
    }

    options.render = function (h) {
      return h('div', {}, [h('component1', {})])
    }

    vm = new Vue(options)
    vm.$nextTick(done)
  })

  describe('local', () => {
    it('should be translated', () => {
      const comp1 = vm.$children[0] // component1
      assert.equal(comp1.$org('foo.bar.buz'), 'hello world')
      assert.equal(comp1.$el.innerText, 'hello world')
    })
  })

  describe('global', () => {
    it('should be translated', () => {
      const comp1 = vm.$children[0] // component1
      assert.equal(comp1.$org('message.hello'), 'the world')
    })
  })

  describe('fallback', () => {
    it('should be work', () => {
      const comp1 = vm.$children[0] // component1
      assert.equal(comp1.$org('fallback', 'ja'), 'this is fallback on component')
    })
  })

  describe('$org', () => {
    it('should be work', () => {
      const comp1 = vm.$children[0] // component1
      assert.equal(comp1.$org, 'en')
    })
  })
})
