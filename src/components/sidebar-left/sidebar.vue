<template>
  <div>
  <v-list dense>

    <!-- Change to for loop to save the whales... I mean internet -->


    <v-list-tile v-if="!loggedIn" ripple @click="closeLeft" :to="{path: 'login'}">
      <v-list-tile-action>
        <v-icon>person</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Login</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile ripple v-if="loggedIn" @click="closeLeft" :to="{path: '/home'}">
      <v-list-tile-action>
        <v-icon>dashboard</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile ripple @click="closeLeft" :to="{name: 'stage'}">
      <v-list-tile-action>
        <v-icon>music_video</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Current</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    
    <v-list-tile ripple @click="closeLeft" v-if="loggedIn" :to="{path: '/settings'}">
      <v-list-tile-action>
        <v-icon>settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Settings</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

  </v-list>
  <v-list dense class="pa-0">
    <user-playlists @closeLeft="closeLeft" v-if="loggedIn"></user-playlists>
  </v-list>
  <v-list dense class="pa-0">
    <user-subscriptions @closeLeft="closeLeft" v-if="loggedIn"></user-subscriptions>
  </v-list>
  </div>
</template>
<script>
import userPlaylists from '@/components/sidebar-left/user-playlists/user-playlists'
import userSubscriptions from '@/components/sidebar-left/user-subscriptions/user-subscriptions'
export default {
  name: 'sidebar',
  components: {
    'user-playlists': userPlaylists,
    'user-subscriptions': userSubscriptions
  },
  methods: {
    closeLeft () {
      this.$emit('closeLeft', 'left')
    }
  },
  computed: {
    loginPath () {
      return '/' + this.loginText.toLowerCase()
    },
    loginText () {
      return this.loggedIn ? 'User' : 'Login'
    },
    loggedIn () {
      return this.$store.getters.auth_state
    }
  },
  mounted () {

  }
}
</script>

<style>

</style>
