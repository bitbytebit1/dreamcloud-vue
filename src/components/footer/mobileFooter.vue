<template>
  <div class="?">
    <v-bottom-nav 
      v-if="$store.getters.auth_state" 
      :active.sync="current" 
      :value="true" 
      absolute 
      shift
      color="transparent"
    >
      <!-- <v-btn 
        :click="() => { document.getElementById('searchInput').click() }" 
        color="primary"
        value="searchPage"
      >
        <span>Search</span>
        <v-icon>search</v-icon>
      </v-btn> -->
      <v-btn 
        :to="{name: 'historyRecommended', params: {user: UID}}" 
        color="primary" 
        flat 
        value="home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'subsAll', params: {user: UID}}" 
        color="primary" 
        flat 
        value="subsAll">
        <span>Latest</span>
        <v-icon>whatshot</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'stage'}" 
        color="primary" 
        flat 
        value="stage">
        <span>Current</span>
        <v-icon>music_video</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'playlistOverview', params: {user: UID}}" 
        color="primary" 
        flat 
        value="playlistOverview">
        <span>Playlists</span>
        <v-icon>library_music</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'userSubOverview', params: {user: UID}}" 
        color="primary" 
        flat 
        value="userSubOverview">
        <span>Following</span>
        <v-icon>people</v-icon>
      </v-btn>
      <!-- <v-btn 
        :to="{name: 'settings'}" 
        color="primary" 
        flat 
        value="settings">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn> -->
    </v-bottom-nav>
  </div>
</template>
<script>
/* eslint-disable */

export default {
  name: 'mobFoot',
  data () {
    return {
      current: this.$route.name
    }
  },
  computed: {
    UID () {
      return this.$DCFB.UID
    }
    // active () {
    //   console.log(this.$route)
    //   return this.$route.name
    // }
  }
}
</script>

<style>
</style>
