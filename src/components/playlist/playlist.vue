<template>
  <!-- <v-flex flexbox> -->
  <!-- <v-container fluid class="grid-list-xs search-results"> -->
  <v-layout 
    row 
    wrap 
    pb-5
  >
    <list 
      v-if="list == '2' && !gridView" 
      :songs="songsActual" 
      :full="full" 
      :rows-per-page="rowsPerPage"
      :sort-by="sortBy" 
      :bMini="true" 
      @toggleView="toggleView"
      @shuffleOn="shuffle"
      @shuffleOff="shuffle(songs)"
      @conmen="$emit('conmen', $event)"
    />
    <list 
      v-if="list == '1' && !gridView" 
      :songs="songsActual" 
      :full="full" 
      :rows-per-page="rowsPerPage" 
      :sort-by="sortBy" 
      @toggleView="toggleView"
      @shuffleOn="shuffle"
      @shuffleOff="shuffle(songs)"
      @conmen="$emit('conmen', $event)"
    />
    <grid 
      v-if="list == '0' && !gridView" 
      :songs="songsActual" 
      :full="full" 
      :rows-per-page="rowsPerPage" 
      :sort-by="sortBy" 
      :show-uploaded="showUploaded" 
      @toggleView="toggleView"
      @shuffleOn="shuffle"
      @shuffleOff="shuffle(songs)"
      @conmen="$emit('conmen', $event)"
    />
  </v-layout>
  <!-- </v-container> -->
  <!-- </v-flex> -->
</template>
<script>
import grid from './grid'
import list from './list'
import { mapGetters } from 'vuex'

export default {
  name: 'Playlist',
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
      fixd: this.songs,
      songsActual: this.songs
    }
  },
  watch: {
    songs: {
      immediate: true,
      handler: 'burp'
    }
  },
  computed: {
    ...mapGetters({
      list: 'view_mode'
    })
  },
  methods: {
    burp () {
      this.fixd = this.songs
      for (let song in this.songsActual) {
        // console.log(this.fixd[song])
        if (!(this.songsActual[song].uploaded instanceof Date)) {
          // eslint-disable-next-line
          this.songsActual[song].uploaded = new Date(this.songsActual[song].uploaded)
        } else {
          // console.log('assuming all dates are ok')
          break
        }
      }
      this.songsActual = this.fixd
    },
    shuffle ($event) {
      // console.log('shufflez', $event[0].trackID)
      this.songsActual = $event
      // wait for data table to update
      // this.$nextTick(() => {
      //   this.play(0)
      // })
    },
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
