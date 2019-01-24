describe('asset', () => {
  let organization

  beforeEach(() => {
    Vue.organization('freemium', null) // reset
  })

  describe('register sync', () => {
    it('should be registered', () => {
      const organization = {
        message: {
          foo: 'foo'
        }
      }
      Vue.organization('freemium', organization)
      assert.equal(Vue.organization('freemium'), organization)
    })
  })


  describe('regsiter async', () => {
    describe('promise like function', () => {
      describe('resolve', () => {
        it('should be registered', done => {
          organization = { message: { bar: 'bar' } }
          Vue.organization('freemium', () => {
            return (resolve, reject) => {
              setTimeout(() => {
                resolve(organization)
              }, 0)
            }
          }, () => {
            assert.equal(Vue.organization('freemium'), organization)
            done()
          })
        })
      })

      describe('reject', () => {
        it('should not be registered', done => {
          Vue.organization('freemium', () => {
            return (resolve, reject) => {
              setTimeout(() => {
                reject()
              }, 0)
            }
          }, () => {
            assert.ok(!Vue.organization('freemium'))
            done()
          })
        })
      })
    })

    describe('promise ', () => {
      describe('resolve', () => {
        it('should be registered', done => {
          organization = { mesasge: { buz: 'buz' } }
          Vue.organization('freemium', () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(organization)
              }, 0)
            })
          }, () => {
            assert.equal(Vue.organization('freemium'), organization)
            done()
          })
        })
      })

      describe('reject', () => {
        it('should not be registered', done => {
          Vue.organization('freemium', () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                reject()
              }, 0)
            })
          }, () => {
            assert.ok(!Vue.organization('freemium'))
            done()
          })
        })
      })
    })
  })
})
