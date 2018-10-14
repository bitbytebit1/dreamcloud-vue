<template>
  <div 
    id="dc-audio-container" 
    class="yt">
    <div id="dc-player">
      <!-- CONTROLS -->
      <div 
        id="left" 
        class="fl-l">
        <div class="fl-l">
          <v-btn 
            class="primary" 
            icon 
            outline 
            @click="previous">
            <v-icon>skip_previous</v-icon>
          </v-btn>
          <v-btn 
            :loading="bLoading" 
            class="primary" 
            icon 
            outline 
            @click="togglePlay">
            <v-icon>{{ sPlayIcon }}</v-icon>
          </v-btn>
          <v-btn 
            class="primary" 
            icon 
            outline 
            @click="next">
            <v-icon>skip_next</v-icon>
          </v-btn>
        </div>
      </div>
      
      <!-- VOLUME -->
      <div 
        id="right" 
        class="hidden-xs-only" 
        @wheel.prevent="onWheel">
        <v-speed-dial 
          hover 
          transition="slide-x-reverse-transition" 
          open-on-hover>
          <v-btn 
            slot="activator" 
            :class="volClass" 
            fab 
            hover 
            icon 
            outline 
            small 
            @click.prevent="toggleMute">
            <v-icon>{{ volIcon }}</v-icon>
          </v-btn>
          <div 
            class="slider-wrapper" 
            @click.prevent>
            <input 
              v-model="volume" 
              class="vol-slider pointer" 
              type="range" 
              min="0" 
              max="100" 
              step="1" 
              @input="volumeChange">
          </div>
        </v-speed-dial>
      </div>

      <!-- PROGRESS -->
      <div id="middle">
        <div id="progress">
          <v-layout 
            row 
            wrap>
            <v-flex 
              xs12 
              class="ml-3 mr-3">
              <v-slider 
                :thumb-size="thumbSize" 
                :max="iDuration" 
                :label="iCurrent" 
                v-model="iProgress" 
                thumb-label 
                color="primary" 
                hide-details>
                <template
                  slot="thumb-label"
                  slot-scope="props"
                >
                  <span>
                    {{ secondsToDuration(iProgress) }}
                  </span>
                </template>
              </v-slider>
            </v-flex>
          </v-layout>
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
      progress: 0,
      volIcon: 'volume_up',
      volume: 100
    }
  },
  computed: {
    thumbSize () {
      // if song is over an hour increase progress thumb label size
      return this.iProgress > 3601 ? '55' : '35'
    },
    volClass () {
      return this.volIcon === 'volume_off' ? 'red' : 'primary'
    },
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
          this.$store.getters.ytObject.seekTo(newValue)
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
      return this.$store.getters.ytState === 3
    },
    bPlaying () {
      return this.$store.getters.ytState === 1
    },
    sPlayIcon () {
      return this.bPlaying ? 'pause' : 'play_arrow'
    },
    currentImage () {
      return this.$store.getters.index > -1
        ? this.$store.getters.current_Playlist[this.$store.getters.index].posterLarge
        : '/static/img/loading.png'
    }
  },
  methods: {
    onWheel (e) {
      if (e.deltaX > e.deltaY) {
        this.$DCPlayer.volUp()
        this.volume = this.$store.getters.ytObject.getVolume()
      } else {
        this.$DCPlayer.volDown()
        this.volume = this.$store.getters.ytObject.getVolume()
      }
      this.updateVolIcon()
    },
    toggleMute () {
      if (this.$store.getters.ytObject.isMuted()) {
        this.$store.getters.ytObject.unMute()
        this.updateVolIcon()
      } else {
        this.$store.getters.ytObject.mute()
        this.volIcon = 'volume_off'
      }
    },
    volumeChange () {
      this.$store.getters.ytObject.setVolume(this.volume)
      this.updateVolIcon()
      if (this.$store.getters.ytObject.isMuted()) {
        this.$store.getters.ytObject.unMute()
      }
    },
    updateVolIcon () {
      return (this.volIcon = this.volume > 50 ? 'volume_up' : this.volume === 0 ? 'volume_off' : 'volume_down')
    },
    togglePlay () {
      if (this.bPlaying) {
        this.$store.getters.ytObject.pauseVideo()
      } else {
        this.$store.getters.ytObject.playVideo()
      }
    },
    next () {
      this.$DCPlayer.next()
      this.$DCFB.historyPush(this.$store.getters.current_song)
    },
    previous () {
      this.$DCPlayer.previous()
      this.$DCFB.historyPush(this.$store.getters.current_song)
    },
    secondsToDuration (ms) {
      if (isNaN(ms)) {
        return '00:00'
      }
      var seconds = Math.ceil(ms)
      var hh = Math.floor(seconds / 3600)
      var mm = Math.floor((seconds - (hh * 3600)) / 60)
      var ss = seconds - (hh * 3600) - (mm * 60)
      if (hh < 10) { hh = '0' + hh }
      if (mm < 10) { mm = '0' + mm }
      if (ss < 10) { ss = '0' + ss }
      return (hh > 0 ? hh + ':' : '') + mm + ':' + ss
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#progress-slider-2{
  margin-top: 15px;
}
/* #play-load{ */
  /* top: -1px; */
  /* left: 0px; */
  /* width: 42px !important; */
/* } */
.vol-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 25px;
    background: #d3d3d3;
    outline: none;
    /* opacity: 1; */
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.vol-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* appearance: none; */
    width: 20px;
    height: 25px;
    background: teal;
}

.vol-slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: teal;
}
.vol-slider::-moz-range-track {
    background: #d3d3d3;
}

.vol-slider::-webkit-slider-runnable-track {
    background: #d3d3d3;
}
/* #loadingSpinner{ */
  /* top: -2px; */
  /* top:10px;   */
  /* width: 52px !important; */
/* } */
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


/* #dc-player {
  padding-top: 5px;
} */

#progress-slider {
  padding-top: 14px;
}

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
}
#right {
  float: right;
  margin-top: 5px !important;  
}
@media only screen and (min-width: 960px){
  
  #progress .v-input--slider{
    margin-top: 16px;
  }
  #middle {
    margin-right: 100px;
  }
  #dc-audio-container {
    width: 100%;
    /* margin-top: -60px; */
  }
}
@media only screen and (max-width: 959px){
  #progress .v-input--slider{
    margin-top: 0px;
  }
  #dc-audio-container {
    width: 100%;
    margin-top: -60px;
  }
  #progress-slider{
    height: 20px;
    padding: 0!important  
  }
  #middle{
    float: left;
    width: 100%;
  }
}

</style>
