<template>
  <div class="search">
    <div class="loading" v-if="loading">    
      <infinite-loading spinner="waveDots"></infinite-loading>
    </div>
    <playlist v-if="!loading" :songs="searchResults"></playlist>  
    <infinite-loading ref="infiniteLoading" v-if="!loading" @infinite="infiniteHandler" spinner="waveDots">    
      <span slot="no-more">End of the line kiddo</span>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'searchpage',
  props: ['query', 'source'],
  data () {
    return {
      loading: false,
      msg: 'Welcome to the search Neo',
      searchResults: []
    }
  },
  components: {
    InfiniteLoading
  },
  created: function () {
    this.search(this.query, this.source)
  },
  // beforeRouteUpdate (to) {
  //   // console.log(to)
  //   this.search(to.params.query, to.params.source)
  // },
  watch: {
    '$route.params.query': '_search',
    '$route.params.source': '_search'
  },
  methods: {
    infiniteHandler: function ($state) {
      this.search(this.query, this.source, ++this.$DCAPI.iPage).then(function () {
        $state.loaded()
      })
    },
    _search: function (sQuery, aSource) {
      this.search(this.$route.params.query, this.$route.params.source)
    },
    search: function (sQuery, aSource, iPage = 0) {
      var self = this
      self.loading = !iPage                                       // If first page show loading
      self.query = sQuery || self.query                           // If not param set use internal
      self.source = aSource || self.source                        // If not  ”    ”   ”   ”
      self.searchResults = !iPage ? [] : self.searchResults       // If first page clear search results array.
      return self.$DCAPI.searchInt(self.query, iPage, [self.source], '', function (d) {
        self.loading = false
        if (!d.length) {                                          // If no results stop infinite loading
          self.$refs.infiniteLoading.stateChanger.complete()
          // ^ This line may cause problems in the future
          // this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
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
