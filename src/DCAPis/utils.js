export default {
  install (Vue, options) {
    var Utils = {
      isMobile: window.matchMedia('only screen and (max-width: 599px)').matches,
      isOnline: () => (window.navigator.onLine),
      copyToClipboard (sText) {
        var tmp = document.createElement('input')
        document.body.appendChild(tmp)
        tmp.value = sText
        tmp.select()
        document.execCommand('copy')
        tmp.remove()
      },
      closeSoftMobi () {
        if (this.isMobile) {
          document.activeElement.blur()
        }
      },
      downloadLink (sURL) {
        var iframe = document.createElement('iframe')

        iframe.style.display = 'none'
        iframe.id = iframe.name = sURL
        iframe.src = sURL

        document.body.appendChild(iframe)
      },
      share (url, song) {
        if (Utils.isMobile) {
          Utils.downloadLink('whatsapp://send?text=' + encodeURIComponent(url))
          if (navigator.share1) {
            navigator.share({
              title: song.title,
              text: song.description,
              url: url
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error))
          } else {
          }
          // this.$parent.setIframeSrc('') // double check if this works.
        } else {
          Utils.copyToClipboard(url)
        }
      },
      formatBytes (a, b) {
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
