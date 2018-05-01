<template>
  <div class="?">
    <v-bottom-nav shift absolute :active.sync="e2" :value="true" color="transparent" v-if="$store.getters.auth_state">
      <v-btn :color="$route.name === 'home' ? 'primary' : ''"  value="home" :to="{name: 'home', params: {user: UID}}">
        <span>Home</span>
        <v-icon>dashboard</v-icon>
      </v-btn>
      <v-btn :color="$route.name === 'stage' ? 'primary' : ''" value="stage" :to="{name: 'stage'}">
        <span>Current</span>
        <v-icon>music_video</v-icon>
      </v-btn>
      <v-btn :color="$route.name === 'playlistOverview' ? 'primary' : ''" value="playlistOverview" :to="{name: 'playlistOverview', params: {user: UID}}">
        <span>Playlists</span>
        <v-icon>library_music</v-icon>
      </v-btn>
      <v-btn :color="$route.name === 'userSubOverview' ? 'primary' : ''" value="userSubOverview" :to="{name: 'userSubOverview', params: {user: UID}}">
        <span>Following</span>
        <v-icon>people</v-icon>
      </v-btn>
      <v-btn :color="$route.name === 'settings' ? 'primary' : ''" value="settings" :to="{name: 'settings'}">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>
<script>
/* eslint-disable */

import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'x',
  data () {
    return {
      e2: 3
    }
  },
  components: {
    'delete-button': deleteButton
  },
  methods: {
    x2 () {

    }
  },
  computed: {
    UID () {
      return this.$DCFB.UID
    }
  }
}
</script>

<style>
</style>
