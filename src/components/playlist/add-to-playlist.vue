<template>
  <v-menu offset-y lazy :close-on-content-click="false" v-model="menuOpen">
    <v-btn icon slot="activator">
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
import {fb, db, DCFB} from '@/plugins/Firebase.js'
export default {
  name: 'add-to-playlist',
  props: ['song'],
  data () {
    return {
      msg: 'Welcome to the real Trinity',
      playlistName: '',
      menuOpen: false
    }
  },
  methods: {
    createNewPlaylist: function () {
     DCFB.createNewPlaylist(this.playlistName, this.song)
    },
    addToPlaylist: function (playlist) {
      console.log('adding to playlist')
      DCFB.addSongToPlaylist(playlist['.key'], this.song)
    }
  },
  computed: {
    x: function () {

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
