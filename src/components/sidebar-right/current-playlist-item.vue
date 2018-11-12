<template>
  <!-- v-show="!(index === 0 && $store.getters.bShowStage)" -->
  <v-flex 
    xs12 
    @click.stop="play"
  >
    <v-card>
      <!-- image -->
      <v-img
        :aspect-ratio="song.source === 'YouTube' ? 16/9 : '1'"
        :src="song.posterLarge"
        :lazy-src="song.posterLarge"
        class="fillPlace"
      >
        <v-layout
          slot="placeholder"
          fill-height
          align-center
          justify-center
          ma-0
        >
          <v-progress-circular 
            indeterminate 
            color="grey lighten-5"
          />
        </v-layout>
        <span 
          class="card-duration" 
          v-text="song.duration"
        />
      </v-img>

      <!-- song actions -->
      <v-card-actions 
        class="" 
        @click.stop
      >
        <v-layout 
          row 
          wrap
        >
          <v-flex xs12>
            {{ song.title }}
          </v-flex>
          <v-flex xs12>
            <router-link 
              :to="{name: 'artist', params: {source: song.source, artist: song.artist, artistID: song.artistID}}" 
              class="noDeco pointer artist"
            >
              {{ song.artist }}
            </router-link>
          </v-flex>
          <v-flex xs12>
            <!-- SHOW MORE -->
            <v-tooltip top>
              <v-btn 
                slot="activator" 
                :disabled="!desc" 
                icon 
                @click.stop.native="show = !show"
              >
                <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
              </v-btn>
              <span>Show description</span>
            </v-tooltip>
            <!-- share button -->
            <share-button 
              :song="song" 
              :url="'https://dreamcloud.netlify.com/#/t/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.trackID"
            />
            <!-- download button -->
            <download-button :links="[song]"/>
            <!-- add to playlist -->
            <add-to-playlist 
              v-if="$store.getters.auth_state" 
              :song="song"
            />
          </v-flex>
        </v-layout>

      </v-card-actions>
      

      <!-- lyrics -->
      <v-slide-y-transition v-if="show">
        <!-- description -->
        <div>
          <!-- <v-card-text>
            <lyrics v-if="!index" :title="song.title" :artist="song.artist"></lyrics>
          </v-card-text> -->
          <v-card-text 
            class="wordbreak" 
            @click.stop 
            v-html="ytTimeToSeconds(desc)"
          />
        </div>
        <!-- </transition> -->
      </v-slide-y-transition>
    </v-card>
  </v-flex>
</template>
<script>
import addToPlaylist from '@/components/buttons/add-to-playlist.vue'
import shareButton from '@/components/buttons/share-button'
import downloadButton from '@/components/buttons/download-button'
import lyrics from '@/components/stage/meta/lyrics'

export default {
  // props: ['song', 'index'],
  props: {
    song: {
      type: Object,
      default() {
        return []
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  name: 'CurrentPlaylistItem',
  components: {
    'add-to-playlist': addToPlaylist,
    'download-button': downloadButton,
    'lyrics': lyrics,
    'share-button': shareButton
  },
  data () {
    return {
      show: false,
      desc: this.song.description,
      youtubelink: `https://www.youtube.com/embed/${this.song.trackID}?autoplay=1&mute=1&controls=1&enablejsapi=1`,
      artistID: `#/a/${this.song.source}/${encodeURIComponent(this.song.artist)}/${this.song.artistID}`
    }
  },
  watch: {
    'show': 'ifShowGetDesc'
  },
  methods: {
    dcTimeToSeconds (value) {
      if (!value) {
        return ''
      }
      return (value.replace(/\n/g, '<br>').replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g, `
        <span class="underline pointer" onClick="document.getElementById('dc-audio').currentTime = '$&'.split(':').reduce((acc,time) => (60 * acc) + +time)">$&</span>`))
    },
    ytTimeToSeconds (value) {
      if (!value) {
        return ''
      }
      return (value.replace(/\n/g, '<br>').replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g, `
        <span class="underline pointer" 
          onClick="
            event.stopPropagation();
            document.getElementById('dc-audio').currentTime = '$&'.split(':').reduce((acc,time) => (60 * acc) + +time);
          "
        >
          $&
        </span>`))
    },
    ifShowGetDesc (newVal) {
      if (newVal && this.song.source === 'YouTube') {
        this.getDesc()
      }
    },
    getDesc () {
      this.$DCAPI.getSongDescription(this.song.trackID, this.song.source, (resp) => {
        this.desc = resp.items[0].snippet.description
      })
    },
    play () {
      if (this.index === 0) {
        if (this.$store.getters.isYT && this.$store.getters.ytUseVideo) {
          // console.log(this.$store.getters.ytState)
          // alert('1')
          if (!this.$store.getters.ytIsPlaying) {
            this.$store.getters.ytObject.pauseVideo()
          } else { // else if (this.$store.getters.ytIsPaused) {
            this.$store.getters.ytObject.playVideo()
          }
        } else {
          this.$DCPlayer.togglePlay()
        }
      } else {
        this.$parent.$parent.play(this.index + this.$store.getters.index)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.width279{
  min-width: 279px;
}
.crt-ttl{
  width: 100%;
  text-align: center;
  text-shadow: 0px 0px 5px black;
  background: rgba(1, 1, 1, .1);
  font-size: 18px!important;
  font-weight: 500;
  color: white;
}
.dc-title{
  width: 100%;
  min-height: 193px;
  display: inline-flex;
  align-items: center;
}
.dc-artist{
  position: absolute;
  bottom: 0px;
  right: 5px;
}
.shadow{
  text-shadow: 0px 0px 5px black;
  background: rgba(1, 1, 1, .1);
}
.card__media[lazy=loading] {
  background: center center / cover no-repeat;
}
.card__media[lazy=loaded] {
  background: center center / cover no-repeat;
}
.underline{
  text-decoration: underline;
}
</style>
