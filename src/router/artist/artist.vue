<template>
  <v-flex xs12 lg10>
    <artist-info  :artistID="artistID" :source="source" :artist="artist" :key="artistID"></artist-info>
    <v-tabs
      v-model="tab"
    >
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab :key="0">
        {{uploads}}
      </v-tab>
      <v-tab :key="1" :disabled="!playlistsLeng">
        {{playlists}}
      </v-tab>
      <v-tab-item :key="0">
        <playlist sortBy="uploaded" rowsPerPage='84' :songs="searchResults"></playlist>
      </v-tab-item>
      <v-tab-item :key="1">
        <playlists :aPlaylist="aPlaylists"></playlists>
      </v-tab-item>
    </v-tabs>
    <!-- <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular> -->
    <loading v-if="loading"></loading>
    
    <!-- <playlist v-if="!loading" sortBy="uploaded" rowsPerPage='84' :songs="searchResults"></playlist> -->
  
    <!-- <loading :show="loading" spinner="waveDots"></loading> -->
  </v-flex>
</template>

<script>
import loading from '@/components/misc/loading'
import artistInfo from './artist-info.vue'
import playlists from './playlists-overview.vue'

export default {
  name: 'artist',
  props: ['source', 'artist', 'artistID'],
  components: {
    'artist-info': artistInfo,
    'loading': loading,
    'playlists': playlists
  },
  data () {
    return {
      aPlaylists: '',
      loading: true,
      searchResults: [],
      iPage: 0,
      tab: null
    }
  },
  computed : {
    uploads () {
      return `Uploads (${this.searchResults.length})`
    },
    playlists () {
      return `Playlists (${this.aPlaylists.length})`
    },
    playlistsLeng () {
      return this.aPlaylists.length
    }
  },
  created () {
    this.search(this.artistID, this.source)
    this.getPlaylists()
  },
  watch: {
    '$route.params': '_search'
  },
  methods: {
    getPlaylists (artistID, source) {
      this.aPlaylists = []
      this.tab = 0
      this.$DCAPI.getChannelPlaylists(artistID, source, 50, (data) => {
        this.aPlaylists = data
      })
    },
    _search () {
      this.search(this.$route.params.artistID, this.$route.params.source)
      this.getPlaylists(this.$route.params.artistID, this.$route.params.source)
    },
    search (artistID, source, iPage = 0) {
      // If first page show loading
      this.loading = !iPage
      // If not param set use internal
      artistID = artistID || this.artistID
      // If not  ”    ”   ”   ”
      source = source || this.source
      // If first page clear search results array.
      this.searchResults = !iPage ? [] : this.searchResults
      return this.$DCAPI.searchInt('', iPage, [source], artistID, (d) => {
        this.loading = false
        // If no results stop infinite loading
        if (!d.length) {
          return
        }
        this.searchResults.push(...d)

        this.searchResults = this.$DCAPI.uniqueArray(this.searchResults)
        this.search(this.query, this.source, ++this.iPage)
      }, '')
    }
  },
  destroyed () {
    // this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
  }
}
</script>
