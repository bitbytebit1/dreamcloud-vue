export default {
  install (Vue) {
    var Utils = {
      isMobile: window.matchMedia('only screen and (max-width: 599px)').matches,
      isOnline: () => (window.navigator.onLine),
      setLoc: (a, b) => localStorage.setItem(a, b),
      getLoc: a => localStorage.getItem(a),
      copyToClipboard (sText) {
        let tmp = document.createElement('input')
        document.body.appendChild(tmp)
        tmp.value = sText
        tmp.select()
        document.execCommand('copy')
        tmp.remove()
      },
      uniqueArray: function (array) {
        let ret = []
        let dupe = false
        for (let i = 0; i < array.length - 1; i++) {
          dupe = false
          for (let n = 0; n < ret.length - 1; n++) {
            if (ret[n].trackID === array[i].trackID) {
              dupe = true
              break
            }
          }
          if (!dupe) {
            ret.push(array[i])
          }
        }
        return ret
      },
      closeSoftMobi () {
        if (this.isMobile) {
          document.activeElement.blur()
        }
      },
      downloadLink (sURL) {
        let iframe = document.createElement('iframe')

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
              url
            })
          } else {
            Utils.downloadLink(`whatsapp://send?text=${encodeURIComponent(url)}`)
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
        let c = 1024
        let d = b || 2
        let e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        let f = Math.floor(Math.log(a) / Math.log(c))
        return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`
      },
      isFullscreen () {
        return !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement
      },
      toggleFullscreen (element) {
        var mouseEvent = () => {
          var timeoutSet = false
          document.querySelector('body').style.cursor = 'auto'
          if (!timeoutSet) {
            setTimeout(() => {
              timeoutSet = true
              // console.log()
              document.querySelector('body').style.cursor = 'none'
            }, 500)
          }
        }
        if (Utils.isFullscreen()) { // current working methods
          let e = document.getElementById(element)
          if (e.requestFullscreen) {
            e.requestFullscreen()
          } else if (e.msRequestFullscreen) {
            e.msRequestFullscreen()
          } else if (e.mozRequestFullScreen) {
            e.mozRequestFullScreen()
          } else if (e.webkitRequestFullscreen) {
            e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          }
          let exitHandler = () => {
            if (Utils.isFullscreen()) {
              document.querySelector('#app').removeEventListener('mousemove', mouseEvent)
              document.querySelector('#app').style.cursor = 'auto'
            }
          }
          document.querySelector('#app').style.cursor = 'none'
          document.querySelector('#app').addEventListener('mousemove', mouseEvent)
          document.addEventListener('fullscreenchange', exitHandler)
          document.addEventListener('webkitfullscreenchange', exitHandler)
          document.addEventListener('mozfullscreenchange', exitHandler)
          document.addEventListener('MSFullscreenChange', exitHandler)
        } else {
          document.querySelector('#app').removeEventListener('mousemove', mouseEvent)
          document.querySelector('#app').style.cursor = 'auto'
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
          }
        }
      }
    }
    Object.defineProperty(Vue.prototype, '$UTILS', {
      value: Utils
    })
  }
}
