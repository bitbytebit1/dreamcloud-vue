<template>
	<v-flex xs12 lg10>
		<artist-info  :artistID="artistID" :source="source" :artist="artist" :key="artistID"></artist-info>
		<v-tabs
			v-model="tab"
		>
			<v-tabs-slider color="primary"></v-tabs-slider>
			<v-tab>
				Uploads ({{searchResults.length}}) 
			</v-tab>
			<v-tab :disabled="!aPlaylists.length">
				Playlists ({{aPlaylists.length}})
			</v-tab>
			<v-tab :disabled="!aSubs.length">
				Following ({{aSubs.length}})
			</v-tab>
		</v-tabs>
    
		<v-tabs-items v-model="tab">
			<v-tab-item>
				<playlist sortBy="uploaded" rowsPerPage='84' :songs="searchResults"></playlist>
			</v-tab-item>
			<v-tab-item>
				<playlists :aPlaylist="aPlaylists"></playlists>
			</v-tab-item>
			<v-tab-item>
				<!-- SUBS -->
				<!-- {{aSubs}} -->
				<subscriptions :aSubs="aSubs"></subscriptions>
			</v-tab-item>
		</v-tabs-items>
		<!-- <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular> -->
		<loading v-if="loading"></loading>
    
		<!-- <playlist v-if="!loading" sortBy="uploaded" rowsPerPage='84' :songs="searchResults"></playlist> -->
  
		<!-- <loading :show="loading" spinner="waveDots"></loading> -->
	</v-flex>
</template>

<script>
import loading from '@/components/misc/loading'
import subscriptions from '@/router/channel-subscriptions/subscriptions'
import artistInfo from './artist-info.vue'
import playlists from './playlists-overview.vue'

export default {
  name: 'artist',
  props: ['source', 'artist', 'artistID'],
  components: {
    'artist-info': artistInfo,
    'loading': loading,
    'subscriptions': subscriptions,
    'playlists': playlists
  },
  data () {
    return {
      sTokenSubs: '',
      sTokenPlaylists: '',
      aPlaylists: [],
      aSubs: [],
      loading: true,
      searchResults: [],
      iPage: 0,
      tab: null
    }
  },
  created () {
    this.search(this.artistID, this.source)
    this.getPlaylists(this.artistID, this.source)
    this.geSubs(this.artistID, this.source)
  },
  watch: {
    '$route.params': '_search'
  },
  methods: {
    geSubs (artistID, source) {
      this.aSubs = []
      this.sTokenSubs = ''
      let func = () => {
        this.$DCAPI.getChannelSubscriptions(artistID, source, 50, this.sTokenSubs, (resp) => {
          // SANITY CHECK
          if (artistID === this.$route.params.artistID) {
            this.aSubs = this.aSubs.concat(resp.data)
            if (resp.nextPage) {
              this.sTokenSubs = resp.nextPage
              func()
            }
          }
        })
      }
      func()
    },
    getPlaylists (artistID, source) {
      this.aPlaylists = []
      this.sTokenPlaylists
      let func = () => {
        this.$DCAPI.getChannelPlaylists(artistID, source, 50, this.sTokenPlaylists, (resp) => {
          // SANITY CHECK
          if (artistID === this.$route.params.artistID) {
            this.aPlaylists = this.aPlaylists.concat(resp.data)
            if (resp.nextPage) {
              this.sTokenPlaylists = resp.nextPage
              func()
            }
          }
        })
      }
      func()
    },
    _search () {
      this.search(this.$route.params.artistID, this.$route.params.source)
      this.getPlaylists(this.$route.params.artistID, this.$route.params.source)
      this.geSubs(this.$route.params.artistID, this.$route.params.source)
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
      // Search with params
      return this.$DCAPI.searchInt('', iPage, [source], artistID, (d) => {
        this.loading = false
        // If no results stop infinite loading
        if (!d.length) {
          return
        }
        // SANITY CHECK
        if (artistID === this.$route.params.artistID) {
          this.searchResults.push(...d)

          this.searchResults = this.$DCAPI.uniqueArray(this.searchResults)
          this.search(this.query, this.source, ++this.iPage) 
        }
      }, '')
    }
  },
  destroyed () {
    // this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
  }
}
</script>
