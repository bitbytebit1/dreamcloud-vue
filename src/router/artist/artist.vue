<template>
  <v-flex 
    :key="artistID" 
    xs12 
    lg10
    class="mt-3"
  >
    <artist-info 
      ref="artistInfo" 
      :artistID="artistID" 
      :source="source" 
      :artist="artist" 
    />
    <v-tabs
      ref="tabs"
      v-model="tab"
    >
      <v-tabs-slider color="primary"/>
      <v-tab :disabled="!aSearch.length">
        Uploads ({{ aSearch.length }}) 
      </v-tab>
      <v-tab :disabled="!aPlaylists.length">
        Playlists ({{ aPlaylists.length }})
      </v-tab>
      <v-tab :disabled="!aSubs.length">
        Following ({{ aSubs.length }})
      </v-tab>
    </v-tabs>
    
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <playlist 
          :songs="aSearch"
          rowsPerPage='84'
          @conmen="$emit('conmen', $event)" 
        />
      </v-tab-item>
      <v-tab-item>
        <playlists 
          :aPlaylist="aPlaylists" 
        />
      </v-tab-item>
      <v-tab-item>
        <subscriptions :aSubs="aSubs"/>
      </v-tab-item>
    </v-tabs-items>
  </v-flex>
</template>

<script>
import subscriptions from '@/router/channel-subscriptions/subscriptions'
import playlists from '@/router/channel-playlists/playlists'
import artistInfo from './artist-info.vue'

export default {
  name: 'Artist',
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
      type: [String],
      default: ''
    }
  },
  components: {
    'artist-info': artistInfo,
    'subscriptions': subscriptions,
    'playlists': playlists
  },
  data () {
    return {
      oldA: '',
      sTokenSubs: '',
      sTokenPlaylists: '',
      aPlaylists: [],
      aSubs: [],
      aSearch: [],
      iPage: 0,
      tab: null
    }
  },
  // created () {
  //   this.bind(this.$route.params.artistID, this.$route.params.source);
  // },
  beforeRouteUpdate (to, from, next) {
    // console.log('updated')
    this.bind(to.params.artistID, to.params.source);
    next();
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.bind(to.params.artistID, to.params.source)
    })
  },
  methods: {
    getSubs (artistID, source) {

      this.aSubs = []
      this.sTokenSubs = ''
      let func = () => {
        this.$DCAPI.getChannelSubscriptions(artistID, source, 50, this.sTokenSubs, (resp) => {
          // SANITY CHECK
          if (artistID === this.$route.params.artistID) {
            this.aSubs = this.aSubs.concat(resp.data)
            // if first page or second page
            if (this.aSubs.length < 150) {
              // Update slider length
              this.$refs.tabs.callSlider()
            }
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
      this.sTokenPlaylists = ''
      let func = () => {
        this.$DCAPI.getChannelPlaylists(artistID, source, 50, this.sTokenPlaylists, (resp) => {
          // SANITY CHECK
          if (artistID === this.$route.params.artistID) {
            this.aPlaylists = this.aPlaylists.concat(resp.data)
            // if first page or second page
            if (this.aPlaylists.length < 150) {
              // Update slider length
              this.$refs.tabs.callSlider()
            }
            if (resp.nextPage) {
              this.sTokenPlaylists = resp.nextPage
              func()
            }
          }
        })
      }
      func()
    },
    bind (artistID, source) {
      if (artistID == this.oldA) {
        // alert('critical error')
        return
      }
      this.oldA = artistID
      // this.tab = 0
      this.aPlaylists = []
      this.aSubs = []
      // this.$store.dispatch('loadIndeterm', true)
      this.search(artistID, source).then(() =>{
        this.getPlaylists(artistID, source)
        this.getSubs(artistID, source)
      })
    },
    search (artistID, source, iPage = 0) {
      // If first page show loading
      // If not param set use internal
      artistID = artistID || this.artistID
      // If not  ”    ”   ”   ”
      source = source || this.source
      // If first page clear search results array.
      this.aSearch = !iPage ? [] : this.aSearch
      // Search with params
      return this.$DCAPI.searchInt('', iPage, [source], artistID, (d) => {
        // If no results stop infinite loading
        if (!d.length) {
          return
        }
        // SANITY CHECK
        if (artistID === this.$route.params.artistID) {
          this.aSearch.push(...d)
          // if first page or second page
          if (this.aSearch.length < 150) {
            // Update slider length
            this.$refs.tabs.callSlider()
          }
          this.aSearch = this.$DCAPI.uniqueArray(this.aSearch)
          this.search(this.query, this.source, ++this.iPage)
        }
        // if (iPage === 0) {
        //   this.$store.dispatch('loadIndeterm', false)
        // }
      }, '', 50) //  !iPage ? 18 : 50 first call 18 to be fast on mobile, fucks up caching
    }
  }
}
</script>
