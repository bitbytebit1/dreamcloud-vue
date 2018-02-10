<template>
  <v-flex xs12 lg10 xl10 flexbox>
    <radar v-if="loading" class="mt-3"></radar>
    <playlist v-if="!loading" rowsPerPage='84' :songs="searchResults"></playlist>  
    <infinite-loading :distance="210" ref="infiniteLoading" v-if="!loading" @infinite="infiniteHandler" spinner="waveDots">    
      <span slot="no-more"></span>
    </infinite-loading>
  </v-flex>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import radar from '@/components/misc/radar-spinner'

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
    'infinite-loading': InfiniteLoading,
    'radar': radar
  },
  computed: {
    splitSource () {
      return this.source.split('-')
      // if (this.source.length > 1) {
      //   return this.source.split('-')
      // }
      // return this.source
    }
  },
  created () {
    this._query = this.query
    this._source = this.splitSource
    this.search(this.query, this._source)
  },
  // beforeRouteUpdate (to) {
  //   console.log(to)
  //   this.search(to.params.query, to.params.source)
  // },
  watch: {
    '$route.params': '_search'
  },
  methods: {
    infiniteHandler ($state) {
      this.search(this._query, this._source, ++this.iPage).then(function () {
        $state.loaded()
      })
    },
    _search (sQuery, aSource) {
      this._query = this.$route.params.source
      this.search(this.$route.params.query, this.splitSource)
    },
    search (sQuery, aSource, iPage = 0) {
      // console.log(this)
      this.loading = !iPage                                           // If first page show loading
      this._query = sQuery || this._query                             // If not param set use internal
      this._source = aSource || this._source                          // If not  ”    ”   ”   ”
      this.searchResults = !iPage ? [] : this.searchResults           // If first page clear search results array.
      return this.$DCAPI.searchInt(this._query, iPage, this._source, '', (d) => {
        this.loading = false
        if (!d.length) {                                              // If no results stop infinite loading
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        }
        this.searchResults.push(...d)
      }, '')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
