<template>
<span>
  <v-toolbar-items>
  <v-text-field 
      style="max-height: 12px;"
      v-on:keyup.enter='search' 
      v-model='sQuery'
      placeholder="Search" 
      color="teal"
      single-line
    >

    ></v-text-field>
    <v-menu
      :close-on-content-click="false"
      :nudge-bottom="25"
      open-on-hover
    >
      <v-btn icon slot="activator"><v-icon>cloud_circle</v-icon></v-btn>
      <v-card>
        <v-list>
          <v-list-tile>
            <!-- <img src='../img/All.png'> -->
            <v-list-tile-action>
              <v-switch v-model="aSources.All" color="dark blue"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>All</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <!-- <img src='../img/mc.png'> -->
            <v-list-tile-action>
              <v-switch v-model="aSources.MixCloud" color="dark blue"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Mixcloud</v-list-tile-title>
          </v-list-tile>
          
          <v-list-tile>
            <!-- <img src='../img/sc.png'> -->
            <v-list-tile-action>
              <v-switch v-model="aSources.SoundCloud" color="dark blue"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>SoundCloud</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <!-- <img src='../img/yt.png'> -->
            <v-list-tile-action>
              <v-switch v-model="aSources.YouTube" color="dark blue"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>YouTube</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <!-- <img src='../img/vm.png'> -->
            <v-list-tile-action>
              <v-switch v-model="aSources.Vimeo" color="dark blue"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Vimeo</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>    
  </v-toolbar-items>
  </span>
</template>

<script>
export default {
  name: 'search',
  watch: {
    'aSources.All': '_All',
    'aSources.MixCloud': '_other',
    'aSources.SoundCloud': '_other',
    'aSources.YouTube': '_other',
    'aSources.Vimeo': '_other'
  },
  data () {
    return {
      aSources: {All: true, MixCloud: false, SoundCloud: false, YouTube: false, Vimeo: false},
      sQuery: ''
    }
  },
  computed: {
    maSource () {
      var ret = []
      if (this.aSources.All) {
        return 'all'
      }
      Object.keys(this.aSources).forEach((key, index) => {
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
        this.aSources.MixCloud = this.aSources.SoundCloud = this.aSources.YouTube = this.aSources.Vimeo = false
      }
      this.search()
    },
    _other (newVal) {
      if (newVal) {
        this.aSources.All = false
      }
      this.search()
    },
    __search (sQuery, sSource = 'YouTube') {
      this.$router.push({name: 'searchPage', params: {query: this.sQuery, source: this.maSource}})
    },
    search () {
      this.$UTILS.closeSoftMobi()
      this.__search(this.query)
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
