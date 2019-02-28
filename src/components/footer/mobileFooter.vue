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
        value="home"
      >
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'subsAll', params: {user: uid}}" 
        color="primary" 
        flat 
        value="subsAll"
      >
        <span>Latest</span>
        <v-icon>whatshot</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'stage'}" 
        flat 
        color="primary" 
        value="stage"
      >
        <span>Current</span>
        <v-icon>music_video</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'playlistOverview', params: {user: uid}}" 
        color="primary" 
        flat 
        value="playlistOverview"
      >
        <span>Playlists</span>
        <v-icon>library_music</v-icon>
      </v-btn>
      <v-btn 
        :to="{name: 'userSubOverview', params: {user: uid}}" 
        color="primary" 
        flat 
        value="userSubOverview"
      >
        <span>Following</span>
        <v-icon>people</v-icon>
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
