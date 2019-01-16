import warn from './warn'
import Format from './format'
import Path from './path'
import { isNil, isObject, bind } from './util'

/**
 * extend
 *
 * @param {Vue} Vue
 * @return {Vue}
 */

export default function (Vue) {
  const format = Format(Vue)
  const getValue = Path(Vue)

  function parseArgs (...args) {
    let org = Vue.config.org
    const fallback = Vue.config.fallbackOrg

    if (args.length === 1) {
      if (isObject(args[0]) || Array.isArray(args[0])) {
        args = args[0]
      } else if (typeof args[0] === 'string') {
        org = args[0]
      }
    } else if (args.length === 2) {
      if (typeof args[0] === 'string') {
        org = args[0]
      }
      if (isObject(args[1]) || Array.isArray(args[1])) {
        args = args[1]
      }
    }

    return { org, fallback, params: args }
  }

  function exist (organization, key) {
    if (!organization || !key) { return false }
    return !isNil(getValue(organization, key))
  }

  function interpolate (organization, key, args) {
    if (!organization) { return null }

    let val = getValue(organization, key)
    if (Array.isArray(val)) { return val }
    if (isNil(val)) { val = organization[key] }
    if (isNil(val)) { return null }
    if (typeof val !== 'string') { warn("Value of key '" + key + "' is not a string!"); return null }

    // Check for the existance of links within the translated string
    if (val.indexOf('@:') >= 0) {
      // Match all the links within the local
      // We are going to replace each of
      // them with its translation
      const matches = val.match(/(@:[\w|.]+)/g)
      for (const idx in matches) {
        const link = matches[idx]
        // Remove the leading @:
        const linkPlaceholder = link.substr(2)
        // Translate the link
        const translatedstring = interpolate(organization, linkPlaceholder, args)
        // Replace the link with the translated string
        val = val.replace(link, translatedstring)
      }
    }

    return !args
      ? val
      : Vue.config.i18nFormatter
        ? Vue.config.i18nFormatter.apply(null, [val].concat(args))
        : format(val, args)
  }

  function translate (getter, org, fallback, key, params) {
    let res = null
    res = interpolate(getter(org), key, params)
    if (!isNil(res)) { return res }

    res = interpolate(getter(fallback), key, params)
    if (!isNil(res)) {
      if (process.env.NODE_ENV !== 'production') {
        warn('Fall back to translate the keypath "' + key + '" with "' +
          fallback + '" organization.')
      }
      return res
    } else {
      return null
    }
  }


  function warnDefault (org, key, vm, result) {
    if (!isNil(result)) { return result }
    if (Vue.config.missingHandler) {
      Vue.config.missingHandler.apply(null, [org, key, vm])
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn('Cannot translate the value of keypath "' + key + '". ' +
          'Use the value of keypath as default')
      }
    }
    return key
  }

  function getAssetOrganization (org) {
    return Vue.organization(org)
  }

  function getComponentOrganization (org) {
    return this.$options.organizations[org]
  }

  function getOldChoiceIndexFixed (choice) {
    return choice ? choice > 1 ? 1 : 0 : 1
  }

  function getChoiceIndex (choice, choicesLength) {
    choice = Math.abs(choice)

    if (choicesLength === 2) { return getOldChoiceIndexFixed(choice) }

    return choice ? Math.min(choice, 2) : 0
  }

  function fetchChoice (organization, choice) {
    if (!organization && typeof organization !== 'string') { return null }
    const choices = organization.split('|')

    choice = getChoiceIndex(choice, choices.length)
    if (!choices[choice]) { return organization }
    return choices[choice].trim()
  }

  /**
   * Vue.org
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.org = (key, ...args) => {
    if (!key) { return '' }
    const { org, fallback, params } = parseArgs(...args)
    return warnDefault(org, key, null, translate(getAssetOrganization, org, fallback, key, params))
  }

  /**
   * $org
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.prototype.$org = function (key, ...args) {
    if (!key) { return '' }
    const { org, fallback, params } = parseArgs(...args)
    let res = null
    if (this.$options.organizations) {
      res = translate(
        bind(getComponentOrganization, this), org, fallback, key, params
      )
      if (res) { return res }
    }
    return warnDefault(org, key, this, translate(getAssetOrganization, org, fallback, key, params))
  }

  Vue.mixin({
    computed: {
      $organization () {
        return Vue.config.org
      }
    }
  })

  return Vue
}
