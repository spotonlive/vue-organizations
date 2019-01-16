import organizations from './fixture/organizations'

describe('issues', () => {
  let vm
  beforeEach(() => {
    vm = new Vue()
  })


  describe('#24', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$org('continue-with-new-account'),
        organizations[Vue.config.org]['continue-with-new-account']
      )
    })
  })

  describe('#35', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$org('underscore', { helloMsg: 'hello' }),
        'hello world'
      )
    })
  })

  describe('#42, #43', () => {
    it('should not be occured error', () => {
      assert.equal(
        vm.$org('message[\'hello\']'),
        organizations[Vue.config.org]['message']['hello']
      )
    })
  })

  describe('#51', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$org('message.hyphen-organization'),
        'hello hyphen'
      )
    })
  })

  describe('#91, #51', () => {
    it('should be translated', () => {
      const arrayOrganizations = organizations[Vue.config.org].issues.arrayBugs
      for (let i = 0; i < arrayOrganizations.length; i++) {
        const item = vm.$org('issues.arrayBugs')[i]
        assert.equal(item, arrayOrganizations[i])
      }
    })
  })

  describe('#97', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$org('message.1234'),
        organizations[Vue.config.org]['message']['1234']
      )
      assert.equal(
        vm.$org('message.1mixedKey'),
        organizations[Vue.config.org]['message']['1mixedKey']
      )
    })
  })
})
