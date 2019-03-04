<template>
  <div class="mb-1">
    <v-list 
      dense 
      class="pa-0"
    >

      <!-- Change to for loop to save the whales... I mean internet -->
      <!-- login -->


      
      <!-- RECOMMENDED -->
      <v-list-tile 
        :to="{name: 'home', params: {user: UID}}" 
        :class="isPorA('home')"
        :active-class="isPorA('home')"
        @click="closeLeft"
      >
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!-- trending -->
      <v-list-tile 
        :to="{name: 'trending'}" 
        :class="isPorA('trending')"
        :active-class="isPorA('trending')"
        @click="closeLeft"
      >
        <v-list-tile-action>
          <v-icon>whatshot</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Trending</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!-- CURRENTLY PLAYING -->
      <v-list-tile 
        :to="{name: 'auto', params: { artist: this.$store.getters.current_song.artist, trackID: this.$store.getters.current_song.trackID, source: this.$store.getters.current_song.source }}" 
        :active-class="isPorA('auto')"
        @click="closeLeft"
      >
        <v-list-tile-action>
          <v-icon>music_video</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Current</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile 
        :to="{name: 'explore'}" 
        :class="isPorA('explore')"
        :active-class="isPorA('explore')"
        @click="closeLeft"
      >
        <v-list-tile-action>
          <v-icon>public</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Explore</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>


      <!-- Subscriptions all -->
      <v-list-tile 
        :to="{name:'subsAll', params: {user: UID}}" 
        :class="isPorA('subsAll')" 
        :active-class="isPorA('subsAll')"
        @click="closeLeft"
      >
        <v-list-tile-action>
          <v-icon>people</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Subscriptions</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!-- history -->
      <v-list-tile 
        :to="{name:'history', params: {user: UID}}" 
        :class="isPorA('history')"
        :active-class="isPorA('history')"
        class="history-link" 
        @click="closeLeft"
      >
        <v-list-tile-action>
          <v-icon>history</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>History</v-list-tile-title>
        </v-list-tile-content>
        <span class="delete">
          <delete-button @delete="clearHistory"/>
        </span>
      </v-list-tile>

      <!-- about -->
      <!-- <v-list-tile v-if="!loggedIn" active-class="primary white--text"  @click="closeLeft" :to="{name: 'about'}">
        <v-list-tile-action>
          <v-icon>info</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>About</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile> -->

      <!-- login -->
      <!-- <v-list-tile v-if="!loggedIn" active-class="primary white--text"  @click="closeLeft" :to="{path: '/login'}">
        <v-list-tile-action>
          <v-icon>person</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
       -->
      <!-- settings -->
      <v-list-tile 
        :to="{path: '/settings'}" 
        active-class="secondary white--text"
        @click="closeLeft"
      >
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    
    <!-- Playists -->
    <v-list 
      dense 
      class="pa-0"
    >
      <user-playlists @closeLeft="closeLeft"/>
    </v-list>
    
    <!-- Subscriptions -->
    <v-list 
      dense 
      class="pa-0 pb-5"
    >
      <user-subscriptions @closeLeft="closeLeft"/>
    </v-list>

  </div>
</template>
<script>
import userPlaylists from '@/components/sidebar-left/user-playlists/user-playlists'
import userSubscriptions from '@/components/sidebar-left/user-subscriptions/user-subscriptions'
import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'Sidebar',
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
      this.$DCFB.historyClear()
    },
    // Playing or active
    isPorA (v) {
      return this.$store.getters.hash.indexOf(v) > -1 ? 'primary white--text' : this.$route.name == v ? 'secondary white--text' :  ''
    },
  },
  computed: {
    UID () {
      return this.$store.getters.uid || Math.random()
    },
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
.ar17{
  position:absolute !important;
  right:1px;
}
.list__tile--active .delete, .history-link:hover .delete {
  display: inherit!important
}
</style>
