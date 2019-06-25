<template>
  <v-tooltip 
    top
  >
    <v-btn 
      v-show="$store.getters.isYT" 
      slot="activator"
      :disabled="!$store.getters.isYT" 
      icon 
      small 
      @click.stop="clicked"
    >
      <v-icon :color="color">ondemand_video</v-icon>
    </v-btn>
    <span>{{ toolTip }} video</span>
  </v-tooltip>
</template>
<script>
export default {
  computed: {
    toolTip() { 
      return this.$store.getters.ytUseVideo && this.$store.getters.isYT ? 'Disable' : 'Enable' 
    },
    color () {
      return this.$store.getters.ytUseVideo && this.$store.getters.isYT ? 'red' : ''
    }
  },
  methods: {
    clicked () {
      // debugger
      this.$store.commit('ytToggleVideo')
      let dur = this.$store.getters.ytUseVideo ? this.$DCPlayer.eAudio.currentTime : this.$store.getters.ytCurrentTime
      let isPlay = this.$store.getters.ytIsPlaying || !this.$DCPlayer.eAudio.paused
      if (this.$store.getters.ytUseVideo) {
        isPlay && this.$DCPlayer.stop()
        if (!this.$store.getters.ytObject.hasOwnProperty('loadVideoById')) {
          // this.$store.commit('changeIndex', -2)
          // setTimeout(() => {
          this.$store.commit('changeIndex', this.$DCPlayer.iCurrent)
          // }, 150)
        } else {
          this.$store.getters.ytObject.loadVideoById(this.$store.getters.current_song.trackID, dur)
        }

        setTimeout(() => {
          this.$store.getters.ytObject.seekTo(dur)
        }, 250)
        setTimeout(() => {
          if (!isPlay) {
            this.$store.commit('ytStopVideo')
          }
        }, 1500)
      } else {
        this.$store.commit('ytStopVideo')
        this.$DCPlayer.playIndex(this.$DCPlayer.iCurrent).then(() => {
          // console.log('dc setting current time', dur)
          this.$DCPlayer.eAudio.currentTime = dur
          if (!isPlay) {
            // console.log('dc pausing')
            this.$DCPlayer.pause()
          }
        })
      }
    }
  }
}
</script>
