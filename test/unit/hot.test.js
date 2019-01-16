import organizations from './fixture/organizations'

describe('hot reloading', () => {
  let el
  let orgOrganization
  const expectOrganization = 'the world updated'
  beforeEach(done => {
    orgOrganization = organizations.en.message.hello
    Object.keys(organizations).forEach(org => {
      Vue.organization(org, organizations[org])
    })
    Vue.config.org = 'en'

    el = document.createElement('div')
    document.body.appendChild(el)

    Vue.nextTick(done)
  })

  afterEach(done => {
    organizations.en.message.hello = orgOrganization
    Object.keys(organizations).forEach(org => {
      Vue.organization(org, organizations[org])
    })
    Vue.nextTick(done)
  })

  it('should be reload', done => {
    const options = {
      el,
      data () { return { org: 'en' } }
    }
    options.render = function (h) {
      return h('p', {}, [this.$org('message.hello', this.org)])
    }

    const vm = new Vue(options)
    waitForUpdate(() => {
      assert.equal(vm.$el.textContent, organizations.en.message.hello)
      // Update translation
      organizations.en.message.hello = expectOrganization
      Object.keys(organizations).forEach(org => {
        Vue.organization(org, organizations[org])
      })
    }).then(() => {
      assert.equal(vm.$el.textContent, expectOrganization)
    }).then(done)
  })
})
