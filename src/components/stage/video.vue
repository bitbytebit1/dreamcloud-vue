<template>
  <v-layout row wrap v-show="$store.getters.ytUseVideo && $store.getters.isYT" class="pb-5 ma-0 pa-0">
    <!-- VIDEO -->
    <v-flex xs12>
      <div class="video-wrapper">
        <div id="player"></div>
      </div>
    </v-flex>
    <v-flex d-flex xs12 v-if="$store.getters.ytUseVideo && $store.getters.isYT">
      <v-layout row wrap id="dc-padding">
        <!-- SONG TITLE -->
        <v-flex xs12 class="mt-2">
          <div class="title fwl text-xs-left">{{$store.getters.current_song.title}}</div >
        </v-flex>
        <!-- BUTTONS AND UPLOADED DATE/VIEWS AND DIVIDER -->
        <v-flex xs12 class="stage-btns" :style="stageBorderStyle">
          <div class="fl-l blue-grey--text text--lighten-1">
            {{iViews}}
            {{$DCAPI.calcDate('', song.uploaded)}}
          </div>
          <div class="fl-r">
            <!-- LINK -->
            <v-btn :color="btnCol" @click="($UTILS.copyToClipboard(song.mp32), btnFeedback())" icon>
              <v-icon>link</v-icon>
            </v-btn>
            <!-- CLOSED CAPTIONS -->
            <v-btn icon @click="toggleCC">
              <v-icon :color="cc ? 'white' : 'grey'">subtitles</v-icon>
            </v-btn>
            <!-- YT BUTTON -->
            <youtube-button></youtube-button>
            <!-- SHARE BUTTON -->
            <share-button :song="song" :url="'https://dreamcloud.netlify.com/#/t/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.trackID"></share-button>
            <!-- DOWNLOAD BUTTON -->
            <download-button :links="[song]"></download-button>
            <!-- ADD TO PLAYLIST -->
            <add-to-playlist v-if="$store.getters.auth_state" :song="song"></add-to-playlist>
            <!-- WIDE SCREEN BUTTON -->
            <v-btn @click="widescreen" icon v-if="$vuetify.breakpoint.lgAndUp">
              <v-icon>{{bWide ? 'crop_3_2' :'crop_16_9'}}</v-icon>
            </v-btn>
            <!-- FULLSCREEN BUTTON -->
            <v-btn @click="fullscreen" icon>
              <v-icon>fullscreen</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <!-- ARTIST PICTURE -->
        <artist-mini :artistID="song.artistID" :source="song.source" :artist="song.artist" :key="song.artistID"></artist-mini>
        <!-- ARTIST NAME + SONG DESCRIPTION -->
        <v-flex xs12 lg7 class="title fwl text-xs-left song-meta mt-3">
          {{ song.artist }}
          <!-- DESCRIPTION -->
          <v-flex xs12>
            <span class="subheading fwl wordbreak preline" v-html="timeToSeconds(description)"></span>
          </v-flex>

          <v-tabs
            class=""
            v-model="tab"
            ref="tabs"
          >
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab >
              Comments
            </v-tab>
            <v-tab>
              Lyrics
            </v-tab>
            <v-tab v-if="$vuetify.breakpoint.xsOnly">
              Related
            </v-tab>
          </v-tabs>
          
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <!-- COMMENTS -->
              <songComments :trackID="song.trackID" :source="song.source"></songComments>
            </v-tab-item>
            <v-tab-item>
              <!-- LYRICS -->
              <lyrics :getEm="getLyrics" :title="song.title" :artist="song.artist"></lyrics>
            </v-tab-item>
            <v-tab-item v-if="$vuetify.breakpoint.mdAndDown">
              <!-- RELATED -->
              <related></related>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
        
        <!-- RELATED -->
        <related v-if="$vuetify.breakpoint.lgAndUp"></related>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>

import related from '@/components/stage/meta/related'
import artistMini from '@/components/stage/meta/artist-mini'
import youtubeVBtn from '@/components/stage/meta/toggle-video-button'
import songComments from '@/components/stage/meta/comments'
import lyrics from '@/components/stage/meta/lyrics'
import addToPlaylist from '@/components/buttons/add-to-playlist.vue'
import shareButton from '@/components/buttons/share-button'
import downloadButton from '@/components/buttons/download-button'

import { mapGetters } from 'vuex'

/* eslint-disable */
export default {
  name: 'video-stage',
  created () {
    var tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    var fst = document.getElementsByTagName('script')[0]
    fst.parentNode.insertBefore(tag, fst)
  },
  components: {
    'artist-mini': artistMini,
    'youtube-button': youtubeVBtn,
    'related': related,
    'lyrics': lyrics,
    'songComments': songComments,
    'add-to-playlist': addToPlaylist,
    'download-button': downloadButton,
    'share-button': shareButton
  },
  computed: {
    ...mapGetters({
      current_song: 'current_song',
      index: 'index',
      hash: 'hash',
      current_song: 'current_song'
    }),
    getLyrics () {
      return this.tab === 1
    },
    stageBorderStyle () {
      return {
        'border-bottom': '1px solid ' + this.$vuetify.theme.primary,
      }
    },
    song () {
      return this.$store.getters.current_song
    },
    showClass () {
      return { 'hidden': this.$store.getters.ytShowVideo }
      // return this.$store.getters.ytShowVideo
    },
    current_trackID () {
      return this.$store.getters.current_trackID ? this.$store.getters.current_trackID : 'player'
    }
  },
  data () {
    return {
      tab: 0,
      bWide: false,
      btnCol: '',
      iViews: '', 
      cc: false,
      yt: '',
      interval: '',
      description: '',
      currentid: ''
    }
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    widescreen () {
      this.bWide = !(this.$store.getters.drawLeft || this.$store.getters.drawRight)
      this.$store.commit('drawRight', this.bWide)
      this.$store.commit('drawLeft', this.bWide)
    },
    btnFeedback () {
      this.btnCol = 'primary'
      setTimeout(() => {
        this.btnCol = ''
      }, 2000)
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
    toggleCC () {
      this.cc = !this.cc
      if (this.cc) {
        this.yt.loadModule('captions')
      } else {
        this.yt.unloadModule('captions')
      }
    },
    timeToSeconds (value) {
      if (!value) {
        return ''
      }
      return (value.replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g,
        `<span class="underline pointer" onClick="window.dcYT.seekTo('$&'.split(':').reduce((acc,time) => (60 * acc) + +time));">$&</span>`))
    },
    fullscreen () {
      this.$UTILS.toggleFullscreen('player')
    },
    getDesc () {
      this.$DCAPI.getSongDescription(this.current_trackID, this.song.source, (resp) => {
        this.description = resp.items[0].snippet.description.trim()
      })
    },
    ytBind () {
      // Wait for YouTube script to load
      if ((typeof YT === 'undefined') || !YT || !YT.Player) {
        setTimeout(this.ytBind, 100)
        return
      }
      if (!this.$store.getters.ytUseVideo) {
        return
      }
      
      this.$DCPlayer.pause()
      if (!this.yt) {
        this.yt = new YT.Player('player', {
          width: '100%',
          videoId: this.current_trackID,
          
          enablejsapi: 1,
          playerVars: {
            autoplay: 1,        // Auto-play the video on load
            controls: 0,        // Show pause/play buttons in player
            color: 'primary',
            showinfo: 0,        // Hide the video title
            modestbranding: 1,  // Hide the Youtube Logo
            fs: 0,              // Hide the full screen button
            cc_load_policy: 1,  // Hide closed captions
            iv_load_policy: 3,  // Hide the Video Annotations
            rel: 0,             // Remove Related Videos
            autohide: 1         // Hide video controls when playing
          },
          events: {
            'onReady': this.ytReady,
            'onStateChange': this.ytChanged,
            'onApiChange': this.ytOnApiChange
          }
        })
      }
    },
    ytOnApiChange () {
      // console.log(this.yt.getOptions())
      // console.log(this.yt.getOptions('captions'))
    },
    ytReady (state) {
      this.$store.commit('ytObject', state.target)
      // this.$store.commit('ytState', state.data)
      this.$store.getters.ytObject.playVideo()
      window.dcYT = this.yt
    },
    ytChanged (state) {
      // this.$store.commit('ytObject', state.target)
      this.$store.commit('ytState', state.data)
      // if playing set duration amd interval to set current time.
      if (state.data === 1) {
        this.$store.commit('ytDuration', this.$store.getters.ytObject.getDuration())
        this.interval = setInterval(() => {
          this.$store.commit('ytCurrentTime', this.$store.getters.ytObject.getCurrentTime())
        }, 250)
      } else if (state.data === 0) {
        clearInterval(this.interval)
        this.$store.commit('ytCurrentTime', 0)
        this.$DCPlayer.next()
        this.$DCFB.historyPush(this.$store.getters.current_song)
      } else { // if (state.data === 5 || state.data === 3 || state.data === 2) {
        clearInterval(this.interval)
      }
    }
  },
  mounted () {
    if (this.$store.getters.isYT) {
      // console.log('vid mounted')
      this.ytBind()
      this.getDesc()
      this.getPlays()
    }
  },
  updated () {
    // if new song
    if (this.$store.getters.isYT && this.currentID !== this.current_trackID && this.$store.getters.ytUseVideo && !this.$store.getters.ytSwitchTime) {
      // console.log('vid updated')
      this.currentID = this.current_trackID
      // if not already attached to iframe
      if (!this.$store.getters.ytObject.hasOwnProperty('loadVideoById')) {
        this.ytBind()
      } else {
        this.$store.getters.ytObject.loadVideoById(this.current_trackID)
      }
      this.getPlays()
      this.getDesc()
      this.$DCPlayer.pause()
    } else {
      // This stores the last trackID to ensure we don't load the same video twice by accident.
      // It's tied to the div above, there's a much better way to do this.
      this.currentID = this.current_trackID
    }
  }
}
</script>

<style>
@media only screen and (min-width: 600px){
  .song-meta {  
    padding: 0px 20px;
  }
}

.video-wrapper {position: relative; padding-bottom: 40%; /* 56.25% 16:9 */  padding-top: 25px;}
.video-wrapper iframe {position: absolute; top: 0; left: 0; width: 100%; height: 100%;}


.video-wrapper {
  background-color: black;
  /* height: 90%; */
}

.fl-l{
  float: left;
  margin-top: 10px;
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
/* .slider-wrapper{ */
  /* display: inherit; */
  /* width: '100%'; */
  /* height: 70px; */
  /* padding: 0; */
/* } */
</style>
