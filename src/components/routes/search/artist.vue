<template>
  <div class="search">
    <div class="loading" v-if="loading">
      <!-- <img src="../../img/loading.gif"> -->
      Loading...
    </div>
    <artist-info :artistID="artistID" :source="source">
    </artist-info>
    <playlist :songs="searchResults"></playlist>
  </div>
</template>

<script>
import artistInfo from './artist-info.vue'
export default {
  name: 'artist',
  props: ['source', 'artistID'],
  components: {
    'artist-info': artistInfo
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
    _search: function (sQuery, aSource) {
      this.search(this.$route.params.artistID, this.$route.params.source)
    },
    search: function (sQuery, aSource) {
      sQuery = sQuery || this.artistID
      aSource = aSource || this.source
      this.error = this.post = null
      this.loading = true
      let self = this
      self.searchResults = []
      this.$DCAPI.searchInt('', 0, [aSource], this.artistID, function (d) {
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
