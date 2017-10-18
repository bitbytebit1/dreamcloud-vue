<template>
  <div>
    <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
      <v-list-tile slot="item" @click="item.active = !item.active">
        <v-list-tile-action>
          <v-icon>{{ item.action }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>keyboard_arrow_down</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile class="playlist" active-class="blue lighten-1" :to="{path: '/u/' + UID + '/' + subItem['.key']}" v-for="subItem in playlistRefs" v-bind:key="subItem['.key']">
        <v-list-tile-action>
          <v-icon>music_note</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ subItem['.value'] }}</v-list-tile-title>
        </v-list-tile-content>
        <delete-playlist-button :playlistId="subItem['.key']" class="delete"></delete-playlist-button>
      </v-list-tile>
    </v-list-group>
  </div>
</template>
<script>
/* eslint-disable */
import { DCFB } from '@/DCAPIs/DCFB.js'
import deletePlaylistButton from '@/components/sidebar/delete-playlist-button'
export default {
  name: 'user-playlists',
  components: {
    'delete-playlist-button': deletePlaylistButton
  },
  data () {
    return {
      UID: DCFB.UID,
      items: [
        {
          active: true,
          action: 'library_music',
          title: 'Playlists',
          items: [
            { title: 'List Item' }
          ]
        }
      ]
    }
  },
  methods: {
    deletePlaylist: function () {
      console.log(123)
    }
  },
  firebase: function () {
    return {
      playlistRefs: DCFB.playlistsRefs
    }
  }
}
</script>

<style>
.delete {
  display: none;
}

.playlist:hover .delete {
  display: inherit;
}
</style>
