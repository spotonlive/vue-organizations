export default function (Vue, orgVM) {
  // override _init
  const init = Vue.prototype._init
  Vue.prototype._init = function (options) {
    init.call(this, options)

    if (!this.$parent) { // root
      this._$org = orgVM
      this._orgUnwatch = this._$org.$watch('$data', (val, old) => {
        this.$forceUpdate()
      }, { deep: true })
    }
  }

  // override _destroy
  const destroy = Vue.prototype._destroy
  Vue.prototype._destroy = function () {
    if (!this.$parent && this._orgUnwatch) {
      this._orgUnwatch()
      this._orgUnwatch = null
      this._$org = null
    }

    destroy.apply(this, arguments)
  }
}
