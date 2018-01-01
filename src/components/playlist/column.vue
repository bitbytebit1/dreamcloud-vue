<template>
    <v-flex xs12 sm4 lg3 flexbox @click="play" class="clm">
      <v-card @mouseover="active = true" @mouseleave="active = false">
        <v-card-media
          v-lazy:background-image="song.posterLarge"
          height="220px"
        >
          <v-container grid-list-xs fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <v-flex xs12 align-end flexbox>
                <span class="song-text main white--text" v-text="song.title"></span>
                <br />
                <span class="song-text white--text" v-text="song.artist"></span>
                <v-btn v-if="availableOffline" class="offline" icon absolute :right="true"> 
                  <v-icon color="green">offline_pin</v-icon>
                </v-btn>
              </v-flex>
              <!-- visible if is play, if hover or on add to playlist click -->
              <!-- work around == add to playlist no longer being visible on click -->
              <v-flex xs12 class="btns" v-if="showBtns"> 
                <!-- onClick -->
                <add-to-playlist colour="teal" @opened="addClickHandler" :song="song"></add-to-playlist>

                <share-button colour="teal"  :song="song" :url="'https://offcloud.netlify.com/#/t/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.trackID"></share-button>
                
                <download-button colour="teal" :links="[song]"></download-button>
                
                <v-btn icon color="teal" @click.stop :href="artistID">
                  <v-icon>person</v-icon>
                </v-btn>

                <delete-button colour="teal" v-if="song.key" :id="song.key" @delete="remove(song.key)"></delete-button>
              </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
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
      active: false,
      active2: false,
      availableOffline: false
    }
  },
  created () {
    this.checkIfAvailableOffline()
  },
  computed: {
    showBtns () {
      return this.active || this.active2 || this.isPlaying
    },
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
    addClickHandler (payload) {
      this.active2 = payload
    },
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
.btns{
    position: absolute;
    bottom: 0;
}
</style>
