<template>
  <div class="?">
    <v-bottom-nav 
      :value="true" 
      absolute 
      color="transparent"
    >
      <v-btn 
        :to="{name: 'home', params: {user: uid}}" 
        color="primary" 
        flat 
      >
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'subsAll', params: {user: uid}}" 
        color="primary" 
        flat 
      >
        <span>Latest</span>
        <v-icon>whatshot</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'playlistOverview', params: {user: uid}}" 
        color="primary" 
        flat 
      >
        <span>Playlists</span>
        <v-icon>library_music</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'userSubOverview', params: {user: uid}}" 
        color="primary" 
        flat 
      >
        <span>Following</span>
        <v-icon>people</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'settings'}"

        flat
        color="primary" 
      >
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
export default {
  name: 'mobFoot',
  computed: {
    auto () {
      return this.$store.getters.current_trackID ? {name: 'auto', params: { artist: this.$store.getters.current_song.artist, trackID: this.$store.getters.current_song.trackID, source: this.$store.getters.current_song.source }} : { name: 'stage' }
    },
    uid () {
      return this.$store.getters.uid || Math.random()
    },
    active : {
      get () {
        // console.log(this.$route)
        return this.$route.name
        // return
      },
      set (v) {
      }
    }
  }
}
</script>

<style>
</style>
