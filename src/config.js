import { getWatcher, getDep } from './observer'
import { bind } from './util'

let fallback // fallback org
let missingHandler = null // missing handler
let i18nFormatter = null // custom formatter

export default function (Vue, orgVM, org) {
  const Watcher = getWatcher(orgVM)
  const Dep = getDep(orgVM)

  function makeComputedGetter (getter, owner) {
    const watcher = new Watcher(owner, getter, null, {
      lazy: true
    })

    return function computedGetter () {
      watcher.dirty && watcher.evaluate()
      Dep && Dep.target && watcher.depend()
      return watcher.value
    }
  }

  // define Vue.config.org configration
  Object.defineProperty(Vue.config, 'org', {
    enumerable: true,
    configurable: true,
    get: makeComputedGetter(() => { return orgVM.org }, orgVM),
    set: bind(val => { orgVM.org = val }, orgVM)
  })

  // define Vue.config.fallbackOrg configration
  fallback = org
  Object.defineProperty(Vue.config, 'fallbackOrg', {
    enumerable: true,
    configurable: true,
    get: () => { return fallback },
    set: val => { fallback = val }
  })

  // define Vue.config.missingHandler configration
  Object.defineProperty(Vue.config, 'missingHandler', {
    enumerable: true,
    configurable: true,
    get: () => { return missingHandler },
    set: val => { missingHandler = val }
  })

  // define Vue.config.i18Formatter configration
  Object.defineProperty(Vue.config, 'i18nFormatter', {
    enumerable: true,
    configurable: true,
    get: () => { return i18nFormatter },
    set: val => { i18nFormatter = val }
  })
}
