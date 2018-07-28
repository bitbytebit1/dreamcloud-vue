<template>
  <div id="hks">
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'hks',
  created () {
    window.onkeydown = (e) => {
      e = e || window.event
      // console.log(e)
      if (document.activeElement.tagName === 'INPUT') {
        return
      }
      if (e.keyCode == '70') { // F
        this.$UTILS.toggleFullscreen(this.$store.getters.ytUseVideo && this.$store.getters.isYT ? 'player' : 'pstr')
      } else if (e.keyCode == '67') { // C
          this.bWide = !(this.$store.getters.drawLeft || this.$store.getters.drawRight)
          this.$store.commit('drawRight', this.bWide)
          this.$store.commit('drawLeft', this.bWide)
          e.preventDefault()
      } else if (e.keyCode == '77') { // M
          this.$DCPlayer.toggleMute()
          e.preventDefault()
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
