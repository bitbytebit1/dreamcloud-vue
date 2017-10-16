<template>
  <div>
      <div class="well">
        <button class="btn btn-primary" @click='sort'>Sort Date</button>
        <button class="btn btn-primary" @click='toggleView'>Toggle Playlist View</button>
      </div>
      <v-container v-if="!toggle" fluid v-bind="{ [`grid-list-${_size}`]: true }">
        <v-layout row wrap>  
          <playlistItemNormal
            v-for="(song, index) in songs"
            v-bind:song="song"
            v-bind:index="index"
            v-bind:key="index"
          >
          </playlistItemNormal>
        </v-layout>
        <scroll-to-top></scroll-to-top>
      </v-container>
      <table v-if="toggle" class="table" style="width:100%;border:1px;">
        <tr>
          <th><p class="text-center">Title</p></th>
          <th><p class="text-center">Bild</p></th>
          <th><p class="text-center">Artist</p></th>
          <th><p class="text-center">Uploaded</p></th>
          <th><p class="text-center">Duration</p></th>
        </tr>
        <playlistItemList
          v-for="(song, index) in songs"
          v-bind:song="song"
          v-bind:index="index"
          v-bind:key="index"
        >
        </playlistItemList>
      </table>
      <iframe :src="iframeSrc"></iframe>
    </div>
</template>
<script>
import playlistItemNormal from './playlistItemNormal.vue'
import playlistItemList from './playlistItemList.vue'
import scrollToTop from '../misc/scroll-to-top.vue'

export default {
  name: 'playlist',
  props: ['songs'],
  components: {
    'playlistItemNormal': playlistItemNormal,
    'playlistItemList': playlistItemList,
    'scroll-to-top': scrollToTop
  },
  data () {
    return {
      showScrollToTop: false,
      msg: 'Welcome to the playlist Trinity',
      iframeSrc: '',
      toggle: false
    }
  },
  computed: {
    _size: function () {
      // returns xs to xl depending on view port.
      // used to set padding around elements.
      return this.$vuetify.breakpoint.name
    }
  },
  methods: {
    play: function (index) {
      this.$store.commit('setNPlay', {songs: this.songs, current: index, path: this.$route.path})
      this.$DCPlayer.setNPlay(this.songs, index)
    },
    setIframeSrc: function (sURL) {
      this.iframeSrc = sURL
    },
    sort: function () {
      this.songs.sort(this.$DCAPI.sortDate)
    },
    toggleView: function () {
      this.toggle = !this.toggle
    }
  }
}
</script>

<style>
#search-results{
  margin-bottom: 10px
}
iframe{
  display: none
}
</style>
