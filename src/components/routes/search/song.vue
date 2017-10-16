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
  props: ['source', 'artist', 'title', 'trackID'],
  data () {
    return {
      loading: false,
      msg: 'Welcome to the search Neo',
      searchResults: []
    }
  },
  created: function () {
    this.search(this.trackID, this.source)
  },
  // beforeRouteUpdate (to) {
  //   // console.log(to)
  //   this.search(to.params.query, to.params.source)
  // },
  watch: {
    '$route.params.source': '_search',
    '$route.params.artist': '_search',
    '$route.params.title': '_search',
    '$route.params.trackID': '_search'
  },
  methods: {
    _search: function (sQuery, aSource) {
      this.search(this.$route.params.trackID, this.$route.params.source)
    },
    search: function (sQuery, aSource) {
      sQuery = sQuery || this.query
      aSource = aSource || this.source
      this.error = this.post = null
      this.loading = true
      let self = this
      self.searchResults = []
      this.$DCAPI.getSongInfo(sQuery, aSource, function (d) {
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
