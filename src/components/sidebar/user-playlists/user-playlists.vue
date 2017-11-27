<template>
  <div>
    <v-list-group :value="active">
      <v-list-tile ripple slot="item" @click.stop="active = !active">
        <v-list-tile-action>
          <v-icon>library_music</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Playlists</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>keyboard_arrow_down</v-icon>
        </v-list-tile-action>
      </v-list-tile>
 
      <v-list-tile ripple @click="closeLeftOnMobile" :to="{path: '/u/playlists/all'}">
        <v-list-tile-action>
          <v-icon>toc</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>All</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      
      <v-list-tile 
        v-for="subItem in playlistRefs"
        @click="closeLeftOnMobile" 
        id='playlist'
        :class="isPlaying(UID, subItem['.key'], subItem['name'])"
        :active-class="isPlaying(UID, subItem['.key'], subItem['name']) || 'blue-grey lighten-1'"
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
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'user-playlists',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      UID: this.$DCFB.UID,
      active: true
    }
  },
  methods: {
    isPlaying (s, n, id) {
      var a = this.$store.getters.hash === '/u/' + s + '/' + n + '/' + encodeURIComponent(id) ? 'teal' : ''
      return a
    },    
    closeLeftOnMobile () {
      this.$emit('closeLeft')
    },
    playlistDelete (playlistID) {
      this.$DCFB.playlistDelete(playlistID) 
    }
  },
  firebase () {
    return {
      playlistRefs: this.$DCFB.playlistsRefs.orderByChild('name_lower')
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
