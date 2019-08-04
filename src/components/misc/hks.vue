<template>
  <div id="hks"/>
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
      if (e.keyCode == '67' && !e.ctrlKey) { // C FOR CURRENT
        this.$store.commit('toggleStage')
      } else if (e.keyCode == '70' && !e.ctrlKey) { // F FOR FULL SCREEN
        this.$UTILS.toggleFullscreen(this.$store.getters.ytUseVideo && this.$store.getters.isYT ? 'player' : 'pstr')
      } else if (e.keyCode == '87') { // W FOR WIDE
          this.bWide = !(this.$store.state.user.drawLeft || this.$store.state.user.drawRight)
          this.$store.commit('drawRight', this.bWide)
          this.$store.commit('drawLeft', this.bWide)
          e.preventDefault()
      } else if (e.keyCode == '77') { // M FOR MUTE
          this.$DCPlayer.toggleMute()
          e.preventDefault()
      } else if (e.keyCode == '32') { // SPACE FOR PLAY (P?)
          this.$DCPlayer.togglePlay()
          e.preventDefault()
      } else if (e.keyCode == '37' && !e.shiftKey ) { // LEFT FOR PREVIOUS OR SEEK
          if (e.altKey) {
            this.$DCPlayer.previous()
            this.$DCFB.historyPush(this.$store.getters.current_song)
          } else {
            this.$DCPlayer.seekBackward()
          }
          e.preventDefault()
      } else if (e.keyCode == '38') { // UP FOR VOL UP
          this.$DCPlayer.volUp()
          e.preventDefault()
      } else if (e.keyCode == '39' && !e.shiftKey) { // RIGHT FOR NEXT OR SEEK
          if (e.altKey){
            this.$DCPlayer.next()
            this.$DCFB.historyPush(this.$store.getters.current_song)
          } else {
            this.$DCPlayer.seekForward()
          }
          e.preventDefault()
      } else if (e.keyCode == '40') { // DOWN FOR VOL DOWN
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
