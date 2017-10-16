const UtilsPlug = {
  install (Vue, options) {
    var Utils = {
      isMobile: window.matchMedia('only screen and (max-width: 760px)').matches,
      copyToClipboard: function wasd (sText) {
        var tmp = document.createElement('input')
        document.body.appendChild(tmp)
        tmp.value = sText
        tmp.select()
        document.execCommand('copy')
        tmp.remove()
      }
    }
    Object.defineProperty(Vue.prototype, '$UTILS', { value: Utils })
  }
}
export default UtilsPlug
