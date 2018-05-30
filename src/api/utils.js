export default {
  install (Vue, options) {
    var Utils = {
      isMobile: window.matchMedia('only screen and (max-width: 599px)').matches,
      isOnline: () => (window.navigator.onLine),
      setLoc: (a, b) => localStorage.setItem(a, b),
      getLoc: (a) => localStorage.getItem(a),
      copyToClipboard (sText) {
        var tmp = document.createElement('input')
        document.body.appendChild(tmp)
        tmp.value = sText
        tmp.select()
        document.execCommand('copy')
        tmp.remove()
      },
      uniqueArray (array) {
        var a = array.concat()
        for (var i = 0; i < a.length; i++) {
          for (var j = i + 1; j < a.length; j++) {
            if (a[i].mp32 === a[j].mp32) {
              a.splice(j--, 1)
            }
          }
        }
        return a
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
          if (navigator.share) {
            navigator.share({
              title: song.title,
              text: song.mp32,
              url: url
            })
              .catch((error) => { return ('Error sharing', error) })
          } else {
            Utils.downloadLink('whatsapp://send?text=' + encodeURIComponent(url))
          }
          // this.$parent.setIframeSrc('') // double check if this works.
        } else {
          Utils.copyToClipboard(encodeURI(url))
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
