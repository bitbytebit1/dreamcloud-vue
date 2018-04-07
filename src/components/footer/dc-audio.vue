<template>
  <div id="dc-audio-container">
    <div id="dc-player">
      <div id="left">
        <div class="audio-controls"></div>
        <div class="audio-controls">
          <v-btn @click="previous" v-bind="$store.getters.theme" class="primary" icon outline>
            <v-icon>skip_previous</v-icon>
          </v-btn>
          <v-btn v-if="bLoading" v-bind="$store.getters.theme" class="primary" icon outline>
            <v-progress-circular id="play-load" indeterminate v-bind:size="25"></v-progress-circular>
          </v-btn>
          <v-btn v-else v-bind="$store.getters.theme" @click="$DCPlayer.togglePlay" class="primary" icon outline>
            <v-icon>{{play_arrow}}</v-icon>
          </v-btn>
          <v-btn @click="next" v-bind="$store.getters.theme" class="primary" icon outline>
            <v-icon>skip_next</v-icon>
          </v-btn>
        </div>
      </div>
      
      <div id="right" class="hidden-sm-and-down">
        <v-speed-dial hover transition="slide-x-reverse-transition" open-on-hover>
          <v-btn v-bind="$store.getters.theme" @click="toggleMute" :class="volClass" slot="activator" fab hover icon outline small>
            <v-icon>{{volIcon}}</v-icon>
          </v-btn>
          <div class="slider-wrapper">
            <input class="vol-slider pointer" type="range" min="0" max="10" @input="volumeChange" v-model="volume" step="0.01">
          </div>
        </v-speed-dial>
      </div>

      <div id="middle">
        <div id="progress">
          <v-container fluid grid-list-md class="pa-0 ma-0">
            <v-layout row wrap>
              <v-flex xs12 class="ml-3 mr-3">
                <v-slider :max="eAudio.duration" :label="currentTime" @input="changePos" v-model="progress" id="progress-slider" color="primary" hide-details></v-slider>
              </v-flex>
            </v-layout>
          </v-container>
        </div>  
      </div>

    </div>
    <audio controls id="dc-audio"></audio>
  </div>
</template>

<script>
export default {
  name: 'dcAudio',
  data () {
    return {
      bLoading: false,
      progress: 0,
      eAudio: '',
      play_arrow: 'play_arrow',
      volIcon: 'volume_up',
      volume: 10,
      duration: '',
      currentTime: ''
    }
  },
  computed: {
    volClass () {
      return this.volIcon === 'volume_off' ? 'red' : 'primary'
    }
  },
  methods: {
    toggleMute () {
      this.eAudio.muted = !this.eAudio.muted
      this.volIcon = this.eAudio.muted ? 'volume_off' : this.updateVolIcon()
    },
    volumeChange () {
      this.eAudio.volume = this.volume / 10
      this.updateVolIcon()
      // !0 === this.eAudio.muted && (this.eAudio.muted = !1) // if muted then set not muted, could just set false
    },
    volumeChange2 () {
      this.updateVolIcon()
    },
    updateVolIcon () {
      return (this.volIcon = this.eAudio.volume > 0.5 ? 'volume_up' : this.eAudio.volume <= 0 || this.eAudio.muted ? 'volume_off' : 'volume_down')
    },
    changePos (pos) {
      if (!isNaN(pos)) {
        this.eAudio.currentTime = pos
      }
    },
    updated () {
      this.currentTime = `${this.secondsToDuration(this.eAudio.currentTime)} - ${this.secondsToDuration(this.eAudio.duration)}`
      this.progress = Math.floor(this.eAudio.currentTime)
    },
    playing () {
      this.duration = this.secondsToDuration(this.eAudio.duration.toFixed(0))
      this.play_arrow = 'pause'
      this.bLoading = false
    },
    paused () {
      this.play_arrow = 'play_arrow'
    },
    loading () {
      this.bLoading = true
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
      var seconds = parseInt(ms, 10)
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
    this.eAudio = this.$DCPlayer.eAudio = document.getElementById('dc-audio') // A little bit naughty to set the value like this =\
    this.eAudio.addEventListener('timeupdate', this.updated)
    this.eAudio.addEventListener('playing', this.playing)
    this.eAudio.addEventListener('pause', this.paused)
    this.eAudio.addEventListener('loadstart', this.loading)
    this.eAudio.addEventListener('ended', this.next)
    this.eAudio.addEventListener('volumechange', this.volumeChange2)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.vol-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 25px;
    background: #d3d3d3;
    outline: none;
    /* /* opacity: 1; */ 
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.vol-slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #d3d3d3;
}
.vol-slider::-webkit-slider-runnable-track {
    background: #d3d3d3;
}


.vol-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 25px;
    background: teal;
}

.vol-slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: teal;
}

#play-load{
  top: -1px;
  left: 0px;
  /* width: 42px !important; */
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
