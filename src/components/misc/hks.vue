<template>
  <div id="hks">
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'hks',
  data () {
    return {
      x1: 'deleteme?'
    }
  },
  methods: {
    x2 () {

    }
  },
  computed: {
    x3 () {
      
    }
  },
  created () {
    window.onkeydown = (e) => {
      e = e || window.event
      // console.log(e.keyCode)
      if (document.activeElement.tagName === 'INPUT') {
        return
      }
      if (e.keyCode == '70') { // F
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
            e = document.getElementById(this.$store.getters.ytUseVideo && this.$store.getters.isYT ? 'player' : 'stg-pstr')
            if (e.requestFullscreen) {
              e.requestFullscreen()
            } else if (e.msRequestFullscreen) {
              e.msRequestFullscreen()
            } else if (e.mozRequestFullScreen) {
              e.mozRequestFullScreen()
            } else if (e.webkitRequestFullscreen) {
              e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
      } else if (e.keyCode == '32') { // space
          this.$DCPlayer.togglePlay()
          e.preventDefault()
      } else if (e.keyCode == '37') { // left
          if (e.altKey) {
            this.$DCPlayer.previous()
            this.$DCFB.historyPush(this.$store.getters.current_song)
          } else {
            this.$DCPlayer.seekBackward()
          }
          e.preventDefault()
      } else if (e.keyCode == '38') { // up
          this.$DCPlayer.volUp()
          e.preventDefault()
      } else if (e.keyCode == '39') { // right
          if (e.altKey){
            this.$DCPlayer.next()
            this.$DCFB.historyPush(this.$store.getters.current_song)
          } else {
            this.$DCPlayer.seekForward()
          }
          e.preventDefault()
      } else if (e.keyCode == '40') { // down
          this.$DCPlayer.volDown()
          e.preventDefault()
      }
    }
  }
}
</script>

<style>
#hks{
  display: none;
}
</style>
