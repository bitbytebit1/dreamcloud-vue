<template>
	<div :id="trackID"></div>  
</template>

<script>
// /* eslint-disable */

// import { mapGetters } from 'vuex'
export default {
  name: 'stage-route',
  // props: ['source', 'artist', 'trackID'],
  props: ['trackID'],
  // ...mapGetters({
  // computed: {
  // song: 'current_song',
  // })
  // },
  created () {
    // if (!this.song || this.song.trackID !== this.trackID) {
    // alert('i c')
    // this.$DCAPI.getSongInfo (this.trackID, this.source, (resp) => {
    // this.$store.commit('setNPlay', { songs: resp, path: this.$route.path, current: 0})
    // this.$DCPlayer.setNPlay(resp, 0)
    // })
    // } else {
    // }
    this.$store.commit('bShowStage', true)
    this.$nextTick(function () {
      // this.$store.commit('bShowStage', true)
      // Code that will run only after the
      // entire view has been rendered
    })
  },
  updated () {
    // if (!this.song || this.song.trackID !== this.trackID) {
    //   // alert('i c')
    //   console.log('getting info')
    //   this.$DCAPI.getSongInfo (this.trackID, this.source, (resp) => {
    //     console.log('playing')
    //     this.$store.commit('setNPlay', { songs: resp, path: this.$route.path, current: 0})
    //     this.$DCPlayer.setNPlay(resp, 0)
    //   })
    // } else {
    // }
    this.$store.commit('bShowStage', true)
  },
  destroyed () {
    this.$store.commit('bShowStage', false)
  }
}
</script>

<style>
</style>
