<template>
  <v-flex flexbox>
      <div class="well" v-if="viewType.full && !$UTILS.isMobile">
        <button class="btn btn-primary" @click='sort'>Sort Date</button>
        <button class="btn btn-primary" @click='toggleView'>Toggle Playlist View</button>
      </div>
      <v-container v-if="!list" fluid v-bind="{ [`grid-list-${_size}`]: true }">
        <v-layout row wrap>  
          <playlist-item-normal
            v-for="(song, index) in songs"
            v-bind:song="song"
            v-bind:index="index"
            v-bind:key="index" 
          >
          </playlist-item-normal>
        </v-layout>
      </v-container>
        <v-container v-if="list && !$UTILS.isMobile">
          <playlist-item-list v-bind:songs="songs"></playlist-item-list>
      </v-container>
      <playlist-item-list v-else v-bind:songs="songs"></playlist-item-list>
      <scroll-to-top></scroll-to-top>
      <iframe :src="iframeSrc"></iframe>
  </v-flex>
</template>
<script>
import playlistItemNormal from './playlist-item-normal.vue'
import playlistItemList from './playlist-item-list.vue'
import scrollToTop from '../misc/scroll-to-top.vue'

export default {
  name: 'playlist',
  // props: ['songs'],
  props: {
    songs: {
      type: [Array],
      required: true
    },
    viewType: {
      type: [Object],
      default: function () {
        return { full: true, list: true }
      }
    }
  },

  components: {
    'playlist-item-normal': playlistItemNormal,
    'playlist-item-list': playlistItemList,
    'scroll-to-top': scrollToTop
  },
  data () {
    return {
      showScrollToTop: false,
      msg: 'Welcome to the playlist Trinity',
      iframeSrc: '',
      list: this.viewType.list
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
      return this.$DCPlayer.setNPlay(this.songs, index)
    },
    setIframeSrc: function (sURL) {
      this.iframeSrc = sURL
    },
    sort: function () {
      this.songs.sort(this.$DCAPI.sortDate)
    },
    toggleView: function () {
      this.list = !this.list
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
