<template>
  <v-flex xs12 lg-offset-2 lg9 flexbox class="ma-0 pa-0" >
  <!-- <div> -->
    <div :id="trackID" />
    <!-- <iframe :id="trackID" width="auto" height="auto" :src="trackID" allowFullScreen frameborder="0"/> -->
  <!-- </div> -->
  </v-flex>
</template>
<script>
// let YT = ''
/* eslint-disable */
export default {
  name: 'youtube-video',
  props: ['trackID'],

  data () {
    return {
      yt: '',
      interval: ''
    }
  },
  computed: {
    x3 () {
    },
    current_trackID () {
      return this.$store.getters.current_trackID
    }
  },
  mounted () {
    this.ytBind()
  },
  updated () {
    // alert(1)
    // this.ytBind()
    this.yt.loadVideoById(this.trackID)
  },
  methods: {
    ytBind () {
      this.$DCPlayer.eAudio.pause()
      if (!this.$store.getters.ytVideo) {
        return
      }
      this.yt = new YT.Player(this.current_trackID, {
        width: '100%',
        // width: '300',
        // height: '212',
        videoId: this.trackID,
        playerVars: { 'autoplay': 1, 'controls': 0 },
        events: {
          'onReady': this.ytReady,
          'onStateChange': this.ytChanged
        }
      })
    },
    ytReady (state) {
      this.$store.commit('ytObject', this.yt)
      this.$store.getters.ytObject.playVideo()
    },
    ytChanged (state) {
      this.$store.commit('ytState', state)
      
      // console.log(this.$store.getters.ytObject.target.PlayerState)
      // if playing set duration amd interval to set current time.
      if (state.data === 1) {
        this.$store.commit('ytDuration', this.$store.getters.ytObject.getDuration())
        this.interval = setInterval(() => { this.$store.commit('ytCurrentTime', this.$store.getters.ytObject.getCurrentTime()) }, 250)
      } else if (state.data === 2) {
        clearInterval(this.interval)
      } else if (state.data === 0) {
        console.log('ended!')
        clearInterval(this.interval)
        this.$DCPlayer.next()
      }
    }
  },
  destroyed () {
    clearInterval(this.interval)
  }
}
</script>

<style>
</style>
