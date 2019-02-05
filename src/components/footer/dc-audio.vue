<template>
  <div id="dc-audio-container">
    <div id="dc-player">
      <!-- CONTROLS -->
      <div 
        id="left" 
        class="fl-l"
      >
        <div class="fl-l">
          <v-btn 
            class="primary" 
            icon 
            outline 
            @click="previous"
          >
            <v-icon>skip_previous</v-icon>
          </v-btn>
          <v-btn 
            :loading="bLoading" 
            class="primary" 
            icon 
            outline 
            @click="$DCPlayer.togglePlay"
          >
            <v-icon>{{ play_arrow }}</v-icon>
          </v-btn>
          <v-btn 
            class="primary" 
            icon 
            outline 
            @click="next"
          >
            <v-icon>skip_next</v-icon>
          </v-btn>
        </div>
      </div>

      <!-- VOLUME -->
      <div 
        id="right" 
        class="hidden-xs-only" 
        @wheel.prevent="onWheel"
      >
        <v-speed-dial 
          hover 
          transition="slide-x-reverse-transition" 
          open-on-hover
        >
          <v-btn 
            slot="activator" 
            :class="volClass" 
            fab 
            hover 
            icon 
            outline 
            small 
            @click="toggleMute"
          >
            <v-icon>{{ volIcon }}</v-icon>
          </v-btn>
          <div class="slider-wrapper">
            <input 
              v-model="volume" 
              class="vol-slider pointer" 
              type="range" 
              min="0" 
              max="10" 
              step="0.01" 
              @input="volumeChange"
            >
          </div>
        </v-speed-dial>
      </div>

      <!-- PROGRESS -->
      <div id="middle">
        <div id="progress">
          <!-- <v-container fluid grid-list-md class="pa-0 ma-0"> -->
          <v-layout 
            row 
            wrap
          >
            <v-flex 
              xs12 
              class="ml-3 mr-3"
            >
              <v-slider 
                :thumb-size="thumbSize" 
                :max="eAudio.duration" 
                :label="currentTime" 
                v-model="progress" 
                thumb-label 
                color="primary" 
                hide-details 
                @input="changePos"
              >
                <template
                  slot="thumb-label"
                >
                  <span>
                    {{ secondsToDuration(progress) }}
                  </span>
                </template>
              </v-slider>
            </v-flex>
          </v-layout>
          <!-- </v-container> -->
        </div>  
      </div>

    </div>
    <!-- AUDIO ELEMENT -->
    <audio 
      id="dc-audio" 
      controls
      preload="auto"
    />
  </div>
</template>

<script>
export default {
  name: 'DcAudio',
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
    thumbSize () {
      // if song is over an hour increase progress thumb label size
      return this.iProgress > 3601 ? '55' : '35'
    },
    volClass () {
      return this.volIcon === 'volume_off' ? 'red' : 'primary'
    }
  },
  methods: {
    onWheel (e) {
      if (e.deltaX > e.deltaY) {
        this.$DCPlayer.volUp()
      } else {
        this.$DCPlayer.volDown()
      }
    },
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
      this.volume = this.eAudio.volume * 10
      this.updateVolIcon()
    },
    updateVolIcon () {
      return (this.volIcon = this.eAudio.volume > 0.5 ? 'volume_up' : this.eAudio.volume === 0 || this.eAudio.muted ? 'volume_off' : 'volume_down')
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
      this.$store.commit('dcIsLoading', false)
      this.$store.commit('dcIsPlaying', true)
      this.duration = this.secondsToDuration(this.eAudio.duration.toFixed(0))
      this.play_arrow = 'pause'
      this.bLoading = false
    },
    paused () {
      this.$store.commit('dcIsPlaying', false)
      this.play_arrow = 'play_arrow'
    },
    loading () {
      if (this.$route.name === 'auto') {
        this.$router.push({name: 'auto', params: { artist: this.$store.getters.current_song.artist,  trackID: this.$store.getters.current_song.trackID,  source: this.$store.getters.current_song.source }})
      }
      this.$store.commit('dcIsLoading', true)
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
      var seconds = Math.ceil(ms)
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

/* #play-load{ */
  /* top: -1px; */
  /* left: 0px; */
  /* width: 42px !important; */
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

/* #progress-slider { */
  /* padding-top: 15px; */

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
    /* margin-top: -45px; */
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
    padding: 0!important
  }
  #middle{
    float: left;
    width: 100%;
  }
}

</style>
