<template>
  <v-flex flexbox>
      <!-- <div class="well"> && !$UTILS.isMobile -->
        <!-- <button class="btn btn-primary" @click='sort'>Sort Date</button>   -->
        <!-- <button class="btn btn-primary" @click='toggleView'>Toggle Playlist View</button> -->
      <!-- </div> -->
      <v-container fluid class="grid-list-xs search-results">
        <v-layout row wrap>
          <column v-if="!list" :songs="fixedSongs" :rowsPerPage="rowsPerPage" :sortBy="sortBy" @toggleView="toggleView"></column>
          <list v-else :songs="fixedSongs" :rowsPerPage="rowsPerPage" :sortBy="sortBy" @toggleView="toggleView"></list>
        </v-layout>
      </v-container>
        <!-- <v-container v-if="list && !$UTILS.isMobile"> -->
      
      <!-- </v-container> -->
      <!-- <list :rowsPerPage="rowsPerPage" @toggleView="toggleView" v-if="list && $UTILS.isMobile" :songs="fixedSongs"></list> -->

  </v-flex>
</template>
<script>
import column from './column'
// import column from './list.2.vue'
import list from './list'

export default {
  name: 'playlist',
  props: {
    songs: {
      type: [Array],
      required: true
    },
    viewType: {
      type: [Object],
      default () {
        return { full: true, list: !1 }
      }
    },
    rowsPerPage: {
      type: [Number, String],
      default: 10
    },
    sortBy: {
      type: [String],
      default: ''
    }
  },
  components: {
    'column': column,
    'list': list
  },
  data () {
    return {
      showScrollToTop: false,
      list: this.viewType.list,
      fixd: this.songs
    }
  },
  computed: {
    _size () {
      // returns xs to xl depending on view port.
      // used to set padding around elements.
      return this.$vuetify.breakpoint.name
    },
    fixedSongs () {
      this.fixd = this.songs
      for (let song in this.fixd) {
        // console.log(this.fixd[song])
        if (!(this.fixd[song].uploaded instanceof Date)) {
          this.fixd[song].uploaded = new Date(this.fixd[song].uploaded)
        } else {
          break
        }
      }
      return this.fixd
    }
  },
  methods: {
    play (index) {
      this.$store.commit('setNPlay', {songs: this.songs, current: index, path: this.$route.path})
      return this.$DCPlayer.setNPlay(this.songs, index)
    },
    sort () {
      this.songs.sort(this.$DCAPI.sortDate)
    },
    toggleView () {
      this.list = !this.list
    }
  }
}
</script>

<style>
#search-results{
  margin-bottom: 10px
}
</style>
