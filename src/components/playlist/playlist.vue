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
      :rows-per-page="rpp"
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
      :rows-per-page="rpp" 
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
      :rows-per-page="rpp" 
      :sort-by="sortBy" 
      :show-uploaded="showUploaded" 
      @toggleView="toggleView"
      @shuffleOn="shuffle"
      @shuffleOff="shuffleOff"
      @conmen="$emit('conmen', $event)"
    />
    
    <infinite-loading 
      v-if="infinite && aSongs.length" 
      ref="infiniteLoading22"
      :distance="$vuetify.clientHeight" 
      class="flex xs12" 
      spinner="default"
      @infinite="infiniteHandler"
    ><span slot="no-more"/><span slot="no-results"/></infinite-loading>
    
  </v-layout>
  <!-- </v-container> -->
  <!-- </v-flex> -->
</template>
<script>
import grid from './grid'
import list from './list'
import InfiniteLoading from 'vue-infinite-loading'
import { mapState } from 'vuex'

export default {
  name: 'Playlist',
  props: {
    songs: {
      type: [Array],
      required: true
    },
    infinite: {
      type: [Boolean],
      default: false
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
    'list': list,
    'infinite-loading': InfiniteLoading
  },
  data () {
    return {
      showScrollToTop: false,
      // fixd: this.songs,
      aSongs: this.songs,
      chunk: this.$vuetify.breakpoint.xsOnly ? 48 : 72,
      rpp: 48
    }
  },
  watch: {
    songs: {
      handler: 'shuffleOff'
    }
  },
  computed: {
    ...mapState({
      view_mode: state => state.user.view_mode,
    }),
  },
  methods: {
    infiniteHandler ($state) {
      var tmp = Math.min(this.aSongs.length, this.rpp + this.chunk)
      this.rpp = tmp
      if (tmp === this.aSongs.length) {
        $state.reset()
      } else {
        $state.loaded()
      }
      this.infState = $state
    },
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
