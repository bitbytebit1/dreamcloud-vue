export default {
  install (Vue, options) {
    var Utils = {
      isMobile: window.matchMedia('only screen and (max-width: 760px)').matches,
      copyToClipboard: function (sText) {
        var tmp = document.createElement('input')
        document.body.appendChild(tmp)
        tmp.value = sText
        tmp.select()
        document.execCommand('copy')
        tmp.remove()
      },
      closeSoftMobi: function () {
        if (this.isMobile) {
          document.activeElement.blur()
        }
      },
      downloadLink: function (sURL) {
        var iframe = document.createElement('iframe')

        iframe.style.display = 'none'
        iframe.id = iframe.name = sURL
        iframe.src = sURL

        document.body.appendChild(iframe)
      },
      formatBytes: function (a, b) {
        if (a === 0) {
          return '0 Bytes'
        }
        var c = 1024
        var d = b || 2
        var e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        var f = Math.floor(Math.log(a) / Math.log(c))
        return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f]
      }

    }
    Object.defineProperty(Vue.prototype, '$UTILS', {
      value: Utils
    })
  }
}
