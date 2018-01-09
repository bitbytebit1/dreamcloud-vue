<template>
  <v-flex xs12 lg-offset-2 lg9 flexbox class="mt-3" >
    <!-- Player -->
    <v-flex xs12>
      <div :id="this.current_trackID" />
    </v-flex>

    <!-- Title -->
    <v-flex xs10>
      <div class="title text-xs-left">{{$store.getters.current_song.title}}</div >
    </v-flex> 

    <!-- Buttons -->
    <v-flex xs2>
      <v-btn @click="fullscreenClick">
        Fullscreen
      </v-btn>
    </v-flex>
  
    <!-- Description -->
    <v-flex xs12>
      <span class="subheading text-xs-left" style="white-space: pre;">{{description}}</span>    
    </v-flex>
  </v-flex>
</template>
<script>
// let YT = ''
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
    x3 () {
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
    fullscreenClick () {
      var e = document.getElementById(this.current_trackID);
      if (e.requestFullscreen) {
          e.requestFullscreen();
      } else if (e.webkitRequestFullscreen) {
          e.webkitRequestFullscreen();
      } else if (e.mozRequestFullScreen) {
          e.mozRequestFullScreen();
      } else if (e.msRequestFullscreen) {
          e.msRequestFullscreen();
      }
    },
    getDesc () {
      this.$DCAPI.getSongDescription(this.current_trackID, this.song.source, (resp) => {
        
        this.description = resp.items[0].snippet.description.trim()
        console.log('"' + this.description + '"')
      })
    },
    ytBind () {
      if (!this.$store.getters.ytVideo) {
        return
      }
      this.$DCPlayer.eAudio.pause()
      this.yt = new YT.Player(this.current_trackID, {
        width: '100%',
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
/* .ytButtons{
  float: right;
}
.ytTitle{
  float: left;
  margin-right:10px
}
.ytDesc{
  float: left;
} */
</style>
