<template>
  <v-layout row wrap v-show="!show" class="pb-5">
    <!-- Image -->
    <v-flex xs12 id="img-bg" v-show="!($store.getters.ytUseVideo && $store.getters.isYT)" @click="$DCPlayer.togglePlay()">
      <!-- <explode></explode> -->
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
            {{iViews}}
            {{$DCAPI.calcDate('', song.uploaded)}}
          </div>
          <div class="fl-r">
            <!-- fullscreen button -->
            <v-btn @click="fullscreen" icon>
              <v-icon>fullscreen</v-icon>
            </v-btn>
            <!-- yt button -->
            <youtube-button></youtube-button>
            <!-- share button -->
            <share-button :song="song" :url="'https://dreamcloud.netlify.com/#/t/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.trackID"></share-button>
            <!-- download button -->
            <download-button :links="[song]"></download-button>
            <!-- add to playlist -->
            <add-to-playlist v-if="$store.getters.auth_state" :song="song"></add-to-playlist>

          </div>
        </v-flex> 
        <!-- Artist Picture -->
        <artist-mini :artistID="song.artistID" :source="song.source" :artist="song.artist" :key="song.artistID"></artist-mini>
        <!-- Artist name + Song description -->
        <v-flex xs12 lg7 class="subheading text-xs-left pl-3 mt-3 wordbreak">
          <strong>{{ song.artist }}</strong>
          <!-- DESCRIPTION -->
          <v-flex>
            <span class="subheading wordbreak preline" v-html="timeToSeconds(_description)"></span>
          </v-flex>
          <!-- COMMENTS -->
          <songComments :trackID="song.trackID" :source="song.source"></songComments>
        </v-flex>
        <!-- RELATED -->
        <related></related>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import related from '@/components/main/stage/stage-related'
import artistMini from '@/components/misc/artist-mini'
import youtubeVBtn from '@/components/misc/toggle-video-button'
import songComments from '@/components/main/stage/song-comments'
import addToPlaylist from '@/components/misc/add-to-playlist.vue'
import shareButton from '@/components/misc/share-button'
import downloadButton from '@/components/misc/download-button'

// import explode from '@/components/misc/explode'
// /* eslint-disable */
export default {
  name: 'dc-stage',
  components: {
    // 'explode': explode,
    'songComments': songComments,
    'artist-mini': artistMini,
    'related': related,
    'youtube-button': youtubeVBtn,
    'add-to-playlist': addToPlaylist,
    'download-button': downloadButton,
    'share-button': shareButton
  },
  data () {
    return {
      description: '',
      iViews: ''
    }
  },
  computed: {
    _description: {
      get () {
        return this.description ? this.description : this.song.description
      },
      set (newVar) {
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
    fullscreen () {
      this.$UTILS.toggleFullscreen('stg-pstr')
    },
    getPlays () {
      this.$DCAPI.getSongPlays(this.song.trackID, this.song.source, (data) => {
        this.iViews = this.makeFriendly(data)
      })
    },
    intlFormat (num) {
      return new Intl.NumberFormat().format(Math.round(num * 10) / 10)
    },
    makeFriendly (num) {
      if (num >= 1000000) {
        return this.intlFormat(num / 1000000) + 'M views'
      }
      if (num >= 1000) {
        return this.intlFormat(num / 1000) + 'k views'
      }
      return this.intlFormat(num) + ' views'
    },
    timeToSeconds (value) {
      if (!value) {
        return ''
      }
      return (value.replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g,
        `<span class="underline pointer" onClick="document.getElementById('dc-audio').currentTime = '$&'.split(':').reduce((acc,time) => (60 * acc) + +time)">$&</span>`))
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
  created () {
    this.getDesc()
    this.getPlays()
  },
  updated () {
    this.getDesc()
    this.getPlays()
  }
}
</script>

<style>
@media only screen and (max-width: 599px){
  #stg-pstr {
  width: 100% !important;
  }
}
.preline{
  white-space: pre-line;
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
  /* make div not selectable */
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  user-select: none;
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
