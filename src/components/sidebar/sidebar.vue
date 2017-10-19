<template>
  <v-list dense>
    <v-list-tile :to="{path: loginPath}">
      <v-list-tile-action>
        <v-icon>person</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{loginText}}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="{path: '/settings'}">
      <v-list-tile-action>
        <v-icon>settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Settings</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <user-playlists v-if="loggedIn"></user-playlists>

  </v-list>
</template>
<script>
import firebase from 'firebase'
import userPlaylists from '@/components/sidebar/user-playlists/user-playlists'
export default {
  name: 'sidebar',
  components: {
    'user-playlists': userPlaylists
  },
  data () {
    return {
      loggedIn: false
    }
  },
  computed: {
    loginPath: function () {
      return '/' + this.loginText.toLowerCase()
    },
    loginText: function () {
      return this.loggedIn ? 'User' : 'Login'
    }
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      this.loggedIn = !!user
    })
  }
}
</script>

<style>

</style>
