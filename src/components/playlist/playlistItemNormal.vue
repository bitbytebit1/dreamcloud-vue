<template>
    <v-flex xs12 sm4 xl3 flexbox @click="play">
      <v-card>
        <v-card-media
          v-lazy:background-image="song.posterLarge"
          height="220px"
        >
          <v-container grid-list-xs fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline white--text" v-text="song.title"></span>
                <div class="artist white--text" v-text="song.artist"></div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-actions v-bind:class="{ green: isPlaying }">
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>favorite</v-icon>
          </v-btn>
          <v-btn icon @click="share">
            <v-icon>share</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>file_download</v-icon>
          </v-btn>
          <v-btn icon @click="play">
            <v-icon>play_circle_filled</v-icon>
          </v-btn>
          <v-btn icon :href="artistID">
            <v-icon>person</v-icon>
          </v-btn>
          <v-btn icon target="_blank" :href="song.mp32">
            <v-icon>open_in_new</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
</template>
<script>
export default {
  name: 'playlistItemNormal',
  props: ['song', 'index'],
  data () {
    return {
      msg: 'Welcome to the real PlaylistItemNormal'
    }
  },
  computed: {
    artistID: function () {
      return '#/a/' + this.song.source + '/' + this.song.artist + '/' + this.song.artistID
    },
    img: function () {
      return this.song.posterLarge
    },
    date: function () {
      // I hate this new date... Volvo please fix.
      return this.$DCAPI.calcDate(new Date(), this.song.created)
    },
    isPlaying: function () {
      return this.$route.path === this.$store.getters.hash && this.index === this.$store.getters.index
    }
  },
  methods: {
    play: function () {
      this.$parent.play(this.index)
    },
    share: function () {
      if (this.$UTILS.isMobile) {
        this.$parent.setIframeSrc('') // double check if this works.
        this.$parent.setIframeSrc('whatsapp://send?text=' + 'http://dc42.netlify.com/' + encodeURIComponent('#/t/' + this.song.source + '/' + this.song.title + '/' + this.song.title + '/' + this.song.trackID))
      } else {
        this.$UTILS.copyToClipboard('dc42.netlify.com/#/t/' + this.song.source + '/' + encodeURIComponent(this.song.artist) + '/' + encodeURIComponent(this.song.title) + '/' + this.song.trackID)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.headline, .artist{
    text-shadow: 2px 2px 8px grey;
}
.card__media[lazy=loading] {
  background: center center / cover no-repeat;
}
.card__media[lazy=loaded] {
  background: center center / cover no-repeat;
}
</style>
