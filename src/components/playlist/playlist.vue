<template>
  <!-- <v-flex flexbox> -->
  <!-- <v-container fluid class="grid-list-xs search-results"> -->
  <v-layout 
    row 
    wrap 
  >
    <list 
      v-if="view_mode == '2' && !gridView" 
      :songs="aSongs" 
      :full="full" 
      :rows-per-page="rowsPerPage"
      :sort-by="sortBy" 
      :bMini="true" 
      @toggleView="toggleView"
      @shuffleOn="shuffle"
      @shuffleOff="shuffleOff"
      @conmen="$emit('conmen', $event)"
    />
    <list 
      v-if="view_mode == '1' && !gridView" 
      :songs="aSongs" 
      :full="full" 
      :rows-per-page="rowsPerPage" 
      :sort-by="sortBy" 
      @toggleView="toggleView"
      @shuffleOn="shuffle"
      @shuffleOff="shuffleOff"
      @conmen="$emit('conmen', $event)"
    />
    <grid 
      v-if="view_mode == '0' && !gridView" 
      :songs="aSongs" 
      :full="full" 
      :rows-per-page="rowsPerPage" 
      :sort-by="sortBy" 
      :show-uploaded="showUploaded" 
      @toggleView="toggleView"
      @shuffleOn="shuffle"
      @shuffleOff="shuffleOff"
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
      // fixd: this.songs,
      aSongs: this.songs
    }
  },
  watch: {
    songs: {
      handler: 'shuffleOff'
    }
  },
  computed: {
    ...mapGetters({
      view_mode: 'view_mode'
    })
  },
  methods: {
    // burp () {
      
    // this.fixd = this.songs
    // for (let song in this.songsActual) {
    //   // console.log(this.fixd[song])
    //   if (!(this.songsActual[song].uploaded instanceof Date)) {
    //     // eslint-disable-next-line
    //     this.songsActual[song].uploaded = new Date(this.songsActual[song].uploaded)
    //   } else {
    //     // console.log('assuming all dates are ok')
    //     break
    //   }
    // }
    // this.songsActual = this.fixd
    // },
    shuffleOff () {
      this.aSongs = this.songs
    },
    shuffle ($event) {
      // console.log('shufflez', $event[0].trackID)
      this.aSongs = $event
      // wait for data table to update
      // this.$nextTick(() => {
      //   this.play(0)
      // })
    },
    sort () {
      this.aSongs.sort(this.$DCAPI.sortDate)
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
