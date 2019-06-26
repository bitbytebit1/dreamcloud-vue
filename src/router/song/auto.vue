<template>
  <div :id="String(trackID)"/>
</template>

<script>

export default {
  name: 'Auto',
  props: {
    artistID: {
      type: [String, Number],
      default: ''
    },
    trackID: {
      type: [String, Number],
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    artist: {
      type: String,
      default: ''
    }
  },
  methods: {
    in (){
      if (this.trackID != this.$store.getters.current_trackID && this.trackID !== 'z') {
        this.$DCAPI.getSongInfo(this.trackID, this.source, (d) => {
          // Fix for mobile on first play 
          this.$DCPlayer.setNPlay(d, 0)
          this.$store.commit('setNPlay', {songs: d, current: 0, path: this.$route.path})
          this.$nextTick(() => {
            this.$store.commit('bShowStage', true)
            // if (this.$store.getters.index === -1 && this.$UTILS.isMobile) 
            this.$DCPlayer.eAudio.play()
          })
          // this.$DCFB.historyPush(d[0])
          // TODO Add related to playlist if only song/blank current_Playlist?
        }, '')
      } else {
        this.$store.commit('bShowStage', true)
      }
    },
  },
  updated () {
    this.in()
  },
  deactivated () {
    this.$store.commit('bShowStage', false)
    this.$store.commit('show_pop', true)

  },
  activated () {
    this.$store.commit('bShowStage', true)
    this.$store.commit('show_pop', false)
  },
  created () {
    this.in()
    console.log(this.$vuetify.theme.primary)
  },

}
</script>
