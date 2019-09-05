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
      if (this.trackID != this.$store.getters.current_trackID) {
        this.$DCAPI.getSongInfo(this.trackID, this.source, (song) => {
          // GET RELATED
          this.$DCAPI.searchInt('', 0, [this.source], this.trackID, (related) => {
            if (related.length) {
              if (related[0].trackID === this.trackID) {
                related.shift()
              }
              song = [...song, ...related]
            }
            // Fix for mobile on first play 
            // this.$DCPlayer.setNPlay(song, 0)
            // this.$store.commit('setNPlay', {songs: song, current: 0, path: this.$route.path})
            this.$DCPlayer.setNPlay({songs: song, current: 0, path: this.$route.path})

            this.$nextTick(() => {
              this.$store.commit('bShowStage', true)
              // if (this.$store.state.player.current_index === -1 && this.$UTILS.isMobile) 
              this.$DCPlayer.ePlayer().play()
            })
          }, true, 50)
        }, '')
      } else {
        this.$store.commit('bShowStage', true)
      }
    },
  },
  updated () {
    this.in()
  },

  // beforeRouteUpdated () {
  //   this.$store.commit('bShowStage', false)
  //   if (this.$store.getters.showPopupSetting && this.$store.state.player.current_index > -1) {
  //     this.$store.commit('show_pop', true)
  //   }

  // },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('bShowStage', false)
    if (this.$store.getters.showPopupSetting && this.$store.getters.current_index > -1) {
      this.$store.commit('show_pop', true)
    }   
    next()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('bShowStage', true)
      vm.$store.commit('show_pop', false)
    })
  },
  // deactivated () {
  //   this.$store.commit('bShowStage', false)
  //   if (this.$store.getters.showPopupSetting && this.$store.state.player.current_index > -1) {
  //     this.$store.commit('show_pop', true)
  //   }

  // },
  // activated () {
  //   this.$store.commit('bShowStage', true)
  //   this.$store.commit('show_pop', false)
  // },
  created () {
    this.in()
  },

}
</script>
