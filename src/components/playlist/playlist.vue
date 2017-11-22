<template>
  <v-flex flexbox>
      <!-- <div class="well"> && !$UTILS.isMobile -->
        <!-- <button class="btn btn-primary" @click='sort'>Sort Date</button>   -->
        <!-- <button class="btn btn-primary" @click='toggleView'>Toggle Playlist View</button> -->
      <!-- </div> -->
      <v-container v-if="!list" fluid v-bind="{ [`grid-list-${_size}`]: true }">
        <v-layout row wrap>
            <v-flex lg10>
              <v-text-field
              color="teal"
              :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
              label="Filter"
              single-line
              hide-details
              v-model="search"
              v-on:keyup.enter="$UTILS.closeSoftMobi()"
              ref="search"
              ></v-text-field>
            </v-flex>
            <v-flex lg2 :class="$vuetify.breakpoint.name === 'xs' ? '' : 'pt-2'">
              <v-btn icon @click="search">
                <v-icon>filter_list</v-icon>
              </v-btn>            
              <v-btn icon @click="toggleView">
                <v-icon>view_headline</v-icon>
              </v-btn>
            </v-flex>
          <!-- <v-flex> -->
            <playlist-item-normal
              v-for="(song, index) in songs"
              v-bind:song="song"
              v-bind:index="index"
              v-bind:key="index" 
            >
            </playlist-item-normal>
          <!-- </v-flex> -->
        </v-layout>
      </v-container>
        <v-container v-if="list && !$UTILS.isMobile">
          <playlist-item-list @toggleView="toggleView" v-bind:songs="songs"></playlist-item-list>
      </v-container>
      <playlist-item-list @toggleView="toggleView" v-if="list && $UTILS.isMobile" v-bind:songs="songs"></playlist-item-list>
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
        return { full: true, list: !0 }
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
      console.log('src', sURL)
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
