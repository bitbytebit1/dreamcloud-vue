<template>
  <v-flex xs12 xl12 flexbox>
    
    <div class="loading" v-if="loading">
      <infinite-loading spinner="waveDots">
      </infinite-loading>
    </div>
    
    <artist-info v-if="!loading" :artistID="artistID" :source="source" :artist="artist"></artist-info>

    <playlist v-if="!loading":songs="searchResults"></playlist>
    
    <infinite-loading ref="infiniteLoading" v-if="!loading" @infinite="infiniteHandler" spinner="waveDots">
      <span slot="no-more">End of the line kiddo</span>
    </infinite-loading>
  </v-flex>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import artistInfo from './artist-info.vue'
export default {
  name: 'artist',
  props: ['source', 'artist', 'artistID'],
  components: {
    'artist-info': artistInfo,
    'infinite-loading': InfiniteLoading
  },
  data () {
    return {
      loading: false,
      searchResults: []
    }
  },
  created: function () {
    this.search(this.artistID, this.source)
  },
  watch: {
    '$route.params.artistID': '_search',
    '$route.params.source': '_search'
  },
  methods: {
    infiniteHandler: function ($state) {
      this.search(this.query, this.source, ++this.$DCAPI.iPage).then(function () {
        $state.loaded()
      })
    },
    _search: function (sQuery, aSource) {
      this.search(this.$route.params.artistID, this.$route.params.source)
    },
    search: function (artistID, source, iPage = 0) {
      this.loading = !iPage                                 // If first page show loading
      this.artistID = artistID || this.artistID             // If not param set use internal
      this.source = source || this.source                   // If not  ”    ”   ”   ”
      this.searchResults = !iPage ? [] : this.searchResults // If first page clear search results array.
      return this.$DCAPI.searchInt('', iPage, [this.source], this.artistID, (d) => {
        this.loading = false
        if (!d.length) {                                    // If no results stop infinite loading
          this.$refs.infiniteLoading.stateChanger.complete()
          // ^ This line may cause problems in the future
          // this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          // ^ Proper way, but causes warning?
        }
        for (var i in d) {
          this.searchResults.push(d[i])
        }
      }, '')
    }
  }
}
</script>
