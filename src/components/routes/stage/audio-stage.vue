<template>
  <v-layout row wrap v-show="!show" class="pb-5">
    <!-- Image -->
    <v-flex xs12 id="img-bg" v-show="!($store.getters.ytUseVideo && $store.getters.isYT)" @click="$DCPlayer.togglePlay()">
      <img :src="song.posterLarge" id="stg-pstr">
    </v-flex>
    <v-flex d-flex xs12>
      <v-layout row wrap id="dc-padding">
        <!-- Title -->
        <v-flex xs12 class="mt-2">
          <div class="title text-xs-left">{{$store.getters.current_song.title}}</div >
        </v-flex> 

        <!-- Buttons and uploaded -->
        <v-flex xs12 class="stage-btns">
          <div class="fl-l blue-grey--text text--lighten-1">
            {{$DCAPI.calcDate('', song.uploaded)}}
          </div>
          <div class="fl-r">
            <v-speed-dial class="stage-btn" direction="left" open-on-hover>
              <v-btn slot="activator" class="ma-0 pa-0" icon small hover fab>
                <v-icon>fullscreen</v-icon>
              </v-btn>
              <div class="slider-wrapper">
                <v-btn icon fab>
                  <v-icon small>fullscreen</v-icon>
                </v-btn>
                <v-btn icon fab>
                  <v-icon>fullscreen</v-icon>
                </v-btn>
                <v-btn icon fab>
                  <v-icon large>fullscreen</v-icon>
                </v-btn>
              </div>
            </v-speed-dial>

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
          </div>
        </v-flex>
        <artist-info-mini :artistID="song.artistID" :source="song.source" :artist="song.artist" :key="song.artistID"></artist-info-mini>
        <v-flex xs7 class="subheading text-xs-left pl-3 mt-3">
          <!-- Artist name -->
          <strong>{{ song.artist }}</strong>
          <!-- Description -->
          <v-flex >
            <span style="subheading white-space: pre-line;" v-html="timeToSeconds(_description)"></span>
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
import related from '@/components/routes/stage/stage-related'
  /* eslint-disable */
export default {
  name: 'dc-stage',
  components: {
    'artist-info-mini': artistInfo,
    'related': related
  },
  data () {
    return {
      description: ''
    }
  },
  computed: {
    _description: {
      get () {
        return this.description ? this.description : this.song.description
      },
      set (newVar){
        this.description = newVar
      }
    },
    show () {
      return this.ytUseVideo && this.$store.getters.isYT
    },
    ytUseVideo () {
      return this.$store.getters.ytUseVideo
    },
    song () {
      return this.$store.getters.current_song
    },
    current_trackID () {
      return this.$store.getters.current_trackID ? this.$store.getters.current_trackID : 'player'
    }
  },
  methods: {
    timeToSeconds (value) {
      if (!value) {
        return ''
      }
      return (value.replace(/\n/g, '<br>').replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g, `
        <span class="underline" onClick="document.getElementById('dc-audio').currentTime = '$&'.split(':').reduce((acc,time) => (60 * acc) + +time)">$&</span>`))
    },
    getDesc () {
      if (this.$store.getters.isYT) {
        this.$DCAPI.getSongDescription(this.current_trackID, this.song.source, (resp) => {
          this.description = resp.items[0].snippet.description.trim()
        })
      }
    }
  },
  updated () {
    this.getDesc()
  }
}
</script>

<style>
#img-bg{
  background-color:black;
}
#stg-pstr{
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
