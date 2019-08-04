<template>
  <div 
    id="dc-audio-container"
  >
    <!-- <div id="dc-player"> -->
    <!-- CONTROLS -->
    <div 
      id="left" 
      :style="$vuetify.breakpoint.xsOnly ? {width: '100%'} : {}"
      class="fl-l" 
      @click="$vuetify.breakpoint.xsOnly ? $store.commit('toggleStage') : null" 
    >
      <!-- @click="$vuetify.breakpoint.xsOnly && $store.getters.current_song ? $router.push({name: 'auto', params: { artist: $store.getters.current_song.artist, trackID: $store.getters.current_song.trackID, source: $store.getters.current_song.source }}) : null" -->
      <div 
        :style="{width: '100%'}" 
      >
        <v-layout 
          row 
          wrap
          align-center
        >
          <v-flex 
            xs2 
            sm12
            @click.stop
          >
            <v-btn 
              v-if="$vuetify.breakpoint.smAndUp"
              class="primary" 
              icon 
              outline
              @click="previous"
            >
              <v-icon>skip_previous</v-icon>
            </v-btn>
            <v-btn 
              :loading="bLoading" 
              :outline="$vuetify.breakpoint.smAndUp" 
              :class="$vuetify.breakpoint.smAndUp ? 'primary' : ''" 
              icon
              @click="$DCPlayer.togglePlay"
            >
              <v-icon>{{ play_arrow }}</v-icon>
            </v-btn>
            <v-btn 
              v-if="$vuetify.breakpoint.smAndUp"
              class="primary" 
              icon 
              outline 
              @click.stop="next"
            >
              <v-icon>skip_next</v-icon>
            </v-btn>
          </v-flex>
          <v-flex 
            v-touch="{
              left: next,
              right: previous
            }" 
            xs10
            pr-2 
          >
            <div 
              v-if="$vuetify.breakpoint.xsOnly"
              id="mobTitle"
              class="mr-4"
            >
              <marquee v-if="artistAndTitleLength">
                <span>{{ $store.getters.current_song.title }}</span>
                <span class="grey--text"> - {{ $store.getters.current_song.artist }}</span>
              </marquee>
              <template v-else>
                <span>{{ $store.getters.current_song.title }}</span>
                <span class="grey--text"> - {{ $store.getters.current_song.artist }}</span>
              </template> 
            </div>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <!-- <div class="fl-l">
      </div> -->

    <!-- VOLUME -->
    <div 
      id="right" 
      class="hidden-xs-only" 
      @wheel.prevent="onWheel"
    >
      <!-- transition="slide-x-reverse-transition"  -->
      <v-speed-dial 
        transition="none" 
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
        <div 
          class="slider-wrapper ma-0 pa-0"
        >
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
    <div 
      v-if="$vuetify.breakpoint.smAndUp"
      class="right"
    >
      <scroll-to-top/>
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
            <!-- :inverse-label="$vuetify.breakpoint.xsOnly"  -->
            <v-slider 
              :max="eAudio.duration" 
              :label="currentTime" 
              v-model="progress"
              color="primary" 
              hide-details
              @input="changePos"
            />
          </v-flex>
        </v-layout>
        <!-- </v-container> -->
      </div>  
    </div>

    <!-- </div> -->
    <!-- AUDIO ELEMENT -->
    <audio 
      id="dc-audio" 
      controls
      preload="auto"
    />
    <img 
      id="dc-preload" 
    >
  </div>
</template>

<script>
// import axios from "axios";

import scrollToTop from '@/components/footer/show-pop'
let last = ''
export default {
  name: 'DcAudio',
  components: {
    'scroll-to-top': scrollToTop,
  },
  data () {
    return {
      bPreLoaded: false,
      bLoading: false,
      progress: 0,
      eAudio: '',
      ePreload: '',
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
    },
    artistAndTitleLength() {
      if (!this.$store.state.player.current_index) return 0
      return String(this.$store.getters.current_song.title).length + String(this.$store.getters.current_song.artist).length > 40
    },
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
      if (!isNaN(pos) && this.eAudio.currentTime) {
        this.eAudio.currentTime = pos
      }
    },
    updated () {
      // stop thrashing
      if (last == ~~this.eAudio.currentTime) {
        return
      }
      last = ~~this.eAudio.currentTime
      this.currentTime = `${this.secondsToDuration(this.eAudio.currentTime)} - ${this.secondsToDuration(this.eAudio.duration)}`
      this.progress = Math.floor(this.eAudio.currentTime)
      
      if (!this.bPreLoaded &&  100 / this.eAudio.duration * this.eAudio.currentTime > 3) {
        this.bPreLoaded = true
        // alert('preloading')
        if (this.$store.getters.next_song && this.$store.getters.next_song.source != 'SoundCloud') {
          if (this.$store.getters.next_song.source == 'YouTube') {
            this.ePreload.src = `${this.$DCPlayer.sBase}v2/preload/?i=${this.$store.getters.next_song.trackID}`
            // axios.head(`${this.$DCPlayer.sBase}v1/preload/?i=${this.$store.getters.next_song.trackID}`)
          } else {
            this.ePreload.src = `${this.$DCPlayer.sBase}v2/preload/?i=${this.$store.getters.next_song.mp32}`
            // axios.head(`${this.$DCPlayer.sBase}v1/preload/?i=${this.$store.getters.next_song.mp32}`)
          }
          
        }
      }
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
      // console.log('loadingg')
      // if (this.$route.name === 'auto') {
      //   this.$router.push({name: 'auto', params: { artist: this.$store.getters.current_song.artist,  trackID: this.$store.getters.current_song.trackID,  source: this.$store.getters.current_song.source }})
      // }
      this.currentTime = '00:00 - 00:00'
      this.$store.commit('dcIsLoading', true)
      this.bLoading = true
      this.bPreLoaded = false

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
    this.ePreload = document.getElementById('dc-preload') // A little bit naughty to set the value like this =\
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
#mobTitle{
  height: 18px;
  overflow: hidden;
}

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
    width: 20px;
    height: 25px;
    /* background: teal; */
}
.vol-slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    /* background: teal; */
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

#dc-audio, #dc-preload {
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
