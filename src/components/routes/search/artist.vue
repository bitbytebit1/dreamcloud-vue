<template>
  <div class="search">
    <div class="loading" v-if="loading">
      <infinite-loading spinner="waveDots">
      </infinite-loading>
    </div>
    <artist-info  v-if="!loading" :artistID="artistID" :source="source" :artist="artist"></artist-info>
    <playlist v-if="!loading":songs="searchResults"></playlist>
    <infinite-loading ref="infiniteLoading" v-if="!loading" @infinite="infiniteHandler" spinner="waveDots">
      <span slot="no-more">End of the line kiddo</span>
    </infinite-loading>
  </div>
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
      msg: 'Welcome to the search Neo',
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
      let self = this
      self.loading = !iPage                                 // If first page show loading
      self.artistID = artistID || self.artistID             // If not param set use internal
      self.source = source || self.source                   // If not  ”    ”   ”   ”
      self.searchResults = !iPage ? [] : self.searchResults // If first page clear search results array.
      return self.$DCAPI.searchInt('', iPage, [self.source], self.artistID, function (d) {
        self.loading = false
        if (!d.length) {                                    // If no results stop infinite loading
          self.$refs.infiniteLoading.stateChanger.complete()
          // ^ This line may cause problems in the future
          // self.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          // ^ Proper way, but causes warning?
        }
        for (var i in d) {
          self.searchResults.push(d[i])
        }
      }, '')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
