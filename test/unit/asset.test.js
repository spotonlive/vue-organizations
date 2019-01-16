describe('asset', () => {
  let organization

  beforeEach(() => {
    Vue.organization('en', null) // reset
  })

  describe('register sync', () => {
    it('should be registered', () => {
      const organization = {
        message: {
          foo: 'foo'
        }
      }
      Vue.organization('en', organization)
      assert.equal(Vue.organization('en'), organization)
    })
  })


  describe('regsiter async', () => {
    describe('promise like function', () => {
      describe('resolve', () => {
        it('should be registered', done => {
          organization = { message: { bar: 'bar' } }
          Vue.organization('en', () => {
            return (resolve, reject) => {
              setTimeout(() => {
                resolve(organization)
              }, 0)
            }
          }, () => {
            assert.equal(Vue.organization('en'), organization)
            done()
          })
        })
      })

      describe('reject', () => {
        it('should not be registered', done => {
          Vue.organization('en', () => {
            return (resolve, reject) => {
              setTimeout(() => {
                reject()
              }, 0)
            }
          }, () => {
            assert.ok(!Vue.organization('en'))
            done()
          })
        })
      })
    })

    describe('promise ', () => {
      describe('resolve', () => {
        it('should be registered', done => {
          organization = { mesasge: { buz: 'buz' } }
          Vue.organization('en', () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(organization)
              }, 0)
            })
          }, () => {
            assert.equal(Vue.organization('en'), organization)
            done()
          })
        })
      })

      describe('reject', () => {
        it('should not be registered', done => {
          Vue.organization('en', () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                reject()
              }, 0)
            })
          }, () => {
            assert.ok(!Vue.organization('en'))
            done()
          })
        })
      })
    })
  })
})
