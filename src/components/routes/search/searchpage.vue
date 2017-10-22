<template>
  <div class="cont">
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
      _query: '',
      _source: '',
      loading: false,
      searchResults: [],
      iPage: 0
    }
  },
  components: {
    InfiniteLoading
  },
  computed: {
    splitSource: function () {
      if (this.source.length > 1) {
        let tmp = this.source
        return tmp.split('-')
      }
      return this.source
    }
  },
  created: function () {
    this._query = this.query
    this._source = this.splitSource
    this.search(this.query, this._source)
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
      console.log()
      this.search(this._query, this._source, ++this.iPage).then(function () {
        $state.loaded()
      })
    },
    _search: function (sQuery, aSource) {
      this._query = this.$route.params.source
      this.search(this.$route.params.query, this.splitSource)
    },
    search: function (sQuery, aSource, iPage = 0) {
      // console.log(this)
      this.loading = !iPage                                           // If first page show loading
      this._query = sQuery || this._query                             // If not param set use internal
      this._source = aSource || this._source                          // If not  ”    ”   ”   ”
      this.searchResults = !iPage ? [] : this.searchResults           // If first page clear search results array.
      return this.$DCAPI.searchInt(this._query, iPage, this._source, '', (d) => {
        this.loading = false
        if (!d.length) {                                              // If no results stop infinite loading
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.cont{
  width: 100%
}
</style>
