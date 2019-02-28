<template>
  <v-layout 
    v-show="ytUseVideo && isYT" 
    row 
    wrap 
    class="pb-5 ma-0 pa-0"
  >
    <!-- VIDEO -->
    <v-flex xs12>
      <div class="video-wrapper">
        <div id="player"/>
      </div>
    </v-flex>
    <v-flex 
      v-if="ytUseVideo && isYT" 
      dFlex 
      xs12
    >
      <v-layout 
        id="dc-padding" 
        row 
        wrap
      >
        <!-- SONG TITLE -->
        <v-flex 
          xs12 
          class="mt-2"
        >
          <div class="title fwl text-xs-left">{{ song.title }}</div >
        </v-flex>
        <!-- BUTTONS AND UPLOADED DATE/VIEWS AND DIVIDER -->
        <v-flex 
          :style="stageBorderStyle" 
          xs12 
          class="stage-btns"
        >
          <!-- FLOAT LEFT -->
          <div class="fl-l blue-grey--text text--lighten-1 mt-3">
            {{ iViews }} • {{ $DCAPI.calcDate('', song.uploaded) }}
          </div>
          <!-- FLOAT RIGHT -->
          <div class="fl-r">
            <!-- LINK -->
            <!-- <v-btn :color="btnCol" @click="($UTILS.copyToClipboard(song.mp32), btnFeedback())" icon>
              <v-icon>link</v-icon>
            </v-btn> -->
            <!-- CLOSED CAPTIONS -->
            <v-tooltip 
              v-if="$vuetify.breakpoint.lgAndUp" 
              top
            >
              <v-btn 
                slot="activator" 
                icon 
                @click="toggleCC"
              >
                <v-icon :color="cc ? 'white' : 'grey'">subtitles</v-icon>
              </v-btn>
              <span>Subtitles</span>
            </v-tooltip>

            <!-- YT BUTTON -->
            <youtube-button slot="activator" />
            <!-- SHARE BUTTON -->
            <share-button 
              :song="song" 
            />
            <!-- DOWNLOAD BUTTON -->
            <download-button :links="[song]"/>
            <!-- ADD TO PLAYLIST -->
            <add-to-playlist 
              v-if="$store.getters.auth_state" 
              :song="song"
            />
            <!-- WIDE SCREEN BUTTON -->
            <v-tooltip 
              v-if="$vuetify.breakpoint.lgAndUp" 
              top
            >
              <v-btn 
                slot="activator" 
                icon 
                @click="widescreen"
              >
                <v-icon>{{ bWide ? 'crop_3_2' :'crop_16_9' }}</v-icon>
              </v-btn>
              <span>{{ bWide ? 'Wide' :'Narrow' }}</span>
            </v-tooltip>
            <!-- FULLSCREEN BUTTON -->
            <v-tooltip 
              top
            >
              <v-btn 
                slot="activator" 
                icon 
                @click="fullscreen"
              >
                <v-icon>fullscreen</v-icon>
              </v-btn>
              <span>Fullscreen</span>
            </v-tooltip>
          </div>
        </v-flex>
        <!-- ARTIST PICTURE -->
        <artist-mini 
          :artistID="song.artistID" 
          :source="song.source" 
          :artist="song.artist" 
          :key="song.artistID"
        />
        <!-- ARTIST NAME + SONG DESCRIPTION -->
        <v-flex 
          xs12 
          lg7 
          class="title fwl text-xs-left song-meta mt-3"
        >
          {{ song.artist }}
          <!-- DESCRIPTION -->
          <v-flex xs12>
            <span 
              class="subheading fwl wordbreak preline" 
              v-html="timeToSeconds(description)"
            />
          </v-flex>

          <v-tabs
            ref="tabs"
            v-model="tab"
            class="mt-3"
          >
            <v-tabs-slider color="primary"/>
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
              <songComments 
                :trackID="song.trackID" 
                :source="song.source"
              />
            </v-tab-item>
            <v-tab-item>
              <!-- LYRICS -->
              <lyrics 
                :getEm="getLyrics" 
                :title="song.title" 
                :artist="song.artist"
              />
            </v-tab-item>
            <v-tab-item v-if="$vuetify.breakpoint.mdAndDown">
              <!-- RELATED -->
              <related/>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
        
        <!-- RELATED -->
        <related v-if="$vuetify.breakpoint.lgAndUp"/>
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
  beforeCreate () {
    var tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    var fst = document.getElementsByTagName('script')[0]
    fst.parentNode.insertBefore(tag, fst)
  },
  watch: {
  trackID: {
      immediate: true,
      handler: 'trackChanged'
    }
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
      song: 'current_song',
      index: 'index',
      hash: 'hash',
      trackID: 'current_trackID',
      ytUseVideo: 'ytUseVideo',
      ytObject: 'ytObject',
      drawLeft: 'drawLeft',
      showVideo: 'showVideo',
      drawRight: 'drawRight',
      isYT: 'isYT'
    }),
    getLyrics () {
      return this.tab === 1
    },
    stageBorderStyle () {
      return {
        'border-bottom': '1px solid ' + this.$vuetify.theme.primary,
      }
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
      this.bWide = !(this.drawLeft || this.drawRight)
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
      this.$DCAPI.getSongPlays(this.trackID, this.song.source, (data) => {
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
      this.$DCAPI.getSongDescription(this.trackID, this.song.source, (resp) => {
        this.description = resp.items[0].snippet.description.trim()
      })
    },
    ytBind () {
      // Wait for YouTube script to load
      if ((typeof YT === 'undefined') || !YT || !YT.Player) {
        setTimeout(this.ytBind, 100)
        return
      }
      if (!this.ytUseVideo) {
        return
      }
      
      this.$DCPlayer.pause()
      if (!this.yt) {
        this.yt = new YT.Player('player', {
          width: '100%',
          videoId: this.trackID,
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
      this.ytObject.playVideo()
      window.dcYT = this.yt
    },
    ytChanged (state) {
      // this.$store.commit('ytObject', state.target)
      this.$store.commit('ytState', state.data)
      // if playing set duration amd interval to set current time.
      if (state.data === 1) {
        this.$store.commit('ytDuration', this.ytObject.getDuration())
        this.interval = setInterval(() => {
          this.$store.commit('ytCurrentTime', this.ytObject.getCurrentTime())
        }, 500)
      // ENDED
      } else if (state.data === 0) {
        clearInterval(this.interval)
        this.$store.commit('ytCurrentTime', 0)
        this.$DCPlayer.next()
        this.$DCFB.historyPush(this.song)
      } else { // if (state.data === 5 || state.data === 3 || state.data === 2) {
        clearInterval(this.interval)
      }
    },
    trackChanged () {
      if (this.isYT && this.ytUseVideo) {
        // if (this.$route.name === 'auto' && !this.$vuetify.breakpoint.xs) {
        //   // this.$router.push({name: 'stage'})
        //   this.$router.push({name: 'auto', params: { artist: this.$store.getters.current_song.artist,  trackID: this.$store.getters.current_song.trackID,  source: this.$store.getters.current_song.source }})
        // }

        // console.log('changing song')
        if (!this.ytObject.hasOwnProperty('loadVideoById')) {
          this.ytBind()
        } else {
          this.ytObject.loadVideoById(this.trackID)
        }
        this.getPlays()
        this.getDesc()
        this.$DCPlayer.pause()
      }
    }
  },
  // mounted () {
  //   if (this.$store.getters.isYT) {
  //     // console.log('vid mounted')
  //     this.ytBind()
  //     this.getDesc()
  //     this.getPlays()
  //   }
  // }
}
</script>

<style>
@media only screen and (min-width: 600px){
  .song-meta {  
    padding: 0px 20px;
  }
}

.video-wrapper {position: relative; padding-bottom: 38%; /* 56.25% 16:9 */  padding-top: 25px;}
.video-wrapper iframe {position: absolute; top: 0; left: 0; width: 100%; height: 100%;}


.video-wrapper {
  background-color: black;
  /* height: 90%; */
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
