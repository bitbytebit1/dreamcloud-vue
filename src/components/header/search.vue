<template>
  <v-toolbar-items>
    <v-menu
      v-model="showMenu"
      :close-on-content-click="false"
      :open-on-hover="$vuetify.breakpoint.mdAndUp"
      :nudge-bottom="40"
      :nudge-left="35"
      z-index="10"
    >
      <v-spacer/>
      <v-toolbar-title slot="activator">
        <v-btn icon>
          <v-icon>
            arrow_drop_down_circle
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
              block 
              color="primary "
              @click="showMenu = false"
            >Close</v-btn>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
    <autocomplete 
      ref="autocomp" 
      @search="search($event)"
    />
    <v-btn 
      icon 
      @click="search($refs.autocomp.search)"
    >
      <v-icon>
        search
      </v-icon>
    </v-btn>
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

<!-- Add 'scoped' attribute to limit CSS to this component only 
<style scoped>
img{
  height: 25px;
  margin-right: 25px;
  max-width: 25px;
}
</style>
// *[@id="navbar"]/div/div[3]/div[2]/div/div/div[1]/input
-->
<style>
  @media only screen and (min-width: 1000px){
    #navbar .v-toolbar__items {
        min-width: 650px !important;
        max-width: 1000px;
    }
  }
  @media only screen and (min-width: 600px){
    #navbar .v-toolbar__items {
        min-width: 500px;
        max-width: 1000px !important;
    }
  }
</style>