import warn from './warn'

export default function (Vue, orgVM) {
  /**
   * Register or retrieve a global organization definition.
   *
   * @param {String} id
   * @param {Object | Function | Promise} definition
   * @param {Function} cb
   */

  Vue.organization = (id, definition, cb) => {
    if (definition === undefined) { // getter
      return orgVM.organizations[id]
    } else { // setter
      if (definition === null) {
        orgVM.organizations[id] = undefined
        delete orgVM.organizations[id]
      } else {
        setOrganization(id, definition, organization => {
          if (organization) {
            orgVM.$set(orgVM.organizations, id, organization)
          } else {
            warn('failed set `' + id + '` organization')
          }
          cb && cb()
        })
      }
    }
  }
}


function setOrganization (id, definition, cb) {
  if (typeof definition === 'object') { // sync
    cb(definition)
  } else {
    const future = definition.call(this)
    if (typeof future === 'function') {
      if (future.resolved) {
        // cached
        cb(future.resolved)
      } else if (future.requested) {
        // pool callbacks
        future.pendingCallbacks.push(cb)
      } else {
        future.requested = true
        const cbs = future.pendingCallbacks = [cb]
        future(organization => { // resolve
          future.resolved = organization
          for (let i = 0, l = cbs.length; i < l; i++) {
            cbs[i](organization)
          }
        }, () => { // reject
          cb()
        })
      }
    } else if (isPromise(future)) { // promise
      future.then(organization => { // resolve
        cb(organization)
      }, () => { // reject
        cb()
      }).catch(err => {
        console.error(err)
        cb()
      })
    }
  }
}

/**
 * Forgiving check for a promise
 *
 * @param {Object} p
 * @return {Boolean}
 */

function isPromise (p) {
  return p && typeof p.then === 'function'
}
