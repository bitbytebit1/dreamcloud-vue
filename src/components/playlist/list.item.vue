<template>
  <tr>
    <td :class="tdClass" v-show="bSelect"><v-checkbox :color="isPlaying ? 'white' : 'teal'" hide-details v-model="selected"></v-checkbox></td>
    <td @click="play(props.index)" :class="tdClass"><img v-lazy="song.poster" :height="isPlaying ? '100px' : '35px'" /></td>
    <td @click="play(props.index)" :class="tdClass">
      {{ song.title }}
      <p v-if="isPlaying">
        {{song.description}}
      </p>
    </td>
    <td @click="play(props.index)" :class="tdClass"><a @click.stop :class="artistClass" :href="shareArtistURL">{{ song.artist }}</a></td>
    <!-- <td @click="play(props.index)" :class="tdClass">{{ date(song.created) }}</td> -->
    <!-- actions -->
    <td :class="tdClass">
      <v-menu transition="slide-y-transition" bottom lazy>
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-if="$store.getters.auth_state">
            <add-to-playlist :song="addSong(song)"></add-to-playlist>
          </v-list-tile>
          <v-list-tile v-for="(action, index) in actions" :key="action.title" @click="action.func(song)">
            <!-- <v-list-tile-title>{{ action.title }}</v-list-tile-title> -->
            <v-btn icon>
              <v-icon>
                {{ action.icon }}
              </v-icon>
            </v-btn>
          </v-list-tile>
          <v-list-tile>
            <share-button :song="song" :url="'https://offcloud.netlify.com/#/t/' + song.source + '/' + encodeURIComponent(song.artist) + '/' + song.trackID"></share-button>
          </v-list-tile>
          <v-list-tile v-if="song.key">
            <delete-button :id="song.key" @delete="remove(song.key)"></delete-button>
          </v-list-tile>
        </v-list>
      </v-menu>
    </td>
  </tr>  
</template>
<script>
/* eslint-disable */
export default {
  name: 'x',
  props: ['song', 'bSelect', 'selected'],
  data () {
    return {
      x1: 'deleteme?'
    }
  },
  methods: {
    date (dat) {
      return this.$DCAPI.calcDate(this.today, dat)
    }
  },
  computed: {
    artistClass () {
      return this.$store.getters.theme.dark ? 'artist-dark' : 'artist-light'
    },
    artistID () {
      return '/#/a/' + this.song.source + '/' + this.song.artist + '/' + this.song.artistID
    },
    shareArtistURL () {
      return '#/a/' + this.song.source + '/' + encodeURIComponent(this.song.artist) + '/' + this.song.artistID
    },
    tdClass () {
      return {
        'teal': this.isPlaying,
        'text-xs-left': true,
        'caption': true
      }
    },
    isPlaying () {
      if (this.$store.getters.index === -1) {
        return
      }
      return this.$route.path === this.$store.getters.hash && this.song.mp32 === this.$store.getters.current_Playlist[this.$store.getters.index].mp32
    }
  },
}
</script>