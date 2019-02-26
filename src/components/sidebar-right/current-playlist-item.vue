<template>
  <!-- v-show="!(index === 0 && $store.getters.bShowStage)" -->
  <v-flex 
    xs12 
    @click.stop="play"
  >
    <v-card
      class="pointer"
    >
      <!-- image -->
      <v-img
        :aspect-ratio="song.source === 'YouTube' ? 16/9 : '1'"
        :src="song.posterLarge"
        :lazy-src="song.posterLarge"
        class="fillPlace"
      >
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
        </v-layout>

      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>

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
  data () {
    return {
      show: false,
      desc: this.song.description,
      youtubelink: `https://www.youtube.com/embed/${this.song.trackID}?autoplay=1&mute=1&controls=1&enablejsapi=1`,
      artistID: `#/a/${this.song.source}/${encodeURIComponent(this.song.artist)}/${this.song.artistID}`
    }
  },
  methods: {
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
