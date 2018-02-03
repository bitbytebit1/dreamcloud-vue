<template>
  <v-layout row wrap v-show="$store.getters.ytUseVideo && $store.getters.isYT" class="pb-5">
    <!-- Video -->
    <v-flex xs12 :id="String(this.current_trackID)">
      <div id="player"></div>
    </v-flex>
    <v-flex d-flex xs12>
      <v-layout row wrap id="dc-padding">
        <!-- Song Title -->
        <v-flex xs12 class="mt-2">
          <div class="title text-xs-left">{{$store.getters.current_song.title}}</div >
        </v-flex> 
        <!-- Buttons and uploaded date -->
        <v-flex xs12 class="stage-btns">
          <div class="fl-l blue-grey--text text--lighten-1">
            {{$DCAPI.calcDate('', song.uploaded)}}
          </div>
          <div class="fl-r">
            <!-- yt button -->
            <youtube-button></youtube-button>

            <v-speed-dial direction="left" class="stage-btn" open-on-hover>
              <v-btn slot="activator" class="ma-0 pa-0" icon small hover fab>
                <v-icon>settings</v-icon>
              </v-btn>
              <div class="slider-wrapper">
                <v-btn icon fab>
                  <v-icon>people</v-icon>
                </v-btn>
              </div>
            </v-speed-dial>
            
            <v-speed-dial direction="left" class="stage-btn" open-on-hover>
              <v-btn slot="activator" class="ma-0 pa-0" icon small :nudge-bottom="25" hover fab>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <div class="slider-wrapper">
                <v-btn icon fab>
                  <v-icon>people</v-icon>
                </v-btn>
              </div>
            </v-speed-dial>

            <!-- fullscreen button -->
            <v-btn @click="fullscreen" class="ma-0 pa-0" icon small hover fab>
              <v-icon>fullscreen</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <!-- Artist Picture -->
        <artist-info-mini :artistID="song.artistID" :source="song.source" :artist="song.artist" :key="song.artistID"></artist-info-mini>
        <!-- Artist name + Song description -->
        <v-flex xs12 lg7 class="subheading text-xs-left pl-3 mt-3">
          <strong>{{ song.artist }}</strong>
          <!-- Description -->
          <v-flex xs12>
            <span class="subheading" id="stg-dsc" v-html="timeToSeconds(description)"></span>
          </v-flex>
        </v-flex>
        <!-- related -->
        <related></related>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import artistInfo from '@/components/misc/song-info'
import related from '@/components/stage/stage-related'
import youtubeVBtn from '@/components/misc/toggle-video-button'
/* eslint-disable */
export default {
  name: 'video-stage',
  components: {
    'artist-info-mini': artistInfo,
    'youtube-button': youtubeVBtn,
    'related': related
  },
  data () {
    return {
      yt: '',
      interval: '',
      description: '',
      currentid: ''
    }
  },
  computed: {
    song () {
      return this.$store.getters.current_song
    },
    showClass () {
      return { 'hidden': this.$store.getters.ytShowVideo }
      // return this.$store.getters.ytShowVideo
    },
    current_trackID () {
      return this.$store.getters.current_trackID ? this.$store.getters.current_trackID : 'player'
    }
  },
  mounted () {
    if (this.$store.getters.isYT) {
      this.getDesc()
      this.ytBind()
    }
  },
  updated () {
    // console.log('yt-stage updated', !this.$store.getters.ytSwitchTime)
    if (this.$store.getters.isYT && this.currentID != this.current_trackID && this.$store.getters.ytUseVideo && !this.$store.getters.ytSwitchTime) {
      this.currentID = this.current_trackID
      if (!this.$store.getters.ytObject.hasOwnProperty('loadVideoById')) {
        // console.log('loading')
        this.ytBind()
      } else {
        // console.log('loading')
        this.$store.getters.ytObject.loadVideoById(this.current_trackID)
      }
      this.getDesc()
      this.$DCPlayer.pause()
    } else {
      // This stores the last trackID to ensure we don't load the same video twice by accident.
      // It's tied to the div above, there's a much better way to do this.
      this.currentID = this.current_trackID
    }
  },
  methods: {
    timeToSeconds (value) {
      if (!value) {
        return ''
      }
      return (value.replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g, 
      `<span onClick="window.dcYT.seekTo('$&'.split(':').reduce((acc,time) => (60 * acc) + +time));" class="underline"
      >$&</span>`))
    },
    // 
    fullscreen () {
      var e = document.getElementById('player')
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
      if (!this.$store.getters.ytUseVideo) {
        return
      }
      // console.log('loading')
      this.$DCPlayer.pause()
      this.yt = new YT.Player('player', {
        width: '100%',
        videoId: this.current_trackID,
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
        this.interval = setInterval(() => { 
          this.$store.commit('ytCurrentTime', this.$store.getters.ytObject.getCurrentTime()) 
        }, 250)
      } else if (state.data === 0) {
        clearInterval(this.interval)
        this.$store.commit('ytCurrentTime', 0) 
        this.$DCPlayer.next()
      } else { //if (state.data === 5 || state.data === 3 || state.data === 2) {
        clearInterval(this.interval)
      }
    }
  },
  destroyed () {
    clearInterval(this.interval)
  }
}
</script>

<style>
#stg-desc{
  white-space: pre-line;
  word-break: break-word;
}
.fl-l{
  float: left;
  margin-top: 10px;
}
.fl-r{
  float: right;
}
#img-bg{
  background-color:black;
}
.stage-btns{
  /* height: 36px; */
  border-bottom: 1px solid teal;
}
.stage-btn{
  float: right;
}
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
