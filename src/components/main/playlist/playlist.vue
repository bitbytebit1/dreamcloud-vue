<template>
  <!-- <v-flex flexbox> -->
      <!-- <v-container fluid class="grid-list-xs search-results"> -->
        <v-layout row wrap>
          <list v-if="list && !gridView" :songs="fixedSongs" :full="full" :rowsPerPage="rowsPerPage" :sortBy="sortBy" @toggleView="toggleView"></list>
          <grid v-else :songs="fixedSongs" :full="full" :rowsPerPage="rowsPerPage" :sortBy="sortBy" :showUploaded="showUploaded" @toggleView="toggleView"></grid>
        </v-layout>
      <!-- </v-container> -->
  <!-- </v-flex> -->
</template>
<script>
import grid from './grid'
import list from './list'
import { mapGetters } from 'vuex'

export default {
  name: 'playlist',
  props: {
    songs: {
      type: [Array],
      required: true
    },
    gridView: {
      type: [Boolean],
      default: false
    },
    rowsPerPage: {
      type: [Number, String],
      default: 10
    },
    full: {
      type: [Boolean],
      default: true
    },
    sortBy: {
      type: [String],
      default: ''
    },
    showUploaded: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    'grid': grid,
    'list': list
  },
  data () {
    return {
      showScrollToTop: false,
      fixd: this.songs
    }
  },
  computed: {
    ...mapGetters({
      list: 'view_mode'
    }),
    _size () {
      // returns xs to xl depending on view port.
      // used to set padding around elements.
      return this.$vuetify.breakpoint.name
    },
    fixedSongs () {
      // eslint-disable-next-line
      this.fixd = this.songs
      for (let song in this.fixd) {
        // console.log(this.fixd[song])
        if (!(this.fixd[song].uploaded instanceof Date)) {
          // eslint-disable-next-line
          this.fixd[song].uploaded = new Date(this.fixd[song].uploaded)
        } else {
          // console.log('assuming all dates are ok')
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
      this.$store.commit('view_mode_toggle')
    }
  }
}
</script>

<style>

  @media only screen and (min-width: 600px){
    .search-results{
      /* margin-top: 15px!important; */
      margin-bottom: 15px!important;
    }
  }

  @media only screen and (max-width: 599px){
    .search-results{
      margin-bottom: 42px!important;
    }
  }
</style>
