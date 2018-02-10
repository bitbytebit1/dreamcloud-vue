<template>
  <v-flex xs12 @click.stop="play" :key="song.trackID" class="width300">
    <v-card>
      <!-- image -->
      <v-card-media v-lazy:background-image="song.poster" height="220px">
        <!-- <v-container grid-list-xs fill-height fluid> -->
          <!-- <v-layout fill-height> -->
            <v-flex xs12 align-center flexbox class="dc-title">
              <!-- title -->
              <span class="crt-ttl" v-text="song.title"></span>
              <div class="text-xs-right">
                <!-- artist -->
                <span @click.stop="$router.push({name: 'artist', params: {source: song.source, artist: song.artist, artistID: song.artistID}})" class="subheading white--text dc-artist breaker19 shadow text-xs-right" v-text="song.artist"></span>
              </div>
            </v-flex>
          <!-- </v-layout> -->
        <!-- </v-container> -->
      </v-card-media>

      <!-- song actions -->
      <v-card-actions>
        <!-- add to playlist -->
        <add-to-playlist :song="song"></add-to-playlist>
        <!-- share button -->
        <share-button :song="song" :url="'https://dreamcloud.netlify.com/#/t/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.trackID"></share-button>
        <!-- download button -->
        <download-button :links="[song]"></download-button>
        <!-- artist -->
        <!-- <v-btn icon @click.stop :href="artistID">
          <v-icon>person</v-icon>
        </v-btn> -->
        <!-- open source -->
        <!-- <v-btn icon @click.stop target="_blank" :href="song.mp32">
          <v-icon>open_in_new</v-icon>
        </v-btn> -->
        <!-- show desc -->
        <v-btn icon @click.stop.native="show = !show" :disabled="!desc">
          <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition v-if="show">
          <!-- description -->
          <v-card-text @click.stop class="breaker19" v-html="ytTimeToSeconds(desc)">
          </v-card-text>
        </transition>
      </v-slide-y-transition>      
    </v-card>
  </v-flex>
</template>
<script>
import addToPlaylist from '@/components/misc/add-to-playlist.vue'
import shareButton from '@/components/misc/share-button'
import downloadButton from '@/components/misc/download-button'

export default {
  props: ['song', 'index'],
  name: 'current-playlist-item',
  components: {
    'add-to-playlist': addToPlaylist,
    'download-button': downloadButton,
    'share-button': shareButton
  },
  // updated () {
    // this.show = (this.desc) && (this.$store.getters.index) && (this.$route.path === this.$store.getters.hash) && (this.song.mp32 === this.$store.getters.current_Playlist[this.$store.getters.index].mp32)
  // },
  data () {
    return {
      show: false,
      desc: this.song.description,
      youtubelink: `http://www.youtube.com/embed/${this.song.trackID}?autoplay=1&mute=1&controls=1&enablejsapi=1`,
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
        <span class="underline" onClick="document.getElementById('dc-audio').currentTime = '$&'.split(':').reduce((acc,time) => (60 * acc) + +time)">$&</span>`))
    },
    ytTimeToSeconds (value) {
      if (!value) {
        return ''
      }
      return (value.replace(/\n/g, '<br>').replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g, `
        <span class="underline" 
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
      if (this.index === this.$store.getters.index) {
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
.width300{
  width:278px
}
.crt-ttl{
  width: 100%;
  text-align: center;
  text-shadow: 0px 0px 5px black;
  background: rgba(1, 1, 1, .1);
  word-break: break-word;
  font-size: 18px!important;
  font-weight: 500;
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
  cursor: pointer;
}
.breaker19{
  word-break: break-word;
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
  cursor: pointer;
}
</style>
