<template>
  <v-menu offset-y lazy :close-on-content-click="false" v-model="menuOpen" class="mr-0 ml-0">
    <v-btn :color='btnCol' icon slot="activator" @click.stop="menuOpen = !menuOpen" >
      <v-icon>playlist_add</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile>
        <v-text-field
          name="input-1-3"
          label="Playlist name"
          single-line
          v-model="playlistName"
          v-on:keyup.enter="createNewPlaylist"
        ></v-text-field>
      </v-list-tile>
      <v-list-tile v-for="playlist in playlists" :key="playlist['.key']" @click="addToPlaylist(playlist)">
        <v-list-tile-title>{{ playlist['name'] }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>
<script>
/* eslint-disable */
import {fb, db, DCFB} from '@/DCAPIs/DCFB.js'
export default {
  name: 'add-to-playlist',
  props: ['song'],
  data () {
    return {
      btnCol: '',
      playlistName: '',
      menuOpen: false
    }
  },
  methods: {
    btnFeedback: function () {
      //  this.menuOpen = this.$UTILS.isMobile ? false : true
      this.menuOpen = false
      this.btnCol = 'green'
      setTimeout(() =>{
        this.btnCol = ''
      }, 2000)
    },
    createNewPlaylist: function () {
     DCFB.createNewPlaylist(this.playlistName, this.song)
     this.btnFeedback()
    },
    addToPlaylist: function (playlist) {
      DCFB.playlistSongAdd(playlist['.key'], this.song)
      this.btnFeedback()
    }
  },
  firebase: function () {
    return {
      playlists: DCFB.playlists,
      playlistsRefs: DCFB.playlistsRefs
    }
  },
  mounted: function () {
    // console.log('Playlists', this.playlists)
    // console.log('PlaylistsRefs', this.playlistsRefs)
  }
}
</script>

<style>

</style>
