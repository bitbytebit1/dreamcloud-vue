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
      return this.$store.getters.ytUseVideo && this.$store.getters.isYT ? 'primary' : ''
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
          let i = this.$store.getters.current_index
          this.$store.commit('changeIndex', -2)
          setTimeout(() => {
            this.$store.commit('changeIndex', i)
          }, 250)
          setTimeout(() => {
            // sync volume
            this.$store.getters.ytObject.setVolume(this.$DCPlayer.eAudio.volume * 100)
            if (!isPlay) {
              this.$store.commit('ytPause')
            }
            this.$store.getters.ytObject.seekTo(dur)
          }, 2500)
        } else {
          this.$store.getters.ytObject.loadVideoById(this.$store.getters.current_song.trackID, dur)
          setTimeout(() => {
            if (!isPlay) {
              this.$store.commit('ytPause')
            }
            // sync volume
            this.$store.getters.ytObject.setVolume(this.$DCPlayer.eAudio.volume * 100)             
          }, 1500)
        }

      } else {
        this.$DCPlayer.eAudio.volume = this.$store.getters.ytObject.getVolume() / 100
        this.$store.commit('ytPause')

        this.$DCPlayer.playIndex(this.$store.getters.current_index).then(() => {
          this.$DCPlayer.eAudio.currentTime = dur
          if (!isPlay) {
            this.$DCPlayer.pause()
          }
        })
      }
    }
  }
}
</script>
