<template>
  <v-flex xs12 lg10 xl10 flexbox>
    <artist-info  :artistID="artistID" :source="source" :artist="artist" :key="artistID"></artist-info>

    <infinite-loading ref="infiniteLoading" v-if="!loading" @infinite="infiniteHandler" spinner="default">
      <span slot="no-more"></span>
      <span slot="spinner"></span>
    </infinite-loading>

    <!-- <loading v-if="loading" @infinite="infiniteHandler" :show="!loading" :reff="'infiniteLoading'" spinner="waveDots"></loading> -->
    

    <playlist v-if="!loading" sortBy="uploaded" rowsPerPage='50' :songs="searchResults"></playlist>
  
    <!-- <loading :show="loading" spinner="waveDots"></loading> -->
  </v-flex>
</template>

<script>
import loading from '@/components/misc/loading'
import InfiniteLoading from 'vue-infinite-loading'
import artistInfo from './artist-info.vue'
import playlist from '@/components/playlist/playlist'

export default {
  name: 'artist',
  props: ['source', 'artist', 'artistID'],
  components: {
    'artist-info': artistInfo,
    'infinite-loading': InfiniteLoading,
    'loading': loading,
    'playlist': playlist
  },
  data () {
    return {
      loading: true,
      searchResults: [],
      iPage: 0
    }
  },
  created () {
    this.search(this.artistID, this.source)
  },
  watch: {
    '$route.params': '_search'
  },
  methods: {
    infiniteHandler (state) {
      this.search(this.query, this.source, ++this.iPage, state).then(function () {
        state.loaded()
      })
    },
    _search (sQuery, aSource) {
      this.search(this.$route.params.artistID, this.$route.params.source)
    },
    search (artistID, source, iPage = 0, state = 0) {
      this.loading = !iPage                                 // If first page show loading
      artistID = artistID || this.artistID                  // If not param set use internal
      source = source || this.source                        // If not  ”    ”   ”   ”
      this.searchResults = !iPage ? [] : this.searchResults // If first page clear search results array.
      return this.$DCAPI.searchInt('', iPage, [source], artistID, (d) => {
        this.loading = false
        if (!d.length) {                                    // If no results stop infinite loading
          state.complete()
          // ^ fix ?
          // this.$refs.infiniteLoading.stateChanger.complete()
          // ^ This line may cause problems in the future
          // this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          // ^ Proper way, but causes warning?
        }
        for (var i in d) {
          this.searchResults.push(d[i])
        }
        this.searchResults = this.$DCAPI.uniqueArray(this.searchResults)
      }, '')
    }
  }
}
</script>
