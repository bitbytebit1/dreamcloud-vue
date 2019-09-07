<template>
  <div 
    id="dc-audio-container"
    class="yt" 
  >
    <div id="dc-player">
      <!-- CONTROLS -->
      <div 
        id="left"
        :style="$vuetify.breakpoint.xsOnly ? {width: '100%'} : {}" 
        class="fl-l"
        @click.stop="$vuetify.breakpoint.xsOnly ? $store.commit('toggleStage') : null" 
      >
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
                :loading="$store.getters.ytIsLoading" 
                :outline="$vuetify.breakpoint.smAndUp" 
                :class="$vuetify.breakpoint.smAndUp ? 'primary' : ''" 
                icon
                @click.stop="$DCPlayer.togglePlay"
              >
                <v-icon>{{ sPlayIcon }}</v-icon>
              </v-btn>
              <v-btn 
                v-if="$vuetify.breakpoint.smAndUp"
                class="primary" 
                icon 
                outline 
                @click="next"
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
      <!-- VOLUME -->
      <div 
        id="right" 
        :key="volThumbCol" 
        class="hidden-xs-only"
        @wheel.prevent="onWheel"
      >
        <v-speed-dial 
          transition="none" 
          open-on-hover
        >
          <v-btn 
            slot="activator" 
            :class="volCol" 
            fab 
            hover 
            icon 
            outline 
            small 
            @click.prevent="toggleMute"
          >
            <v-icon>{{ volIcn }}</v-icon>
          </v-btn>
          <div 
            class="slider-wrapper" 
            @click.prevent
          >
            <input 
              v-model="volume"
              class="vol-slider pointer"
              type="range" 
              min="0" 
              max="100" 
              step="1" 
              @input="volumeChange"
            >
          </div>
        </v-speed-dial>
      </div>
      <!-- SHOW POPUP -->
      <div 
        v-if="$vuetify.breakpoint.smAndUp" 
        class="right"
      >
        <scroll-to-top/>
      </div>
      
      <!-- PROGRESS -->
      <div id="middle">
        <div id="progress">
          <v-layout 
            row 
            wrap
          >
            <v-flex 
              xs12 
              class="ml-3 mr-3"
            >
              <v-slider 
                :max="iDuration" 
                :label="iCurrent" 
                :value="iProgress" 
                color="primary" 
                hide-details
                @change="progressClick"
              >
                <!-- <template
                  slot="thumb-label"
                >
                  <span>
                    {{ secondsToDuration(iProgress) }}
                  </span>
                </template> -->
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
import scrollToTop from '@/components/footer/show-pop.vue'
function addStyleString(str, id) {
  var node = document.createElement('style');
  node.innerHTML = str;
  node.id = id;
  document.body.appendChild(node);
}
export default {
  name: 'dc-youtube',
  data () {
    return {
      progress: 0,
      volume: 100
    }
  },
  components: {
    'scroll-to-top': scrollToTop,
  },
  computed: {
    volThumbCol () {
      // could be done better by utilising ID
      addStyleString(`.vol-slider::-webkit-slider-thumb { background: ${this.$vuetify.theme.primary} }.vol-slider::-moz-range-thumb { background: ${this.$vuetify.theme.primary} }`, 'vol-slider-style');
      // const el = document.getElementById('vol-slider-style')
      // el.innerHTML = ''
      // el.innerHTML = `.vol-slider::-webkit-slider-thumb { background: ${this.$vuetify.theme.primary} } .vol-slider::-moz-range-thumb { background: ${this.$vuetify.theme.primary} }`
      // console.log(document.getElementById('vol-slider-style'))
    },
    volIcn () {
      return this.volume > 50 ? 'volume_up' : this.volume === 0 ? 'volume_off' : 'volume_down'
    },
    volCol () {
      return this.volume === 0 ? 'red' : 'primary'
    },
    iProgress: {
      // getter
      get () {
        return Math.floor(this.$store.getters.ytCurrentTime)
      },
      // setter
      set (newValue) {
      }
    },
    iDuration () {
      return Math.floor(this.$store.getters.ytDuration)
    },
    iCurrent () {
      return `${this.secondsToDuration(this.$store.getters.ytCurrentTime)} - ${this.secondsToDuration(this.$store.getters.ytDuration)}`
    },
    artistAndTitleLength() {
      if (!this.$store.state.player.current_index) return 0
      return String(this.$store.getters.current_song.title).length + String(this.$store.getters.current_song.artist).length > 40
    },
    /*
      -1 (unstarted)
      0 (ended)
      1 (playing)
      2 (paused)
      3 (buffering)
      5 (video cued).
    */
    sPlayIcon () {
      return this.$store.getters.ytIsPlaying ? 'pause' : 'play_arrow'
    }
  },
  methods: {
    progressClick(newValue) {
      this.$store.getters.ytObject.seekTo(newValue)
    },
    onWheel (e) {
      if (e.deltaX > e.deltaY) {
        this.volume = this.$DCPlayer.volUp()
      } else {
        this.volume = this.$DCPlayer.volDown()
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
      if (this.$store.getters.ytIsPlaying) {
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
.vol-slider {
  background: red
}
#progress-slider-2{
  margin-top: 15px;
}
.vol-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 25px;
    background: #504949;
    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.vol-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 25px;
}

.vol-slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
}
.vol-slider::-moz-range-track {
    background: #504949;
}

.vol-slider::-webkit-slider-runnable-track {
    background: #504949;
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

#progress-slider {
  padding-top: 14px;
}

#poster {
  height: 35px;
  margin-top: 6px;
}

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
