import warn from './warn'
import Asset from './asset'
import Override from './override'
import Config from './config'
import Extend from './extend'

let orgVM // singleton


/**
 * plugin
 *
 * @param {Object} Vue
 * @param {Object} opts
 */

function plugin (Vue, opts = {}) {
  const version = (Vue.version && Number(Vue.version.split('.')[0])) || -1

  if (process.env.NODE_ENV !== 'production' && plugin.installed) {
    warn('already installed.')
    return
  }

  if (process.env.NODE_ENV !== 'production' && version < 2) {
    warn(`vue-organizations (${plugin.version}) need to use Vue 2.0 or later (Vue: ${Vue.version}).`)
    return
  }

  const org = 'en'
  setupOrgVM(Vue, org)

  Asset(Vue, orgVM)
  Override(Vue, orgVM)
  Config(Vue, orgVM, org)
  Extend(Vue)
}

function setupOrgVM (Vue, org) {
  const silent = Vue.config.silent
  Vue.config.silent = true
  if (!orgVM) {
    orgVM = new Vue({ data: { org, organizations: {} } })
  }
  Vue.config.silent = silent
}

plugin.version = '__VERSION__'

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
