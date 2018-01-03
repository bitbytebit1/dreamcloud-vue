<template>
  <v-flex xs12 flexbox @click.stop="play" :key="song.trackID">
    <v-card>
      <youtube-video v-if="index === 0 && song.source === 'YouTube'" :trackID="song.trackID"></youtube-video>
      <v-card-media v-else v-lazy:background-image="song.poster" height="220px">
        <v-container grid-list-xs fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="title white--text breaker19 shadow" v-text="song.title"></span>
              <br/>
              <span class="subheading white--text breaker19 shadow" v-text="song.artist"></span>

              </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>

      <v-card-actions>
      
        <add-to-playlist :song="song"></add-to-playlist>
        <!-- https://offcloud.netlify.com/ -->
        
        <share-button :song="song" :url="'https://offcloud.netlify.com/#/t/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.trackID"></share-button>

        <download-button :links="[song]"></download-button>

        <v-btn icon @click.stop :href="artistID">
          <v-icon>person</v-icon>
        </v-btn>
        <v-btn icon @click.stop target="_blank" :href="song.mp32">
          <v-icon>open_in_new</v-icon>
        </v-btn>
        <v-btn icon @click.stop.native="show = !show" :disabled="!desc">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition v-if="show">
        <!-- < XSS VULN v-html-->
        <!-- malicous description could lead to xss -->
        <v-card-text @click.stop class="breaker19" v-html="ytTimeToSeconds(desc)">
        <!-- v-html="ytTimeToSeconds(desc) -->
        <!-- < XSS VULN v-html -->
        <!-- {{desc | linkify}} -->
          <!-- {{desc | ytTimeToSeconds}} -->
        </v-card-text>
      </v-slide-y-transition>      
    </v-card>
  </v-flex>
</template>
<script>
import addToPlaylist from '@/components/playlist/add-to-playlist.vue'
import shareButton from '@/components/misc/share-button'
import downloadButton from '@/components/misc/download-button'
import youtubeVideo from '@/components/current-playlist/youtube-video'

export default {
  props: ['song', 'index'],
  name: 'current-playlist-item',
  components: {
    'add-to-playlist': addToPlaylist,
    'download-button': downloadButton,
    'share-button': shareButton,
    'youtube-video': youtubeVideo
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
  computed: {
  },
  watch: {
    'show': 'ifShowGetDesc'
  },
  methods: {
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
      if (newVal) {
        this.getDesc()
      }
    },
    getDesc () {
      if (this.song.source === 'YouTube') {
        this.$DCAPI.getSongDescription(this.song.trackID, this.song.source, (resp) => {
          this.desc = resp.items[0].snippet.description
        })
      }
    },
    play () {
      this.$parent.$parent.play(this.index + this.$store.getters.index)
    },
    share () {
      this.$UTILS.share('https://offcloud.netlify.com/#/t/' + this.song.source + '/' + encodeURIComponent(this.song.artist) + '/' + this.song.trackID, this.song)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.breaker19{
  word-break: break-all;
  /* word-wrap: break-word; */
}
.shadow{
  text-shadow: 4px 4px 8px black;
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
