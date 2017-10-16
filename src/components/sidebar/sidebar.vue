<template>
  <v-list dense>

    <v-list-tile :to="{path: `${loginPath}`}">
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
  </v-list>
</template>
<script>
import firebase from 'firebase'

// import x from '@/components/'
export default {
  name: 'sidebar',
  // components: {
  //   '?': ?
  // },
  data () {
    return {
      msg: 'Welcome to the real Trinity'
    }
  },
  computed: {
    loginPath: function () {
      console.log()
      console.log(1, firebase.auth().currentUser ? 'home' : 'login')
      return firebase.auth().currentUser ? 'home' : 'login'
    },
    loginText: function () {
      console.log(2, firebase.auth().currentUser ? 'home' : 'login')
      return firebase.auth().currentUser ? 'Home' : 'Login'
    }
  }
}
</script>

<style>

</style>
