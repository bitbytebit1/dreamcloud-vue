<template>
  <div class="search">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <playlist :songs="searchResults"></playlist>
  </div>
</template>

<script>
export default {
  name: 'searchpage',
  props: ['source', 'artist', 'artistID','trackID'],
  data () {
    return {
      loading: false,
      msg: 'Welcome to the search Neo',
      searchResults: []
    }
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
    _search: function (sQuery, aSource) {
      this.search(this.$route.params.query, this.$route.params.source)
    },
    search: function (sQuery, aSource) {
      sQuery = sQuery || this.query
      aSource = aSource || this.source
      this.error = this.post = null
      this.loading = true
      let self = this
      self.searchResults = []
      this.$DCAPI.searchInt(sQuery, 0, [aSource], '', function (d) {
        self.loading = false
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
