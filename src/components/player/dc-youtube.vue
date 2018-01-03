<template>
  <div id="dc-audio-container" class="yt">
    <div id="dc-player">
      <div id="left">
        <div class="audio-controls">
          <!-- <img id="poster" :src="currentImage"> -->
          {{$store.ytVideo}}
        </div>
        <div class="audio-controls">
          <v-btn @click="previous" class="teal" icon outline >
            <v-icon>skip_previous</v-icon>
          </v-btn>
          <v-btn outline icon v-if="bLoading">
            <v-progress-circular color="teal" id="loadingSpinner" indeterminate v-bind:size="25"></v-progress-circular>
          </v-btn>
          <v-btn v-else @click="togglePlay" class="teal" icon outline>
            <v-icon>{{sPlayIcon}}</v-icon>
          </v-btn>
          <v-btn icon outline class="teal" @click="next">
            <v-icon>skip_next</v-icon>
          </v-btn>
        </div>
      </div>
      
      <div id="right" class="hidden-sm-and-down">
        <v-speed-dial hover>
          <v-btn @click="toggleMute" slot="activator" fab hover small>
            <v-icon>{{volIcon}}</v-icon>
          </v-btn>
          <div class="slider-wrapper">
            <input type="range" min="0" max="10" @input="volumeChange" v-model="volume" step="1">
          </div>
        </v-speed-dial>
      </div>

      <div id="middle">
        <div id="progress">
          <v-container fluid grid-list-md class="pa-0 ma-0">
            <v-layout row wrap>
              <v-flex>
                <v-slider :max="iDuration" :label="iCurrent" v-model="iProgress"  id="progress-slider" color="teal" thumb-label  hide-details></v-slider>
                <!-- @input="changePos" -->
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'dc-youtube',
  data () {
    return {
      // bLoading: true,
      progress: 0,
      // eAudio: '',
      // play_arrow: 'play_arrow',
      volIcon: 'volume_up',
      volume: 10
      // iDuration: '00:00'
      // duration: '',
      // currentTime: ''
    }
  },
  computed: {
    iProgress: {
      // getter
      get () {
        return Math.floor(this.$store.getters.ytCurrentTime)
      },
      // setter
      set (newValue) {
        let i = Math.floor(this.iProgress)
        if (i !== newValue && i + 1 !== newValue) {
          this.$store.commit('ytCurrentTime', newValue)
          this.$store.getters.ytState.target.seekTo(newValue)
        }
      }
    },
    iDuration () {
      return Math.floor(this.$store.getters.ytDuration)
    },
    iCurrent () {
      return `${this.secondsToDuration(this.$store.getters.ytCurrentTime)} - ${this.secondsToDuration(this.$store.getters.ytDuration)}`
    },
    // -1 (unstarted)
    // 0 (ended)
    // 1 (playing)
    // 2 (paused)
    // 3 (buffering)
    // 5 (video cued).
    bLoading () {
      // return this.$store.getters.ytState.data !== 1 && this.$store.getters.ytState.data !== 2 && this.$store.getters.ytState.data !== 0 && this.$store.getters.ytState.data !== 3
      return this.$store.getters.ytState.data === 3
    },
    bPlaying () {
      return this.$store.getters.ytState.data === 1
    },
    sPlayIcon () {
      return this.bPlaying ? 'pause' : 'play_arrow'
    },
    currentImage () {
      // very hacky way to get the loading spinner to fire before the audio element fires
      // if (this.$store.getters.index > -1) {
      //   this.loading()
      // }
      return this.$store.getters.index > -1
      ? this.$store.getters.current_Playlist[this.$store.getters.index].posterLarge
      : '/static/img/loading.gif'
    }
  },
  methods: {
    toggleMute () {
      // console.log('toggle mute', this.$store.getters.ytState.target.mute())
      if (this.$store.getters.ytState.target.isMuted()) {
        this.$store.getters.ytState.target.unMute()
        this.updateVolIcon()
      } else {
        this.$store.getters.ytState.target.mute()
        this.volIcon = 'volume_off'
      }
      // this.eAudio.muted = !this.eAudio.muted
      // this.volIcon = this.$store.getters.ytState.target.isMuted() ? (this.$store.getters.ytState.target.unMute(), this.updateVolIcon()) : (this.$store.getters.ytState.target.mute(), 'volume_off')
    },
    volumeChange (wasd) {
      this.updateVolIcon()
      this.$store.getters.ytObject.setVolume(this.volume * 10)
      if (this.$store.getters.ytObject.isMuted()) {
        this.$store.getters.ytObject.unMute()
      }
    },
    updateVolIcon () {
      this.volIcon = 5 < this.volume ? 'volume_up' : 0 < this.volume ? 'volume_down' : 'volume_off'
      return this.volIcon
    },
    togglePlay () {
      if (this.bPlaying) {
        this.$store.getters.ytObject.pauseVideo()
      } else {
        this.$store.getters.ytObject.playVideo()
      }
    },
    // updated () {
      // This is how you don't concatenate strings
      // this.currentTime = this.secondsToDuration(this.eAudio.currentTime) + '-' + this.secondsToDuration(this.eAudio.duration)
      // This is the proper way.
      // this.currentTime = `${this.secondsToDuration(this.eAudio.currentTime)} - ${this.secondsToDuration(this.eAudio.duration)}`
      // this.progress = Math.floor(this.eAudio.currentTime)
    // },
    // playing () {
      // this.duration = this.secondsToDuration(this.eAudio.duration.toFixed(0))
      // this.play_arrow = 'pause'
      // this.bLoading = false
    // },
    // paused () {
      // this.play_arrow = 'play_arrow'
    // },
    // loading () {
    //   this.bLoading = true
    // },
    next () {
      this.$DCPlayer.next()
    },
    previous () {
      this.$DCPlayer.previous()
    },
    secondsToDuration (ms) {
      if (isNaN(ms)) {
        return '00:00'
      }
      var seconds = Math.floor(ms)
      var hh = Math.floor(seconds / 3600)
      var mm = Math.floor((seconds - (hh * 3600)) / 60)
      var ss = seconds - (hh * 3600) - (mm * 60)
      if (hh < 10) { hh = '0' + hh }
      if (mm < 10) { mm = '0' + mm }
      if (ss < 10) { ss = '0' + ss }
      return (hh > 0 ? hh + ':' : '') + mm + ':' + ss
    }
  },
  mounted () {
//     this.$DCPlayer.eAudio = document.getElementById('dc-audio') // A little bit naughty to set the value like this =\
//     this.eAudio = document.getElementById('dc-audio')
//     this.eAudio.addEventListener('timeupdate', this.updated)
//     this.eAudio.addEventListener('playing', this.playing)
//     this.eAudio.addEventListener('pause', this.paused)
//     this.eAudio.addEventListener('loadstart', this.loading)
//     this.eAudio.addEventListener('ended', this.$DCPlayer.next)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#loadingSpinner{
  /* top:10px;   */
  width: 52px !important;
}
.slider-wrapper input {
  width: 150px;
  height: 20px;
  margin: 0;
  transform-origin: 75px 75px;
  transform: rotate(-90deg);
}

.slider-wrapper {
  display: inline-block;
  width: 20px;
  height: 150px;
  padding: 0;
}

#dc-audio {
  display: none;
}

#dc-audio-container {
  width: 100%;
  margin-top: -12px;
}

.audio-controls {
  float: left;
}

#dc-player {
  padding-top: 5px;
}

/* #progress-slider {
  top: -8px
} */

#poster {
  height: 35px;
  margin-top: 6px;
}

/* #progress {
  height: 50px;
} */

#left {
  margin-top: 7px;
  margin-left: 7px;
  float: left;
}
#right {
  float: right;
  margin-top: 5px !important;  
}
@media only screen and (min-width: 600px){
  #middle {
    margin-right: 100px;
  }
}
@media only screen and (max-width: 599px){
  #progress-slider{
    padding: 0!important  
  }
  #middle{
    float: left;
    width: 100%;
  }
}

</style>
