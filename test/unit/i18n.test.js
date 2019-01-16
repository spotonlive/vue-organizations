import organizations from './fixture/organizations'

describe('i18n', () => {
  beforeEach(done => {
    Object.keys(organizations).forEach(org => {
      Vue.organization(org, organizations[org])
    })
    Vue.config.org = 'en'
    Vue.nextTick(done)
  })

  describe('Vue.org', () => {
    describe('en organization', () => {
      it('should translate an english', () => {
        assert.equal(Vue.org('message.hello'), organizations.en.message.hello)
      })
    })

    describe('empty string', () => {
      it('should support empty string', () => {
        assert.equal(Vue.org('message.empty'), organizations.en.message.empty)
      })
    })

    describe('linked translation', () => {
      it('should translate simple link', () => {
        assert.equal(Vue.org('message.link'), organizations.en.message.hello)
      })
    })

    describe('linked translation', () => {
      it('should translate link at the end of organization', () => {
        assert.equal(Vue.org('message.linkEnd'), 'This is a linked translation to the world')
      })
    })

    describe('linked translation', () => {
      it('should translate link within a organization', () => {
        assert.equal(Vue.org('message.linkWithin'), 'Isn\'t the world we live in great?')
      })
    })

    describe('linked translation', () => {
      it('should translate multiple links within a organization', () => {
        assert.equal(Vue.org('message.linkMultiple'), 'Hello hoge!, isn\'t the world great?')
      })
    })

    describe('ja organization', () => {
      it('should translate a japanese', () => {
        assert.equal(Vue.org('message.hello', 'ja'), organizations.ja.message.hello)
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          assert.equal(Vue.org(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          assert.equal(Vue.org(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          assert.equal(Vue.org('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          assert.equal(Vue.org('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          assert.equal(
            Vue.org('Hello {0}', ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          assert.equal(Vue.org('Hello'), 'Hello')
        })
      })

      describe('array keypath', () => {
        describe('basic', () => {
          it('should be translated', () => {
            assert.equal(Vue.org('errors[0]'), organizations.en.errors[0])
          })
        })

        describe('object', () => {
          it('should be translated', () => {
            assert.equal(Vue.org('errors[1].internal1'), organizations.en.errors[1].internal1)
          })
        })

        describe('array', () => {
          it('should be translated', () => {
            assert.equal(Vue.org('errors[2][0]'), organizations.en.errors[2][0])
          })
        })
      })
    })

    describe('format arguments', () => {
      describe('named', () => {
        it('should return replaced string', () => {
          assert.equal(
            Vue.org('message.format.named', { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      describe('list', () => {
        it('should return replaced string', () => {
          assert.equal(
            Vue.org('message.format.list', ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('organization argument', () => {
      it('should return empty string', () => {
        assert.equal(Vue.org('message.hello', 'ja'), organizations.ja.message.hello)
      })
    })

    describe('format & organization arguments', () => {
      it('should return replaced string', () => {
        assert.equal(
          Vue.org('message.format.list', 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        assert.equal(
          Vue.org('message.fallback', 'ja'),
            organizations.en.message.fallback
        )
      })
    })
  })

  describe('$org', () => {
    describe('en organization organization', () => {
      it('should translate an english', () => {
        const vm = new Vue()
        assert.equal(vm.$org('message.hello'), organizations.en.message.hello)
      })
    })

    describe('ja organization organization', () => {
      it('should translate a japanese', () => {
        const vm = new Vue()
        assert.equal(vm.$org('message.hello', 'ja'), organizations.ja.message.hello)
      })
    })

    describe('key argument', () => {
      describe('not specify', () => {
        it('should return empty string', () => {
          const vm = new Vue()
          assert.equal(vm.$org(), '')
        })
      })

      describe('empty string', () => {
        it('should return empty string', () => {
          const vm = new Vue()
          assert.equal(vm.$org(''), '')
        })
      })

      describe('not regist key', () => {
        it('should return key string', () => {
          const vm = new Vue()
          assert.equal(vm.$org('foo.bar'), 'foo.bar')
        })
      })

      describe('sentence fragment', () => {
        it('should translate fragment', () => {
          const vm = new Vue()
          assert.equal(vm.$org('hello world'), 'Hello World')
        })

        it('should return replaced string if available', () => {
          const vm = new Vue()
          assert.equal(
            vm.$org('Hello {0}', ['kazupon']),
            'Hello kazupon'
          )
        })

        it('should return key if unavailable', () => {
          const vm = new Vue()
          assert.equal(vm.$org('Hello'), 'Hello')
        })
      })
    })

    describe('format arguments', () => {
      describe('named', () => {
        it('should return replaced string', () => {
          const vm = new Vue()
          assert.equal(
            vm.$org('message.format.named', { name: 'kazupon' }),
            'Hello kazupon, how are you?'
          )
        })
      })

      describe('list', () => {
        it('should return replaced string', () => {
          const vm = new Vue()
          assert.equal(
            vm.$org('message.format.list', ['kazupon']),
            'Hello kazupon, how are you?'
          )
        })
      })
    })

    describe('organization argument', () => {
      it('should return empty string', () => {
        const vm = new Vue()
        assert.equal(vm.$org('message.hello', 'ja'), organizations.ja.message.hello)
      })
    })

    describe('format & organization arguments', () => {
      it('should return replaced string', () => {
        const vm = new Vue()
        assert.equal(
          vm.$org('message.format.list', 'ja', ['kazupon']),
          'こんにちは kazupon, ごきげんいかが？'
        )
      })
    })

    describe('fallback', () => {
      it('should return fallback string', () => {
        const vm = new Vue()
        assert.equal(
          vm.$org('message.fallback', 'ja'),
            organizations.en.message.fallback
        )
      })
    })
  })

  describe('reactive translation', () => {
    let el
    beforeEach(() => {
      el = document.createElement('div')
      document.body.appendChild(el)
    })

    it('should translate', done => {
      const options = {
        el,
        data () {
          return { org: 'en' }
        }
      }
      options.render = function (h) {
        return h('p', {}, [this.$org('message.hello', this.org)])
      }

      const vm = new Vue(options)
      Vue.nextTick(() => {
        assert.equal(vm.$el.textContent, organizations.en.message.hello)

        vm.org = 'ja' // set japanese
        Vue.nextTick(() => {
          assert.equal(vm.$el.textContent, organizations.ja.message.hello)
          done()
        })
      })
    })
  })


  describe('translate component', () => {
    let el
    beforeEach(() => {
      el = document.createElement('div')
      document.body.appendChild(el)
    })

    it('should translate', done => {
      const compOptions = {}
      compOptions.render = function (h) {
        return h('p', {}, [this.$org('message.hoge')])
      }

      const options = {
        el,
        components: { hoge: compOptions }
      }

      options.render = function (h) {
        return h('div', {}, [
          h('p', {}, [this.$org('message.hello')]),
          h('hoge', {})
        ])
      }

      const vm = new Vue(options)
      Vue.nextTick(() => {
        const children = vm.$el.querySelectorAll('p')
        assert.equal(children[0].innerText, organizations.en.message.hello)
        assert.equal(children[1].innerText, organizations.en.message.hoge)

        done()
      })
    })
  })


  describe('extend Vue.config', () => {
    describe('org', () => {
      let vm
      beforeEach(done => {
        vm = new Vue()
        vm.$nextTick(done)
      })

      afterEach(done => {
        vm.$destroy()
        vm = null
        Vue.nextTick(done)
      })

      describe('ja', () => {
        it('should translate with japanese', done => {
          Vue.config.org = 'ja'
          Vue.nextTick(() => {
            assert.equal(vm.$org('message.hello'), organizations.ja.message.hello)
            done()
          })
        })

        describe('en', () => {
          it('should translate with english', done => {
            Vue.config.org = 'en'
            Vue.nextTick(() => {
              assert.equal(vm.$org('message.hello'), organizations.en.message.hello)
              done()
            })
          })
        })
      })
    })

    describe('component tree', () => {
      let el
      beforeEach(() => {
        el = document.createElement('div')
        document.body.appendChild(el)
      })

      it('should translate', done => {
        const parentOrganizations = {
          en: { foo: { bar: 'hello parent' } },
          ja: { foo: { bar: 'こんにちは、親' } }
        }
        const child1Organizations = {
          en: { foo: { bar: 'hello child1' } },
          ja: { foo: { bar: 'こんにちは、子1' } }
        }
        const child2Organizations = {
          en: { foo: { bar: 'hello child2' } },
          ja: { foo: { bar: 'こんにちは、子2' } }
        }
        const child3Organizations = {
          en: { foo: { bar: 'hello child3' } },
          ja: { foo: { bar: 'こんにちは、子3' } }
        }

        const vm = new Vue({
          render (h) {
            return h('div', [
              h('p', { attrs: { id: 'parent' } }, [this.$org('foo.bar')]),
              h('child1'),
              h('child2')
            ])
          },
          organizations: parentOrganizations,
          components: {
            child1: {
              render (h) {
                return h('div', [
                  h('p', { attrs: { id: 'child1' } }, [this.$org('foo.bar')]),
                  h('child3')
                ])
              },
              organizations: child1Organizations,
              components: {
                child3: {
                  render (h) {
                    return h('div', [
                      h('p', { attrs: { id: 'child3' } }, [this.$org('foo.bar')])
                    ])
                  },
                  organizations: child3Organizations
                }
              }
            },
            child2: {
              render (h) {
                return h('div', [
                  h('p', { attrs: { id: 'child2' } }, [this.$org('foo.bar')])
                ])
              },
              organizations: child2Organizations
            }
          }
        })
        vm.$mount(el)

        const parent = vm.$el.querySelector('#parent')
        const child1 = vm.$el.querySelector('#child1')
        const child2 = vm.$el.querySelector('#child2')
        const child3 = vm.$el.querySelector('#child3')
        assert.equal(parent.textContent, 'hello parent')
        assert.equal(child1.textContent, 'hello child1')
        assert.equal(child2.textContent, 'hello child2')
        assert.equal(child3.textContent, 'hello child3')
        Vue.config.org = 'ja'
        Vue.nextTick(() => {
          assert.equal(parent.textContent, 'こんにちは、親')
          assert.equal(child1.textContent, 'こんにちは、子1')
          assert.equal(child2.textContent, 'こんにちは、子2')
          assert.equal(child3.textContent, 'こんにちは、子3')
          done()
        })
      })
    })

    describe('fallbackOrg', () => {
      let orgOrg, orgFallbackOrg
      beforeEach(done => {
        orgOrg = Vue.config.org
        orgFallbackOrg = Vue.config.fallbackOrg
        Vue.nextTick(done)
      })

      afterEach(done => {
        Vue.config.fallbackOrg = orgFallbackOrg
        Vue.config.org = orgOrg
        Vue.nextTick(done)
      })

      it('should be changed', done => {
        Vue.config.org = 'ja'
        Vue.nextTick(() => {
          Vue.config.fallbackOrg = 'ja'
          assert.equal(Vue.t('message.fallback1'), organizations.ja.message.fallback1)
          done()
        })
      })
    })
  })
})
