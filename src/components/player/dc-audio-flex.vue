<template>
  <v-container fluid >
    <v-layout row wrap>

      <v-flex xs2>
        <v-layout>
          <!-- <v-flex xs3> -->
            <img id="poster" :src="currentImage">
          <!-- </v-flex> -->

          <!-- <v-flex xs3> -->
            <v-btn icon @click="previous">
              <v-icon>skip_previous</v-icon>
            </v-btn>
          <!-- </v-flex> -->

          <!-- <v-flex xs3> -->
            <v-progress-circular v-if="bLoading" indeterminate v-bind:size="25" color="white"></v-progress-circular>
            <v-btn icon v-else @click="togglePlay">
              <v-icon>{{play_arrow}}</v-icon>
            </v-btn>
          <!-- </v-flex> -->

          <!-- <v-flex xs3> -->
            <v-btn icon @click="next">
              <v-icon>skip_next</v-icon>
            </v-btn>
          <!-- </v-flex> -->

        </v-layout>
      </v-flex>
      
      <v-flex xs9>
        <v-slider @input="changePos" v-model="progress" id="progress-slider" max="10000" hide-details></v-slider>
      </v-flex>
     
      <v-flex xs1>
        <v-speed-dial hover>
          <v-btn slot="activator" fab hover>
            <v-icon>volume_up</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
          <div class="slider-wrapper">
            <input type="range" min="0" max="10"  @input="volumeChange" v-model="volume" step="1">
          </div>
        </v-speed-dial>
      </v-flex>
    <audio controls id="dc-audio"></audio>
      
    </v-layout>
  </v-container>
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
      volume: 10
    }
  },
  computed: {
    currentImage: function () {
      return this.$store.getters.index > -1
      ? this.$store.getters.current_Playlist[this.$store.getters.index].posterLarge
      : '/static/img/loading.gif'
    }
  },
  methods: {
    volumeChange: function (wasd) {
      this.eAudio.volume = this.volume / 10
    },
    changePos: function (pos) {
      var time = Math.floor(Math.floor(pos / 100) * (this.eAudio.duration / 100))
      if (!isNaN(time)) {
        this.eAudio.currentTime = time
      }
    },
    togglePlay: function () {
      if (this.eAudio.paused) {
        this.eAudio.play()
      } else {
        this.eAudio.pause()
      }
    },
    updated: function () {
      this.progress = Math.floor(((100 / this.eAudio.duration) * this.eAudio.currentTime) * 100)
    },
    playing: function (wasd) {
      this.play_arrow = 'pause'
      this.bLoading = false
    },
    paused: function () {
      this.play_arrow = 'play_arrow'
    },
    loading: function () {
      this.bLoading = true
    },
    next: function () {
      this.$DCPlayer.next()
    },
    previous: function () {
      this.$DCPlayer.previous()
    }
  },
  mounted: function () {
    this.$DCPlayer.eAudio = document.getElementById('dc-audio') // A little bit naughty to set the value like this =\
    this.eAudio = document.getElementById('dc-audio')
    this.eAudio.addEventListener('timeupdate', this.updated)
    this.eAudio.addEventListener('playing', this.playing)
    this.eAudio.addEventListener('pause', this.paused)
    this.eAudio.addEventListener('loadstart', this.loading)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  height: 50px
}

/* #progress {
  height: 50px;
} */

#left {
  margin-top: 7px;
  float: left;
}

#middle {
  margin-left: 230px;
  margin-right: 100px;
}

#right {
  float: right;
}


</style>
