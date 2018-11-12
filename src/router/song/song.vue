<template>
  <v-flex 
    xs12 
    lg10
  >
    <div 
      v-if="loading" 
      class="loading"
    >
      Loading...
    </div>
    <playlist :songs="searchResults"/>
  </v-flex>
</template>

<script>

export default {
  name: 'Searchpage',
  props: {
    artistID: {
      type: [String, Number],
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    artist: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      searchResults: []
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler: 'search'
    }
  },
  methods: {
    search () {
      this.loading = true
      this.searchResults = []
      this.$DCAPI.getSongInfo(this.$route.params.trackID, this.$route.params.source, (d) => {
        this.loading = false
        this.searchResults.push(...d)
      }, '')
    }
  }
}
</script>
