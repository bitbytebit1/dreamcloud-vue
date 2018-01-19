<template>
  <v-flex d-flex xs12 >
    <v-layout row wrap>
      <!-- Player -->
      <v-flex xs12>
        <div :id="this.current_trackID" />
      </v-flex>
      <v-flex d-flex xs10 offset-xs1>
        <v-layout row wrap id="dc-padding">
          <!-- Title -->
          <v-flex xs11 class="mt-3">
            <div class="title text-xs-left">{{$store.getters.current_song.title}}</div >
            <v-flex class="mt-3 text-xs-left">
              <span class="subheading" style="white-space: pre-line;" v-html="ytTimeToSeconds(description)"></span>
            </v-flex>
          </v-flex> 

          <!-- Buttons -->
          <v-flex xs1>
            <v-flex xs12>
              <v-speed-dial direction="left" open-on-hover>
                <v-btn slot="activator" class="primary" outline icon  hover fab>
                  <v-icon>fullscreen</v-icon>
                </v-btn>
                <div class="slider-wrapper">
                  <v-btn icon fab>
                    <v-icon small>fullscreen</v-icon>
                  </v-btn>
                  <v-btn icon fab>
                    <v-icon>fullscreen</v-icon>
                  </v-btn>
                  <v-btn icon fab>
                    <v-icon large>fullscreen</v-icon>
                  </v-btn>
                </div>
              </v-speed-dial>
            </v-flex>
            <v-flex xs12>
              <v-speed-dial direction="left" open-on-hover>
                <v-btn slot="activator" class="primary" outline icon  hover fab>
                  <v-icon>settings</v-icon>
                </v-btn>
                <div class="slider-wrapper">
                  <v-btn icon fab>
                    <v-icon>people</v-icon>
                  </v-btn>
                </div>
              </v-speed-dial>
            </v-flex>
            <v-flex xs12>
              <v-speed-dial direction="left" open-on-hover>
                <v-btn slot="activator" class="primary" outline icon :nudge-bottom="25" hover fab>
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <div class="slider-wrapper">
                  <v-btn icon fab>
                    <v-icon>people</v-icon>
                  </v-btn>
                </div>
              </v-speed-dial>
            </v-flex>
          </v-flex>
        
          <!-- Description -->
          <v-flex xs12 class="text-xs-left">
             <!-- {{description}} -->
            
          </v-flex>
       </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
  /* eslint-disable */
export default {
  name: 'youtube-video',
  props: ['song'],

  data () {
    return {
      yt: '',
      interval: '',
      description: ''
    }
  },
  filters: {
    replaceNewline: function (value) {
      value = value.replace(/\n/g, '<br>')
      return value.replace(/\n/g, '<br>')
    }
  },
  computed: {
    showClass () {
      return { 'hidden': this.$store.getters.ytShowVideo }
      // return this.$store.getters.ytShowVideo
    },
    current_trackID () {
      return this.$store.getters.current_trackID
    }
  },
  mounted () {
    this.getDesc()
    this.ytBind()
  },
  updated () {
    this.$store.getters.ytObject.loadVideoById(this.current_trackID)
    this.getDesc()
  },
  methods: {
    ytTimeToSeconds (value) {
      if (!value) {
        return ''
      }
      return (value.replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g, 
      `<span onClick="window.dcYT.seekTo('$&'.split(':').reduce((acc,time) => (60 * acc) + +time));" class="underline"
      >$&</span>`))
    },
    // 
    fullscreenClick () {
      var e = document.getElementById(this.current_trackID)
      if (e.requestFullscreen) {
        e.requestFullscreen()
      } else if (e.webkitRequestFullscreen) {
        e.webkitRequestFullscreen()
      } else if (e.mozRequestFullScreen) {
        e.mozRequestFullScreen()
      } else if (e.msRequestFullscreen) {
        e.msRequestFullscreen()
      }
    },
    getDesc () {
      this.$DCAPI.getSongDescription(this.current_trackID, this.song.source, (resp) => {
        this.description = resp.items[0].snippet.description.trim()
      })
    },
    ytBind () {
      if (!this.$store.getters.ytVideo) {
        return
      }
      this.$DCPlayer.eAudio.pause()
      this.yt = new YT.Player(this.current_trackID, {
        width: '100%',
        height: window.innerHeight * 0.6 + 'px',
        videoId: this.current_trackID,
        enablejsapi: 1,
        playerVars: {
          autoplay: 1,        // Auto-play the video on load
          controls: 0,        // Show pause/play buttons in player
          color: 'teal',
          showinfo: 0,        // Hide the video title
          modestbranding: 1,  // Hide the Youtube Logo
          fs: 0,              // Hide the full screen button
          cc_load_policy: 1,  // Hide closed captions
          iv_load_policy: 3,  // Hide the Video Annotations
          rel: 0,             // Remove Related Videos
          autohide: 1         // Hide video controls when playing
        },
        events: {
          'onReady': this.ytReady,
          'onStateChange': this.ytChanged,
          'onApiChange': this.ytOnApiChange
        }
      })
    },
    ytOnApiChange () {
      // console.log(this.yt.getOptions())
      // console.log(this.yt.getOptions('captions'))
    },
    ytReady (state) {
      this.$store.commit('ytObject', this.yt)
      this.$store.getters.ytObject.playVideo()
      window.dcYT = this.yt
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

#dc-padding{
  padding: 0 16px;
}
.slider-wrapper{
  /* display: inherit; */
  /* width: '100%'; */
  /* height: 70px; */
  /* padding: 0; */
}
</style>
