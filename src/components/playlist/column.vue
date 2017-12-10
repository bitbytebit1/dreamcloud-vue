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
                <span class="song-text main white--text" v-text="song.title"></span>
                <br />
                <span class="song-text white--text" v-text="song.artist"></span>
                <v-btn v-if="availableOffline" class="offline" icon absolute :right="true"> 
                  <v-icon color="green">offline_pin</v-icon>
                </v-btn>
                <br />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-actions v-bind:class="{ teal: isPlaying }">

          <add-to-playlist :song="song"></add-to-playlist>

          <share-button :song="song" :url="'https://offcloud.netlify.com/#/t/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.trackID"></share-button>
          
          <download-button :links="[song]"></download-button>
          
          <v-btn icon @click.stop :href="artistID">
            <v-icon>person</v-icon>
          </v-btn>
          <v-btn icon @click.stop target="_blank" :href="song.mp32">
            <v-icon>open_in_new</v-icon>
          </v-btn>

          <delete-button v-if="song.key" :id="song.key" @delete="remove(song.key)"></delete-button>

        </v-card-actions>
      </v-card>
    </v-flex>
</template>
<script>
import addToPlaylist from '@/components/playlist/add-to-playlist.vue'
import deleteButton from '@/components/misc/delete-button'
import shareButton from '@/components/misc/share-button'
import downloadButton from '@/components/misc/download-button'

export default {
  name: 'column',
  props: ['song', 'index'],
  components: {
    'add-to-playlist': addToPlaylist,
    'delete-button': deleteButton,
    'download-button': downloadButton,
    'share-button': shareButton
  },
  data () {
    return {
      availableOffline: false
    }
  },
  created () {
    this.checkIfAvailableOffline()
  },
  computed: {
    artistID () {
      return '#/a/' + this.song.source + '/' + encodeURIComponent(this.song.artist) + '/' + this.song.artistID
    },
    img () {
      return this.song.posterLarge
    },
    date () {
      // I hate this new date... Volvo please fix.
      return this.$DCAPI.calcDate(new Date(), this.song.uploaded)
    },
    isPlaying () {
      return this.$route.path === this.$store.getters.hash && this.song.mp32 === this.$store.getters.current_Playlist[this.$store.getters.index].mp32
    }
  },
  methods: {
    checkIfAvailableOffline () {
      var url = this.song.source === 'SoundCloud' ? this.song.mp3 : 'https://www.saveitoffline.com/process/?type=audio&url=' + this.song.mp32
      window.caches.match(url).then((a) => {
        // console.log(a)
        this.availableOffline = a.ok === true
      }).catch(() => {
        this.availableOffline = false
      })
    },
    remove (key) {
      this.$DCFB.playlistSongDelete(this.$route.params.playlist, key)
    },
    play () {
      this.$parent.play(this.index).then(() => {
        this.checkIfAvailableOffline()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.main{
  font-size: 150%;
}
.song-text{
    text-shadow: 4px 4px 8px black;
    background: rgba(1, 1, 1, .1);
}
.card__media[lazy=loading] {
  background: center center / cover no-repeat;
}
.card__media[lazy=loaded] {
  background: center center / cover no-repeat;
}
.offline{
  bottom: 0px;
  right: 0px;
}
</style>
