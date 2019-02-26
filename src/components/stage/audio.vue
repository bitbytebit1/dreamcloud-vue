<template>
  <v-layout 
    v-show="!show" 
    row 
    wrap 
    class="pb-5"
  >
    <!-- IMAGE -->
    <v-flex 
      v-show="!($store.getters.ytUseVideo && $store.getters.isYT)" 
      class="nosel"
      xs12 
      @click="$DCPlayer.togglePlay()"
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
      v-if="!show" 
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
          <div class="title fwl text-xs-left">{{ $store.getters.current_song.title }}</div >
        </v-flex> 
        <!-- BUTTONS AND UPLOADED DATE/VIEWS AND DIVIDER -->
        <v-flex 
          :style="stageBorderStyle" 
          xs12 
          class="stage-btns"
        >
          <!-- FLOAT LEFT -->
          <div class="fl-l blue-grey--text text--lighten-1 mt-3">
            {{ iViews > -1 ? iViews + ' • ' : '' }}{{ $DCAPI.calcDate('', song.uploaded) }}
          </div>
          <!-- FLOAT RIGHT -->
          <div class="fl-r">
            <!-- LINK -->
            <!-- <v-btn :color="btnCol" @click="($UTILS.copyToClipboard(song.mp32), btnFeedback())" icon>
              <v-icon>link</v-icon>
            </v-btn> -->
            <!-- YT BUTTON -->
            <youtube-button/>
            <!-- SHARE BUTTON -->
            <share-button 
              :song="song" 
            />
            <!-- DOWNLOAD BUTTON -->
            <download-button :links="[song]"/>
            <!-- ADD TO PLAYLIST -->
            <add-to-playlist 
              v-if="auth_state" 
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
          class="title fwl text-xs-left song-meta mt-3 wordbreak"
        >
          {{ song.artist }}
          <!-- DESCRIPTION -->
          <v-flex>
            <span 
              class="subheading wordbreak fwl preline" 
              v-html="timeToSeconds(_description)"
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

// /* eslint-disable */
export default {
  name: 'DcStage',
  watch: {
    current_trackID: {
      immediate: true,
      handler: 'trackChanged'
    }
  },
  components: {
    // 'explode': explode,
    'songComments': songComments,
    'artist-mini': artistMini,
    'related': related,
    'lyrics': lyrics,
    'youtube-button': youtubeVBtn,
    'add-to-playlist': addToPlaylist,
    'download-button': downloadButton,
    'share-button': shareButton
  },
  data () {
    return {
      tab: 0,
      bWide: false,
      btnCol: '',
      description: '',
      iViews: ''
    }
  },
  computed: {
    ...mapGetters({
      song: 'current_song',
      current_trackID: 'current_trackID',
      ytUseVideo: 'ytUseVideo',
      auth_state: 'auth_state'
    }),
    getLyrics () {
      return this.tab === 1
    },
    _description: {
      get () {
        return this.description ? this.description : this.song.description
      },
      set (newVar) {
        this.description = newVar
      }
    },
    stageBorderStyle () {
      return {
        'border-bottom': '1px solid ' + this.$vuetify.theme.primary
      }
    },
    show () {
      return this.ytUseVideo && this.$store.getters.isYT
    }
  },
  methods: {
    trackChanged () {
      if (this.$route.name === 'auto' && !this.$vuetify.breakpoint.xs) {
        // this.$router.push({name: 'stage'})
        this.$router.push({name: 'auto', params: { artist: this.$store.getters.current_song.artist,  trackID: this.$store.getters.current_song.trackID,  source: this.$store.getters.current_song.source }})
      }
      this.getDesc()
      this.getPlays()
    },
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
    fullscreen () {
      this.$UTILS.toggleFullscreen('pstr')
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
  }
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

/* .stage-btns{ */
  /* height: 36px; */
  /* border-bottom: 1px solid teal; */
/* } */
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
