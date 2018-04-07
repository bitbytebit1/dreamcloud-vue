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
            <!-- closed captions -->
            <v-btn class="ma-0 pa-0" icon small hover fab @click="toggleCC">
              <v-icon :color="cc ? 'white' : 'grey'">subtitles</v-icon>
            </v-btn>
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
          
            <!-- fullscreen button -->
            <v-btn @click="fullscreen" class="ma-0 pa-0" icon small hover fab>
              <v-icon>fullscreen</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <!-- Artist Picture -->
        <artist-mini :artistID="song.artistID" :source="song.source" :artist="song.artist" :key="song.artistID"></artist-mini>
        <!-- Artist name + Song description -->
        <v-flex xs12 lg7 class="subheading text-xs-left pl-3 mt-3">
          <strong>{{ song.artist }}</strong>
          <!-- Description -->
          <v-flex xs12>
            <span class="subheading wordbreak" id="stg-dsc" v-html="timeToSeconds(description)"></span>
          </v-flex>
        </v-flex>
        <!-- related -->
        <related></related>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import related from '@/components/main/stage/stage-related'
import artistMini from '@/components/misc/artist-mini'
import youtubeVBtn from '@/components/misc/toggle-video-button'
/* eslint-disable */
export default {
  name: 'video-stage',
  created () {
    var tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    var fst = document.getElementsByTagName('script')[0]
    fst.parentNode.insertBefore(tag, fst)
  },
  components: {
    'artist-mini': artistMini,
    'youtube-button': youtubeVBtn,
    'related': related
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
  data () {
    return {
      b_YT_API_INJECTED: false,
      cc: false,
      yt: '',
      interval: '',
      description: '',
      currentid: ''
    }
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    toggleCC () {
      this.cc = !this.cc
      if (this.cc) {
        this.yt.loadModule('captions')
      } else {
        this.yt.unloadModule('captions')
      }
    },
    timeToSeconds (value) {
      if (!value) {
        return ''
      }
      return (value.replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g,
        `<span class="underline pointer" onClick="window.dcYT.seekTo('$&'.split(':').reduce((acc,time) => (60 * acc) + +time));">$&</span>`))
    },
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
      if ((typeof YT === 'undefined') || !YT || !YT.Player) {
        setTimeout(this.ytBind, 100)
        return
      }
      if (!this.$store.getters.ytUseVideo) {
        return
      }
      this.$DCPlayer.pause()
      if (!this.yt) {
        this.yt = new YT.Player('player', {
          width: '100%',
          videoId: this.current_trackID,
          height: window.innerHeight * 0.6 + 'px',
          enablejsapi: 1,
          playerVars: {
            autoplay: 1,        // Auto-play the video on load
            controls: 0,        // Show pause/play buttons in player
            color: 'primary',
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
      }
    },
    ytOnApiChange () {
      // console.log(this.yt.getOptions())
      // console.log(this.yt.getOptions('captions'))
    },
    ytReady (state) {
      this.$store.commit('ytObject', state.target)
      // this.$store.commit('ytState', state.data)
      this.$store.getters.ytObject.playVideo()
      window.dcYT = this.yt
    },
    ytChanged (state) {
      // this.$store.commit('ytObject', state.target)
      this.$store.commit('ytState', state.data)
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
        this.$DCFB.historyPush(this.$store.getters.current_song)
      } else { // if (state.data === 5 || state.data === 3 || state.data === 2) {
        clearInterval(this.interval)
      }
    }
  },
  mounted () {
    if (this.$store.getters.isYT) {
      this.getDesc()
      this.ytBind()
    }
  },
  updated () {
    // if new song
    if (this.$store.getters.isYT && this.currentID !== this.current_trackID && this.$store.getters.ytUseVideo && !this.$store.getters.ytSwitchTime) {
      this.currentID = this.current_trackID
      // if not already attached to iframe
      if (!this.$store.getters.ytObject.hasOwnProperty('loadVideoById')) {
        this.ytBind()
      } else {
        this.$store.getters.ytObject.loadVideoById(this.current_trackID)
      }
      this.getDesc()
      this.$DCPlayer.pause()
    } else {
      // This stores the last trackID to ensure we don't load the same video twice by accident.
      // It's tied to the div above, there's a much better way to do this.
      this.currentID = this.current_trackID
    }
  }
}
</script>

<style>
#player{
  background-color: black
}
#stg-dsc{
  white-space: pre-line;
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
/* .slider-wrapper{ */
  /* display: inherit; */
  /* width: '100%'; */
  /* height: 70px; */
  /* padding: 0; */
/* } */
</style>
