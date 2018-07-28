<template>
  <div class="?">
    <v-bottom-nav shift absolute :active.sync="e2" :value="true" color="transparent" v-if="$store.getters.auth_state">
      <!-- <v-btn :color="$route.name === 'home' ? 'primary' : ''"  value="home" :to="{name: 'searchPage'}">
        <span>Search</span>
        <v-icon>search</v-icon>
      </v-btn> -->
      <v-btn color="primary" flat value="home" :to="{name: 'historyRecommended', params: {user: UID}}">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn color="primary" flat value="subsAll" :to="{name: 'subsAll', params: {user: UID}}">
        <span>Latest</span>
        <v-icon>whatshot</v-icon>
      </v-btn>
      <v-btn color="primary" flat value="stage" :to="{name: 'stage'}">
        <span>Current</span>
        <v-icon>music_video</v-icon>
      </v-btn>
      <v-btn color="primary" flat value="playlistOverview" :to="{name: 'playlistOverview', params: {user: UID}}">
        <span>Playlists</span>
        <v-icon>library_music</v-icon>
      </v-btn>
      <v-btn color="primary" flat value="userSubOverview" :to="{name: 'userSubOverview', params: {user: UID}}">
        <span>Following</span>
        <v-icon>people</v-icon>
      </v-btn>
      <v-btn color="primary" flat value="settings" :to="{name: 'settings'}">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>
<script>
/* eslint-disable */

import deleteButton from '@/components/buttons/delete-button'
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
