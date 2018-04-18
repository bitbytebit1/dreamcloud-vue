<template>
  <div class="mb-1">
  <v-list dense class="pa-0">

    <!-- Change to for loop to save the whales... I mean internet -->


    <v-list-tile v-if="!loggedIn" ripple @click="closeLeft" :to="{name: 'about'}">
      <v-list-tile-action>
        <v-icon>info</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>About</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile v-if="!loggedIn" ripple @click="closeLeft" :to="{path: '/login'}">
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
    <v-list-group v-if="loggedIn" :value="userDrawer" prepend-icon="person" no-action>
      <v-list-tile ripple slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>User</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    <v-list-tile ripple class="history-link" @click="closeLeft" v-if="loggedIn" :to="{name:'history', params: {user: $DCFB.UID}}">
      <v-list-tile-action>
        <v-icon>history</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>History</v-list-tile-title>
      </v-list-tile-content>
      <span class="delete">
        <delete-button @delete="clearHistory"></delete-button>
      </span>
    </v-list-tile>
    

    <v-list-tile ripple @click="closeLeft" v-if="loggedIn" :to="{path: '/settings'}">
      <v-list-tile-action>
        <v-icon>settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Settings</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    </v-list-group>
  </v-list>
  
  <v-list dense class="pa-0">
    <user-playlists @closeLeft="closeLeft" v-if="loggedIn"></user-playlists>
  </v-list>
  <v-list dense class="pa-0">
    <user-subscriptions @closeLeft="closeLeft" v-if="loggedIn"></user-subscriptions>
  </v-list>
  <v-list dense class="pa-0 mb-5">
    <v-list-tile ripple @click="closeLeft" v-if="!loggedIn" :to="{path: '/tos'}">
      <v-list-tile-action>
        <v-icon>forum</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Terms of Use</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
  </div>
</template>
<script>
import userPlaylists from '@/components/sidebar-left/user-playlists/user-playlists'
import userSubscriptions from '@/components/sidebar-left/user-subscriptions/user-subscriptions'
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'sidebar',
  components: {
    'user-playlists': userPlaylists,
    'user-subscriptions': userSubscriptions,
    'delete-button': deleteButton
  },
  data () {
    return {
      userDrawer: false
    }
  },
  methods: {
    closeLeft () {
      this.$emit('closeLeft', 'left')
    },
    clearHistory () {
      // alert('bai')
      this.$DCFB.historyClear()
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
.list__tile--active .delete, .history-link:hover .delete {
  display: inherit!important
}
</style>
