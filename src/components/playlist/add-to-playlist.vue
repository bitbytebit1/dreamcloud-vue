<template>
  <v-menu offset-y lazy :close-on-content-click="false" v-model="menuOpen">
    <v-btn icon slot="activator" @click.stop="yodo" >
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
      playlistName: '',
      menuOpen: false
    }
  },
  methods: {
    yodo: function () {
      this.menuOpen = !this.menuOpen
      console.log(1223)
    },
    createNewPlaylist: function () {
     DCFB.createNewPlaylist(this.playlistName, this.song)
    },
    addToPlaylist: function (playlist) {
      DCFB.addSongToPlaylist(playlist['.key'], this.song)
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
