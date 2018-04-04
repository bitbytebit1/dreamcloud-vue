<template>
  <v-flex xs12 lg10>
    <artist-info  :artistID="artistID" :source="source" :artist="artist" :key="artistID"></artist-info>

    <!-- <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular> -->
    <loading v-if="loading"></loading>
    
    <infinite-loading ref="infiniteLoading" v-if="!loading" @infinite="infiniteHandler" spinner="default">
      <span slot="no-more"></span>
      <span slot="spinner"></span>
    </infinite-loading>

    <playlist v-if="!loading" sortBy="uploaded" rowsPerPage='84' :songs="searchResults"></playlist>
  
    <!-- <loading :show="loading" spinner="waveDots"></loading> -->
  </v-flex>
</template>

<script>
import loading from '@/components/misc/loading'
import InfiniteLoading from 'vue-infinite-loading'
import artistInfo from './artist-info.vue'

export default {
  name: 'artist',
  props: ['source', 'artist', 'artistID'],
  components: {
    'artist-info': artistInfo,
    'infinite-loading': InfiniteLoading,
    'loading': loading
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
      // If first page show loading
      this.loading = !iPage
      // If not param set use internal
      artistID = artistID || this.artistID
      // If not  ”    ”   ”   ”
      source = source || this.source
      // If first page clear search results array.
      this.searchResults = !iPage ? [] : this.searchResults
      return this.$DCAPI.searchInt('', iPage, [source], artistID, (d) => {
        this.loading = false
        // If no results stop infinite loading
        if (!d.length) {
          state.complete()
        }
        this.searchResults.push(...d)

        this.searchResults = this.$DCAPI.uniqueArray(this.searchResults)
      }, '')
    }
  },
  destroyed () {
    this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
  }
}
</script>
