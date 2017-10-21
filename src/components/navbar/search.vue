<template>
<span>
  <v-toolbar-items>
  <v-text-field 
      style="max-height: 12px;"
      v-on:keyup.enter='search' 
      v-model='sQuery'
      placeholder="Search" 
      single-line> 
    ></v-text-field>
    <v-menu
      :close-on-content-click="false"
      :nudge-bottom="25"
      open-on-hover
    >
      <v-btn icon dark slot="activator"><v-icon>cloud_circle</v-icon></v-btn>
      <v-card>
        <v-list>
          <v-list-tile>
            <!-- <img src='../img/All.png'> -->
            <v-list-tile-action>
              <v-switch @change="search" v-model="aSources.All" color="dark blue"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>All</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <!-- <img src='../img/mc.png'> -->
            <v-list-tile-action>
              <v-switch @change="search" v-model="aSources.MixCloud" color="dark blue"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Mixcloud</v-list-tile-title>
          </v-list-tile>
          
          <v-list-tile>
            <!-- <img src='../img/sc.png'> -->
            <v-list-tile-action>
              <v-switch @change="search" v-model="aSources.SoundCloud" color="dark blue"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>SoundCloud</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <!-- <img src='../img/yt.png'> -->
            <v-list-tile-action>
              <v-switch @change="search" v-model="aSources.YouTube" color="dark blue"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>YouTube</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <!-- <img src='../img/vm.png'> -->
            <v-list-tile-action>
              <v-switch @change="search" v-model="aSources.Vimeo" color="dark blue"></v-switch>
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
      aSources: {All: false, MixCloud: false, SoundCloud: false, YouTube: true, Vimeo: false},
      sQuery: '',
      source: ''
    }
  },
  computed: {
    maSource: function () {
      var ret = []
      if (this.aSources.all) {
        return ['all']
      }
      Object.keys(this.aSources).forEach((key, index) => {
        if (this.aSources[key]) {
          ret.push(key)
        }
      })
      console.log(ret.join('-'))
      return ret.join('-')
    }
  },
  methods: {
    _All: function () {
      if (!this.aSources.All && this.aSources.MixCloud && this.aSources.SoundCloud && this.aSources.YouTube && this.aSources.Vimeo) {
        this.aSources.MixCloud = this.aSources.SoundCloud = this.aSources.YouTube = this.aSources.Vimeo = false
      } else if (this.aSources.All && (!this.aSources.MixCloud || !this.aSources.SoundCloud || !this.aSources.YouTube || !this.aSources.Vimeo)) {
        this.aSources.MixCloud = this.aSources.SoundCloud = this.aSources.YouTube = this.aSources.Vimeo = true
      }
    },
    _other: function () {
      if (!this.aSources.MixCloud || !this.aSources.SoundCloud || !this.aSources.YouTube || !this.aSources.Vimeo) {
        this.aSources.All = false
      } else {
        this.aSources.All = true
      }
    },
    __search: function (sQuery, sSource = 'YouTube') {
      this.$router.push({name: 'searchPage', params: {query: this.sQuery, source: this.maSource}})
    },
    search: function () {
      if (this.$UTILS.isMobile) {
        alert('hiding keyboard')
        document.activeElement.blur()
      }
      this.__search(this.query)
    },
    btnclick: function (sSource) {
      this.__search(this.query, sSource)
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
