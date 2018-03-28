<template>
    <v-list-group :value="active" prepend-icon="library_music" no-action>
      <v-list-tile ripple slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>Playlists</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile active-class="cyan white--text" ripple @click="closeLeftOnMobile" :to="{name:'playlistsAll', params: {user: UID}}">
      <!-- <v-list-tile active-class="cyan white--text" ripple @click="closeLeftOnMobile" :to="{path: '/u/playlists/all'}"> -->
        <v-list-tile-action>
          <v-icon>toc</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>All</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      
      <v-list-tile 
        v-for="subItem in playlistRefs"
        @click="closeLeftOnMobile" 
        id='playlist'
        :class="isPlaying(UID, subItem['.key'], subItem['name'])"
        :active-class="isPlaying(UID, subItem['.key'], subItem['name']) || 'cyan white--text'"
        :to="{path: '/u/' + UID + '/' + subItem['.key'] +  '/' +  encodeURIComponent(subItem['name'])}" 
        v-bind:key="subItem['.key']"
        ripple
      >
        <v-list-tile-action>
          <v-icon :color="isPlaying(UID, subItem['.key'], subItem['name']) ? 'white': ''">music_note</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ subItem['name'] }}</v-list-tile-title>
        </v-list-tile-content>
        <span class="delete">
          <delete-button @delete="playlistDelete" :id="subItem['.key']"></delete-button>
        </span>
      </v-list-tile>
    </v-list-group>
</template>
<script>

// /* eslint-disable */
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'user-playlists',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      UID: this.$DCFB.UID,
      active: false
    }
  },
  methods: {
    isPlaying (s, n, id) {
      return this.$store.getters.hash === '/u/' + s + '/' + n + '/' + encodeURIComponent(id) ? 'primary white--text' : ''
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
