<template>
    <v-btn icon :disabled="!$store.getters.isYT" @click.stop="clicked">
      <v-icon :color="color">videocam</v-icon>
    </v-btn>
</template>
<script>
export default {
  computed: {
    showColor: () => 'red',
    color () {
      let c = (this.$store.getters.ytUseVideo) ? 'red' : ''
      // return { color: c }
      return c
    }
  },
  methods: {
    clicked () {
      // debugger
      this.$store.commit('ytSwitchTime', true)
      this.$store.commit('ytToggleVideo')
      let dur = this.$store.getters.ytUseVideo ? this.$DCPlayer.eAudio.currentTime : this.$store.getters.ytCurrentTime
      let isPlay = this.$store.getters.ytIsPlaying || !this.$DCPlayer.eAudio.paused
      if (this.$store.getters.ytUseVideo) {
        isPlay && this.$DCPlayer.stop()
        this.$store.getters.ytObject.loadVideoById(this.$store.getters.current_song.trackID, dur)
        setTimeout(() => {
          this.$store.getters.ytObject.seekTo(dur)
        }, 250)
        setTimeout(() => {
          if (!isPlay) {
            this.$store.commit('ytStopVideo')
          }
          this.$store.commit('ytSwitchTime', false)
        }, 1500)
      } else {
        isPlay && this.commit('ytStopVideo')
        this.$DCPlayer.playIndex(this.$DCPlayer.iCurrent).then((dat) => {
          console.log('dc setting current time', dur)
          this.$DCPlayer.eAudio.currentTime = dur
          if (!isPlay) {
            // console.log('dc pausing')
            this.$DCPlayer.pause()
          }
          setTimeout(() => {
            this.$store.commit('ytSwitchTime', false)
          }, 1500)
        })
      }
    }
  }
}
</script>
