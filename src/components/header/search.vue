<template>
  <v-toolbar-items class="ml-3">
    <autocomplete @search="search($event)"/>

    <v-menu
      v-model="showMenu"
      :close-on-content-click="false"
      :open-on-hover="$vuetify.breakpoint.mdAndUp"
      :nudge-bottom="25"
      z-index="10"
    >
      <v-toolbar-title slot="activator">
        <v-btn icon>
          <v-icon>
            search
          </v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-card>
        <v-list>
          <v-list-tile>
            <!-- <img src='../img/All.png'> -->
            <v-list-tile-action>
              <v-switch 
                v-model="artist" 
                color="primary"
              />
            </v-list-tile-action>
            <v-list-tile-title>Artist</v-list-tile-title>
          </v-list-tile>

          <v-divider/>

          <v-list-tile>
            <!-- <img src='../img/All.png'> -->
            <v-list-tile-action>
              <v-switch 
                v-model="aSources.All" 
                color="primary"
              />
            </v-list-tile-action>
            <v-list-tile-title>All</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <!-- <img src='../img/bc.png'> -->
            <v-list-tile-action>
              <v-switch 
                v-model="aSources.Bandcamp" 
                color="primary"
              />
            </v-list-tile-action>
            <v-list-tile-title>Bandcamp</v-list-tile-title>
          </v-list-tile>
          
          <v-list-tile>
            <!-- <img src='../img/mc.png'> -->
            <v-list-tile-action>
              <v-switch 
                v-model="aSources.MixCloud" 
                color="primary"
              />
            </v-list-tile-action>
            <v-list-tile-title>Mixcloud</v-list-tile-title>
          </v-list-tile>
          
          <v-list-tile>
            <!-- <img src='../img/sc.png'> -->
            <v-list-tile-action>
              <v-switch 
                v-model="aSources.SoundCloud" 
                color="primary"
              />
            </v-list-tile-action>
            <v-list-tile-title>SoundCloud</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <!-- <img src='../img/yt.png'> -->
            <v-list-tile-action>
              <v-switch 
                v-model="aSources.YouTube" 
                color="primary"
              />
            </v-list-tile-action>
            <v-list-tile-title>YouTube</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <!-- <img src='../img/vm.png'> -->
            <v-list-tile-action>
              <v-switch 
                v-model="aSources.Vimeo" 
                color="primary"
              />
            </v-list-tile-action>
            <v-list-tile-title>Vimeo</v-list-tile-title>
          </v-list-tile>
          <v-list-tile 
            v-if="$vuetify.breakpoint.smAndDown" 
            @click="showMenu = false"
          >
            <v-btn 
              flat 
              block 
              color="primary"
              @click="showMenu = false"
            >Close</v-btn>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>    
  </v-toolbar-items>
</template>

<script>
import autocomplete from '@/components/header/autocomplete'

export default {
  name: 'Search',
  components: {
    'autocomplete': autocomplete
  },
  watch: {
    'aSources.All': '_All',
    'aSources.Bandcamp': '_other',
    'aSources.MixCloud': '_other',
    'aSources.SoundCloud': '_other',
    'aSources.YouTube': '_other',
    'aSources.Vimeo': '_other',
    'artist': '__search'
  },
  data () {
    return {
      aSources: {All: false, Bandcamp: false, MixCloud: false, SoundCloud: false, YouTube: true, Vimeo: false},
      sQuery: '',
      artist: false,
      showMenu: false
    }
  },
  computed: {
    maSource () {
      if (this.aSources.All) {
        return 'all'
      }
      var ret = []
      Object.keys(this.aSources).forEach((key) => {
        if (this.aSources[key]) {
          ret.push(key)
        }
      })
      return ret.join('-')
    }
  },
  methods: {
    _All (newVal) {
      if (newVal) {
        this.aSources.Bandcamp = this.aSources.MixCloud = this.aSources.SoundCloud = this.aSources.YouTube = this.aSources.Vimeo = false
      }
      this.search()
    },
    _other (newVal) {
      if (newVal) {
        this.aSources.All = false
      }
      this.search()
    },
    __search () {
      if (this.artist) {
        this.$router.push({name: 'searchArtist', params: {query: this.sQuery, source: this.maSource}})
      } else {
        this.$router.push({name: 'searchQuery', params: {query: this.sQuery, source: this.maSource}})
      }
    },
    search (query) {
      if (query) {
        this.sQuery = query
      }
      this.$UTILS.closeSoftMobi()
      this.__search()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
img{
  height: 25px;
  margin-right: 25px;
  max-width: 25px;
}
</style>
