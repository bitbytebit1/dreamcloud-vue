<template>
  <div>
    <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
      <v-list-tile ripple slot="item" @click="item.active = !item.active">
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
      <v-list-tile 
        v-for="subItem in playlistRefs"
        @click="closeLeftOnMobile" 
        id='playlist'
        :class="isPlaying(UID, subItem['.key'], subItem['name'])"
        :active-class="isPlaying(UID, subItem['.key'], encodeURIComponent(subItem['name'])) || 'blue-grey lighten-1'"
        :to="{path: '/u/' + UID + '/' + subItem['.key'] +  '/' +  encodeURIComponent(subItem['name'])}" 
        v-bind:key="subItem['.key']"
        ripple
      >
        <v-list-tile-action>
          <v-icon>music_note</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ subItem['name'] }}</v-list-tile-title>
        </v-list-tile-content>
        <span class="delete">
          <delete-button @delete="playlistDelete" :id="subItem['.key']"></delete-button>
        </span>
      </v-list-tile>
    </v-list-group>
  </div>
</template>
<script>

/* eslint-disable */
import { DCFB } from '@/DCAPIs/DCFB.js'
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'user-playlists',
  components: {
    'delete-button': deleteButton
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
    isPlaying: function (s, n, id) {
      return this.$store.getters.hash === '/u/' + s + '/' + n + '/' + id ? 'light-green darken-2' : ''
    },    
    closeLeftOnMobile: function () {
      this.$emit('closeLeft')
    },
    playlistDelete: function (playlistID) {
      DCFB.playlistDelete(playlistID) 
    }
  },
  firebase: function () {
    return {
      playlistRefs: DCFB.playlistsRefs.orderByChild('name_lower')
    }
  }
}
</script>

<style>
.delete {
  display: none!important
}

.router-link-exact-active .delete, #playlist:hover .delete {
  display: inherit!important
}
</style>
