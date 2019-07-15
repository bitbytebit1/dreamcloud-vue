<template>
  <v-layout 
    v-show="bShowStage || (!bShowStage && show_pop && $vuetify.breakpoint.smAndUp)" 
    row 
    wrap 
    class="pb-5 ma-0 pa-0"
  >
    <!-- VIDEO -->
    <v-flex 
      v-show="ytUseVideo && isYT" 
      xs12
    >
      <div :class="videoClass">
        <div id="player"/>
      </div>
    </v-flex>
    <!-- OR POSTER -->
    <v-flex 
      v-show="!(ytUseVideo && isYT) && !show_pop" 
      class="nosel"
      xs12 
      @click="$DCPlayer.togglePlay()"
      @contextmenu="$emit('conmen', [$event, [song]])"
    >
      <div class="pstr-wrapper">
        <div 
          id="pstr" 
          :style="{ 'background': 'center center no-repeat' , 'background-image' : 'url(' + song.posterLarge + ')'}" 
          :key="song.poster"
        />
      </div>
    </v-flex>
    <v-flex 
      v-show="bShowStage" 
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


            <!-- YT BUTTON -->
            <youtube-button slot="activator" />

            <!-- Open in a new tab -->
            <new-tab
              :song="song"
            />
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
            <!-- SHARE BUTTON -->
            <share-button 
              :song="song" 
            />
            <!-- DOWNLOAD BUTTON -->
            <download-button :links="[song]"/>
            <!-- ADD TO PLAYLIST -->
            <add-to-playlist 
              :song="song"
            />
            <!-- WIDE SCREEN BUTTON -->
            <!-- <v-tooltip 
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
            </v-tooltip> -->
            <!-- OPEN MINI PLAYER BUTTON -->
            <v-tooltip 
              v-if="$vuetify.breakpoint.lgAndUp" 
              top
            >
              <v-btn 
                slot="activator" 
                icon 
                @click="$store.commit('show_pop', true)"
              >
                <v-icon>picture_in_picture_alt</v-icon>
              </v-btn>
              <span>Mini player</span>
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
        <v-flex 
          xs12 
          lg8
          class="text-xs-left mt-3 song-meta"
        >
          <v-layout 
            row 
            wrap
          >
            <!-- <div class="text-xs-left song-meta mt-3 wordbreak"> -->
            <!-- </div> -->
            <!-- DESCRIPTION -->
            <!-- ARTIST PICTURE -->
            <artist-mini 
              :artistID="song.artistID" 
              :source="song.source" 
              :artist="song.artist" 
              :key="song.artistID"
              class="mr-3"
            />
            <v-flex xs10>
              <div class="subheading">{{ song.artist }}</div>
              <div 
                class="subheading fwl wordbreak preline" 
                v-html="timeToSeconds(description)"
              />
            </v-flex>
          </v-layout>
          <v-tabs
            ref="tabs"
            v-model="tab"
            class="mt-3"
          >
            <v-tabs-slider color="primary"/>
            <v-tab >
              Playlist
            </v-tab>
            <v-tab >
              Comments
            </v-tab>
            <v-tab>
              Lyrics
            </v-tab>
            <v-tab v-if="$vuetify.breakpoint.mdAndDown">
              Related
            </v-tab>
          </v-tabs>
          
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <!-- CURRENT PLAYLIST -->
              <playlist 
                :songs="current_playlist" 
                :rows-per-page="-1"
                @conmen="$emit('conmen', $event)"
              />
            </v-tab-item>
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
                :title="song.title" 
                :artist="song.artist"
              />
            </v-tab-item>
            <v-tab-item v-if="$vuetify.breakpoint.mdAndDown">
              <!-- RELATED -->
              <related 
                @conmen="$emit('conmen', $event)"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
        
        <!-- RELATED -->
        <relatedd 
          v-if="$vuetify.breakpoint.lgAndUp" 
          @conmen="$emit('conmen', $event)"
        />
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import newTab from '@/components/buttons/open-new-tab'

import related from '@/router/related/related'
import relatedd from '@/components/stage/meta/related'
import artistMini from '@/components/stage/meta/artist-mini'
import youtubeVBtn from '@/components/stage/meta/toggle-video-button'
import songComments from '@/components/stage/meta/comments'
import lyrics from '@/components/stage/meta/lyrics'
import addToPlaylist from '@/components/buttons/add-to-playlist.vue'
import shareButton from '@/components/buttons/share-button'
import downloadButton from '@/components/buttons/download-button'
import current from '@/components/stage/meta/current'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

/* eslint-disable */
export default {
  name: 'VideoStage',
  beforeCreate () {
    var tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    var fst = document.getElementsByTagName('script')[0]
    fst.parentNode.insertBefore(tag, fst)
  },
  watch: {
    trackID: {
      handler: function(id) {
        if(id && this.song){
          this.getPlays()
          this.getDesc()
          // what does this do? updates the router with the proper route.
          if (this.$route.name === 'auto') {
            this.$router.replace({name: 'auto', params: { artist: this.song.artist,  trackID: this.song.trackID,  source: this.song.source }})
          }
          if (this.isYT && this.ytUseVideo) {
            if (!this.ytObject.hasOwnProperty('loadVideoById')) {
              this.ytBind()
            } else {
              this.ytObject.loadVideoById(this.trackID)
              // window.dcYT.loadVideoById(this.trackID)
            }
            this.$DCPlayer.eAudio.pause()
          }
        }
      }
    }
  },
  components: {
    'newTab': newTab,
    'current': current,
    'artist-mini': artistMini,
    'youtube-button': youtubeVBtn,
    'related': related,
    'relatedd': relatedd,
    'lyrics': lyrics,
    'songComments': songComments,
    'add-to-playlist': addToPlaylist,
    'download-button': downloadButton,
    'share-button': shareButton
  },
  computed: {
    ...mapState({
      bShowStage: state => state.user.bShowStage,
      // drawLeft: state => state.user.drawLeft,
      // drawRight: state => state.user.drawRight,
      current_playlist: state => state.player.current_playlist,
      show_pop_list: state => state.player.show_pop_list,
      show_pop: state => state.player.show_pop,
    }),
    ...mapGetters({
      song: 'current_song',
      trackID: 'current_trackID',
      ytUseVideo: 'ytUseVideo',
      ytObject: 'ytObject',
      showVideo: 'showVideo',
      isYT: 'isYT'
    }),
    videoClass () {
      return {'video-wrapper': !this.show_pop, 'pop-wrapper' : this.show_pop, 'pop-hi': this.show_pop && this.show_pop_list}
    },
    stageBorderStyle () {
      return {
        'border-bottom': '1px solid ' + this.$vuetify.theme.primary,
      }
    }
  },
  data () {
    return {
      tab: 1,
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
      if (this.ytUseVideo && this.isYT) {
        return (value.replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g,
                              `<span class="underline pointer" onClick="window.dcYT.seekTo('$&'.split(':').reduce((acc,time) => (60 * acc) + +time));">$&</span>`))
      } else {
        return (value.replace(/\n/g, '<br>').replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g, 
                                                     `<span class="underline" onClick="document.getElementById('dc-audio').currentTime = '$&'.split(':').reduce((acc,time) => (60 * acc) + +time)">$&</span>`))
      }
    },
    fullscreen () {
      if (this.ytUseVideo && this.isYT) {
        this.$UTILS.toggleFullscreen('player')
      } else {
        this.$UTILS.toggleFullscreen('pstr')
      }

    },
    getDesc () {
      if (this.isYT) {
        setTimeout(() => {
          this.$DCAPI.getSongDescription(this.trackID, this.song.source, (resp) => {
            this.description = resp.items[0].snippet.description.trim()
          })
        }, 350);
      } else {
        this.description = this.song.description
      }
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
          height: '196',
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

.pstr-wrapper {position: relative; padding-bottom: 38%; /* 16:9 */  padding-top: 25px;}
.pstr-wrapper #pstr {position: absolute; top: 0; left: 0; width: 100%; height: 100%;}


.pstr-wrapper {
  background-color: black;
  /* height: 90%; */
}

@media only screen and (min-width: 600px){
  .song-meta {  
    padding: 0px 20px;
  }
}
.pop-wrapper{
  position: fixed;
  bottom: 134px;
  right: 18px;
  width: 350px;
  height: 196px;
  z-index: 4;
}
.pop-hi{
  bottom: 254px  !important;
}
.video-wrapper {position: relative; padding-bottom: 38%; /* 56.25% 16:9 */  padding-top: 25px;}
.pop-wrapper iframe, .video-wrapper iframe {position: absolute; top: 0; left: 0; width: 100%; height: 100%;}


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
