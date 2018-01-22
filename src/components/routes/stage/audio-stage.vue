<template>
  <v-layout row wrap v-show="!show" class="pb-5">
    <!-- Image -->
    <v-flex xs12 id="img-bg" v-show="!($store.getters.ytUseVideo && $store.getters.isYT)" @click="$DCPlayer.togglePlay()">
      <img :src="song.posterLarge" id="stg-pstr">
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
            <!-- yt button -->
            <youtube-button></youtube-button>
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
        <!-- Artist Picture -->
        <artist-info-mini :artistID="song.artistID" :source="song.source" :artist="song.artist" :key="song.artistID"></artist-info-mini>
        <!-- Artist name + Song description -->
        <v-flex xs12 lg7 class="subheading text-xs-left pl-3 mt-3">
          <strong>{{ song.artist }}</strong>
          <!-- Description -->
          <v-flex>
            <span class="subheading" style="white-space: pre-line;" v-html="timeToSeconds(_description)"></span>
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
import youtubeVBtn from '@/components/misc/toggle-video-button'
  /* eslint-disable */
export default {
  name: 'dc-stage',
  components: {
    'artist-info-mini': artistInfo,
    'related': related,
    'youtube-button': youtubeVBtn
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
      } else {
        this._description = this.song.description
      }
    }
  },
  updated () {
    this.getDesc()
  }
}
</script>

<style>
.stg-pstr{
  max-width: 100%;
  height: auto;
}
.desc{
  word-break: break-all;
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
.slider-wrapper{
  float: right;
  /* display: inherit; */
  /* width: '100%'; */
  /* height: 70px; */
  /* padding: 0; */
}
</style>
