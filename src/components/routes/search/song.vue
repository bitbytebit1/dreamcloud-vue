<template>
  <v-flex xl12 flexbox>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <playlist :songs="searchResults"></playlist>
  </v-flex>
</template>

<script>
import playlist from '@/components/playlist/playlist'
export default {
  name: 'searchpage',
  props: ['source', 'artist', 'trackID'],
  data () {
    return {
      loading: false,
      searchResults: []
    }
  },
  components: {
    'playlist': playlist
  },
  created () {
    this.search(this.trackID, this.source)
  },
  watch: {
    '$route.params': '_search'
  },
  methods: {
    _search (sQuery, aSource) {
      this.search(this.$route.params.trackID, this.$route.params.source)
    },
    search (sQuery, aSource) {
      sQuery = sQuery || this.query
      aSource = aSource || this.source
      this.error = this.post = null
      this.loading = true
      this.searchResults = []
      this.$DCAPI.getSongInfo(sQuery, aSource, (d) => {
        this.loading = false
        for (var i in d) {
          this.searchResults.push(d[i])
        }
      }, '')
    }
  }
}
</script>
